package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.RequestDto
import pwr.diplomaproject.model.dto.TopicChangeRequestDetailsDto
import pwr.diplomaproject.model.dto.factory.DeanRequestDtoFactory
import pwr.diplomaproject.model.dto.factory.TopicChangeRequestDetailsDtoFactory
import pwr.diplomaproject.model.entity.*
import pwr.diplomaproject.model.enum.*
import pwr.diplomaproject.repository.*
import java.time.LocalDate
import javax.transaction.Transactional

@Service
class CommissionChangeRequestService @Autowired constructor(
    private val topicChangeRequestRepository: TopicChangeRequestRepository,
    private val subjectRepository: SubjectRepository,
    private val employeeRepository: EmployeeRepository,
    private val reservationRepository: ReservationRepository,
    private val groupMemberRepository: GroupMemberRepository
) {

    fun getChangeRequestsToConsider(): List<RequestDto> =
        topicChangeRequestRepository.findAllByResultIn(listOf(RequestResult.WAITING))
            .map { DeanRequestDtoFactory.create(it) }

    fun getChangeRequestsConsidered(): List<RequestDto> =
        topicChangeRequestRepository.findAllByResultIn(listOf(RequestResult.REJECTED, RequestResult.ACCEPTED))
            .map { DeanRequestDtoFactory.create(it) }

    fun getChangeRequest(requestId: Long): TopicChangeRequestDetailsDto =
        topicChangeRequestRepository.getById(requestId)
            .let { TopicChangeRequestDetailsDtoFactory.create(it) }

    @Transactional
    fun acceptChangeRequest(userId: Long, id: Long): Unit =
        topicChangeRequestRepository.getById(id).let {
            it.result = RequestResult.ACCEPTED
            it.employee = dean(userId)

            switchStudentSubject(it.student, it.oldTopic, it.newTopic)

            topicChangeRequestRepository.save(it)
        }

    @Transactional
    fun rejectChangeRequest(userId: Long, id: Long): Unit =
        topicChangeRequestRepository.getById(id).let {
            it.result = RequestResult.REJECTED
            it.employee = dean(userId)

            it.newTopic.status = TopicStatus.REJECTED_BY_COMMISSION // TODO może jakoś ładniej anulować taki temat (bez usuwania)

            subjectRepository.save(it.newTopic)
            topicChangeRequestRepository.save(it)
        }

    private fun switchStudentSubject(student: Student, oldSubject: Topic, newSubject: Topic) {

        // stara rezerwacja musi być confirmed
        val oldSubjectReservation = reservationRepository.findAllBySubjectId(oldSubject.id)
            .find { it.status == ReservationStatus.CONFIRMED }!!
        // nowa rezerwacja jeszcze nie istnieje lub ma status confirmed
        val newSubjectReservation = reservationRepository.findAllBySubjectId(newSubject.id)
            .find { it.status == ReservationStatus.CONFIRMED } ?:
            reservationRepository.save(Reservation(reservationRepository.getNextId(),
                newSubject,
                ReservationStatus.CONFIRMED,
                LocalDate.now()))

        // usuwamy studenta ze starej rezerwacji; jeżeli był to ostatni student to usuwamy rezerwację
        val oldGroupMember = oldSubjectReservation.groupMembers.find { it.student.id == student.id }!!
        oldSubjectReservation.groupMembers = oldSubjectReservation.groupMembers.filter { it.id != oldGroupMember.id }
        if (oldSubjectReservation.groupMembers.isEmpty())
            reservationRepository.delete(oldSubjectReservation)
        else
            reservationRepository.save(oldSubjectReservation)
        groupMemberRepository.delete(oldGroupMember)

        // dodajemy studenta do nowej rezerwacji
        val newGroupMember = groupMemberRepository.save(
            GroupMember(groupMemberRepository.getNextId(),
                newSubjectReservation,
                student,
                MemberStatus.CONFIRMED))
        newSubjectReservation.groupMembers = mutableListOf(*newSubjectReservation.groupMembers.toTypedArray(), newGroupMember)
        reservationRepository.save(newSubjectReservation)

        // jeżeli stary temat nie był zatwierdzony to zatwierdzamy
        newSubject.status = TopicStatus.ACCEPTED_BY_COMMISSION
        subjectRepository.save(newSubject)
    }

    private fun dean(userId: Long): Employee =
        employeeRepository.getEmployeeByUserIdAndType(userId, EmployeeType.DEAN)
}