package pwr.diplomaproject.service

import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.StudentReservationDto
import pwr.diplomaproject.model.dto.factory.StudentReservationDtoFactory
import pwr.diplomaproject.model.entity.GroupMember
import pwr.diplomaproject.model.entity.Reservation
import pwr.diplomaproject.model.enum.MemberStatus
import pwr.diplomaproject.model.enum.ReservationStatus
import pwr.diplomaproject.repository.GroupMemberRepository
import pwr.diplomaproject.repository.ReservationRepository
import pwr.diplomaproject.repository.StudentRepository

@Service
class StudentReservationService(
    private val reservationRepository: ReservationRepository,
    private val studentRepository: StudentRepository,
    private val groupMemberRepository: GroupMemberRepository
) {
    fun getReservations(studentId: Long): List<StudentReservationDto> =
        reservationRepository.findAllByStudentId(studentId).map { StudentReservationDtoFactory.create(it) }

    fun getReservation(
        studentId: Long, reservationId: Long
    ): StudentReservationDto? {
        val reservation = reservationRepository.findAllByStudentId(studentId).firstOrNull {
            it.id == reservationId
        }
        return if (reservation == null) null else StudentReservationDtoFactory.create(reservation)
    }

    fun approveReservation(studentId: Long, reservationId: Long): Boolean {
        val reservation: Reservation? = reservationRepository.findAllByStudentId(studentId).firstOrNull {
            it.id == reservationId
        }
        val groupMember: GroupMember? = reservation?.groupMembers?.firstOrNull {
            it.student.id == studentId
        }

        if (groupMember != null && groupMember.status != MemberStatus.CONFIRMED) {

            if (groupMember.status == MemberStatus.SUGGESTED) {
                groupMember.status = MemberStatus.WILLING
            } else if (groupMember.status == MemberStatus.WILLING) {
                if (reservation.status != ReservationStatus.ACCEPTED) {
                    return false
                }
                groupMember.status = MemberStatus.CONFIRMED
            }

            val memberStatusList = reservation.groupMembers.map { it.status }

            // change reservation status to registered
            if (memberStatusList.all { it == MemberStatus.WILLING }) {
                reservation.status = ReservationStatus.REGISTERED
            }

            // change reservation status to confirmed
            else if (memberStatusList.all { it == MemberStatus.CONFIRMED }) {
                reservation.status = ReservationStatus.CONFIRMED
            }

            groupMemberRepository.save(groupMember)
            reservationRepository.save(reservation)

            return true
        }

        return false
    }
}