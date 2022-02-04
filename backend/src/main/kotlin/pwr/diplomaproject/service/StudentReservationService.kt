package pwr.diplomaproject.service

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.StudentReservationDto
import pwr.diplomaproject.model.dto.factory.StudentReservationDtoFactory
import pwr.diplomaproject.model.entity.GroupMember
import pwr.diplomaproject.model.entity.Reservation
import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.enum.MemberStatus
import pwr.diplomaproject.model.enum.ReservationStatus
import pwr.diplomaproject.model.form.StudentReservationForm
import pwr.diplomaproject.repository.GroupMemberRepository
import pwr.diplomaproject.repository.ReservationRepository
import pwr.diplomaproject.repository.StudentRepository
import pwr.diplomaproject.repository.TopicRepository
import java.time.LocalDate

@Service
class StudentReservationService(
    private val reservationRepository: ReservationRepository,
    private val groupMemberRepository: GroupMemberRepository,
    private val studentRepository: StudentRepository,
    private val topicRepository: TopicRepository
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

            // SUGGESTED -> WILLING
            if (groupMember.status == MemberStatus.SUGGESTED) {
                if (reservation.status != ReservationStatus.WAITING) {
                    return false
                }
                groupMember.status = MemberStatus.WILLING
            }

            // WILLING -> ACCEPTED
            else if (groupMember.status == MemberStatus.WILLING) {
                if (reservation.status != ReservationStatus.ACCEPTED) {
                    return false
                }
                groupMember.status = MemberStatus.CONFIRMED
            }

            val memberStatusList = reservation.groupMembers.map { it.status }

            // all MemberStatus.WILLING  =>  ReservationStatus.REGISTERED
            if (memberStatusList.all { it == MemberStatus.WILLING }) {
                reservation.status = ReservationStatus.REGISTERED
            }

            // all MemberStatus.CONFIRMED  =>  ReservationStatus.CONFIRMED
            else if (memberStatusList.all { it == MemberStatus.CONFIRMED }) {
                reservation.status = ReservationStatus.CONFIRMED
            }

            groupMemberRepository.save(groupMember)
            reservationRepository.save(reservation)

            return true
        }

        return false
    }

    fun cancelReservation(studentId: Long, reservationId: Long): Boolean {
        val reservation: Reservation? = reservationRepository.findAllByStudentId(studentId).firstOrNull {
            it.id == reservationId
        }
        val groupMember: GroupMember? = reservation?.groupMembers?.firstOrNull {
            it.student.id == studentId
        }

        if (reservation != null
            && groupMember != null
            && reservation.status != ReservationStatus.CONFIRMED
            && groupMember.status != MemberStatus.CONFIRMED
        ) {
            groupMember.status = MemberStatus.REJECTED
            reservation.status = ReservationStatus.REJECTED_BY_STUDENT
            groupMemberRepository.save(groupMember)
            reservationRepository.save(reservation)
            return true
        }

        return false
    }

    fun makeReservation(studentId: Long, form: StudentReservationForm): Boolean {
        val topic: Topic = topicRepository.findByIdOrNull(form.subjectId) ?: return false

        val newReservation = Reservation(
            id = reservationRepository.getNextId(),
            topic = topic,
            status = if (form.studentIds.size == 1) ReservationStatus.REGISTERED else ReservationStatus.WAITING,
            creationDate = LocalDate.now(),
        )

        val newGroupMembers = mutableListOf<GroupMember>()

        var nextGroupMemberId = groupMemberRepository.getNextId()
        for (suggestedStudentId in form.studentIds) {
            val student = studentRepository.findByIdOrNull(suggestedStudentId)
            if (student == null) {
                return false
            } else {
                val newGroupMember = GroupMember(
                    id = nextGroupMemberId++,
                    reservation = newReservation,
                    student = student,
                    status = if (student.id == studentId) MemberStatus.WILLING else MemberStatus.SUGGESTED
                )
                newGroupMembers.add(newGroupMember)
            }
        }

        reservationRepository.save(newReservation)
        for (newGroupMember in newGroupMembers) {
            groupMemberRepository.save(newGroupMember)
        }
        return true
    }
}