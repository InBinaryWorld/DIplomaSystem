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
    fun getReservations(studentId: Long, graduationId: Long): List<StudentReservationDto> =
        reservationRepository.findAllByStudentAndGraduation(studentId, graduationId)
            .map { StudentReservationDtoFactory.create(it) }

    fun getReservation(studentId: Long, id: Long): StudentReservationDto =
        StudentReservationDtoFactory.create(reservationRepository.findAllByIndexAndStudent(id, studentId))

    fun approveReservation(studentId: Long, id: Long) {
        val reservation: Reservation = reservationRepository.findAllByIndexAndStudent(id, studentId)

        val groupMember: GroupMember? = reservation.groupMembers.firstOrNull {
            it.student.id == studentId
        }

        if (groupMember != null && groupMember.status != MemberStatus.CONFIRMED) {

            // SUGGESTED -> WILLING
            if (groupMember.status == MemberStatus.SUGGESTED) {
                if (reservation.status != ReservationStatus.WAITING) {
                    return
                }
                groupMember.status = MemberStatus.WILLING
            }

            // WILLING -> ACCEPTED
            else if (groupMember.status == MemberStatus.WILLING) {
                if (reservation.status != ReservationStatus.ACCEPTED) {
                    return
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
        }
    }

    fun cancelReservation(studentId: Long, id: Long) {
        val reservation: Reservation = reservationRepository.findAllByIndexAndStudent(id, studentId)
        val groupMember: GroupMember? = reservation.groupMembers.firstOrNull {
            it.student.id == studentId
        }

        if (groupMember != null
            && reservation.status != ReservationStatus.CONFIRMED
            && groupMember.status != MemberStatus.CONFIRMED
        ) {
            groupMember.status = MemberStatus.REJECTED
            reservation.status = ReservationStatus.REJECTED_BY_STUDENT
            groupMemberRepository.save(groupMember)
            reservationRepository.save(reservation)
        }
    }

    fun makeReservation(studentId: Long, form: StudentReservationForm) {
        val topic: Topic = topicRepository.findByIdOrNull(form.subjectId) ?: return

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
                return
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
    }
}