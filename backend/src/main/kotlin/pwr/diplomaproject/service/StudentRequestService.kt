package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.StudentRequestDto
import pwr.diplomaproject.model.dto.TopicChangeRequestDetailsDto
import pwr.diplomaproject.model.dto.TopicCorrectionRequestDetailsDto
import pwr.diplomaproject.model.dto.factory.StudentRequestDtoFactory
import pwr.diplomaproject.model.dto.factory.TopicChangeRequestDetailsDtoFactory
import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.entity.TopicChangeRequest
import pwr.diplomaproject.model.entity.TopicCorrectionRequest
import pwr.diplomaproject.model.enum.EmployeeType
import pwr.diplomaproject.model.enum.RequestResult
import pwr.diplomaproject.model.enum.TopicStatus
import pwr.diplomaproject.model.form.StudentTopicChangeRequestExistingTopicForm
import pwr.diplomaproject.model.form.StudentTopicChangeRequestNewTopicForm
import pwr.diplomaproject.model.form.StudentTopicCorrectionRequestForm
import pwr.diplomaproject.repository.*
import java.time.LocalDate
import javax.transaction.Transactional

@Service
class StudentRequestService @Autowired constructor(
    private val topicChangeRequestRepository: TopicChangeRequestRepository,
    private val topicCorrectionRequestRepository: TopicCorrectionRequestRepository,
    private val studentRepository: StudentRepository,
    private val subjectRepository: SubjectRepository,
    private val employeeRepository: EmployeeRepository,
){

    fun getTopicChangeRequests(studentId: Long): List<StudentRequestDto> =
        topicChangeRequestRepository.findAllByStudentId(studentId)
            .map { StudentRequestDtoFactory.create(it) }

    fun getTopicChangeRequestDetails(id: Long): TopicChangeRequestDetailsDto =
        topicChangeRequestRepository.getById(id)
            .let { TopicChangeRequestDetailsDtoFactory.create(it) }

    fun getTopicCorrectionRequests(studentId: Long): List<StudentRequestDto> =
        topicCorrectionRequestRepository.findAllByStudentId(studentId)

    fun getTopicCorrectionRequestDetails(id: Long): TopicCorrectionRequestDetailsDto =
        topicCorrectionRequestRepository.getCorrectionRequestDetails(id)

    fun makeTopicChangeToExistingTopicRequest(studentId: Long, form: StudentTopicChangeRequestExistingTopicForm) {
        val request = TopicChangeRequest(
            topicChangeRequestRepository.getNextId(),
            studentRepository.getById(studentId),
            null,
            subjectRepository.getById(form.currentTopicId),
            subjectRepository.getById(form.newTopicId),
            RequestResult.WAITING,
            LocalDate.now()
        )

        topicChangeRequestRepository.save(request)
    }

    @Transactional
    fun makeTopicChangeToNewTopicRequest(studentId: Long, form: StudentTopicChangeRequestNewTopicForm) {
        val newSubject = Topic(
            subjectRepository.getNextId(),
            employeeRepository.getEmployeeByUserIdAndType(form.newSupervisorId, EmployeeType.LECTURER),
            studentRepository.getById(studentId),
            subjectRepository.getById(form.currentTopicId).graduation,
            form.newTopic,
            form.newDescription,
            form.newStudentCount,
            TopicStatus.WAITING,
            null,
            true,
            LocalDate.now()
        )

        val savedSubject = subjectRepository.save(newSubject)

        val request = TopicChangeRequest(
            topicChangeRequestRepository.getNextId(),
            studentRepository.getById(studentId),
            null,
            subjectRepository.getById(form.currentTopicId),
            savedSubject,
            RequestResult.WAITING,
            LocalDate.now()
        )

        topicChangeRequestRepository.save(request)
    }

    fun makeTopicCorrectionRequest(studentId: Long, form: StudentTopicCorrectionRequestForm) {
        val request = TopicCorrectionRequest(
            topicCorrectionRequestRepository.getNextId(),
            studentRepository.getById(studentId),
            null,
            RequestResult.WAITING,
            LocalDate.now(),
            form.newTopic,
            form.newDescription
        )

        topicCorrectionRequestRepository.save(request)
    }

    fun cancelTopicChangeRequest(userId: Long, id: Long): Unit =
        topicChangeRequestRepository.getByStudentUserIdAndRequestId(userId, id).let {
            it.result = RequestResult.CANCELED_BY_STUDENT
            topicChangeRequestRepository.save(it)
        }

    fun cancelTopicCorrectionRequest(userId: Long, id: Long): Unit =
        topicCorrectionRequestRepository.getByStudentUserIdAndRequestId(userId, id).let {
            it.result = RequestResult.CANCELED_BY_STUDENT
            topicCorrectionRequestRepository.save(it)
        }
}