package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.ChangeRequestDto
import pwr.diplomaproject.model.dto.ClarificationRequestDto
import pwr.diplomaproject.model.dto.factory.ChangeRequestDtoFactory
import pwr.diplomaproject.model.dto.factory.ClarificationRequestDtoFactory
import pwr.diplomaproject.repository.TopicChangeRequestRepository
import pwr.diplomaproject.repository.TopicCorrectionRequestRepository

@Service
class RequestService @Autowired constructor(
    private val topicCorrectionRequestRepository: TopicCorrectionRequestRepository,
    private val topicChangeRequestRepository: TopicChangeRequestRepository
){

    fun getClarificationRequestById(requestId: Long): ClarificationRequestDto =
        topicCorrectionRequestRepository.getRequestAndTopicById(requestId)
            .let { ClarificationRequestDtoFactory.create(it.first, it.second) }

    fun getClarificationRequestsByGraduationOrStudentOrDean(
        graduationId: Long?,
        studentId: Long?,
        deanId: Long?): List<ClarificationRequestDto> =
        topicCorrectionRequestRepository.findAllByGraduationOrStudentOrDean(graduationId, studentId, deanId)
            .map { ClarificationRequestDtoFactory.create(it.first, it.second) }

    fun getChangeRequestById(requestId: Long): ChangeRequestDto =
        topicChangeRequestRepository.getById(requestId)
            .let { ChangeRequestDtoFactory.create(it) }

    fun getChangeRequestsByGraduationOrStudentOrCommittee(
        graduationId: Long?,
        studentId: Long?,
        committeeId: Long?): List<ChangeRequestDto> =
        topicChangeRequestRepository.findAllByGraduationOrStudentOrCommittee(graduationId, studentId, committeeId)
            .map { ChangeRequestDtoFactory.create(it) }
}