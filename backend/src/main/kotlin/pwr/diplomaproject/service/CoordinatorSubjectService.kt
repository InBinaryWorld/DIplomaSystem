package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.dto.factory.SubjectDtoFactory
import pwr.diplomaproject.model.enum.TopicStatus
import pwr.diplomaproject.model.form.CoordinatorCommentForm
import pwr.diplomaproject.repository.SubjectRepository

@Service
class CoordinatorSubjectService @Autowired constructor(
    private val subjectService: SubjectService,
    private val subjectRepository: SubjectRepository
) {

    companion object {

        private val VERIFIED_STATUSES = arrayOf(
            TopicStatus.NEEDS_CORRECTION,
            TopicStatus.REJECTED_BY_COORDINATOR,
            TopicStatus.ACCEPTED_BY_COORDINATOR
        )
    }

    fun getSubjectsToVerify(): List<SubjectDto> =
        subjectService.findAllByStatuses(TopicStatus.WAITING)
            .map { SubjectDtoFactory.create(it) }

    fun getSubjectsVerified(): List<SubjectDto> =
        subjectService.findAllByStatuses(*VERIFIED_STATUSES)
            .map { SubjectDtoFactory.create(it) }

    fun getSubject(id: Long): SubjectDetailsDto =
        subjectService.getDetails(id)

    fun acceptSubject(id: Long): Unit =
        subjectRepository.getById(id).let {
            it.status = TopicStatus.ACCEPTED_BY_COORDINATOR
            subjectRepository.save(it)
        }

    fun commentSubject(comments: CoordinatorCommentForm): Unit =
        subjectRepository.getById(comments.thesisId).let {
            it.status = TopicStatus.NEEDS_CORRECTION
            it.coordinatorComments = comments.comment
            subjectRepository.save(it)
        }

    fun rejectSubject(comments: CoordinatorCommentForm): Unit =
        subjectRepository.getById(comments.thesisId).let {
            it.status = TopicStatus.REJECTED_BY_COORDINATOR
            it.coordinatorComments = comments.comment
            subjectRepository.save(it)
        }
}