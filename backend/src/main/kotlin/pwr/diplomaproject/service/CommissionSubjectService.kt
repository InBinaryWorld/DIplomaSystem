package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.dto.factory.SubjectDtoFactory
import pwr.diplomaproject.model.enum.TopicStatus
import pwr.diplomaproject.repository.SubjectRepository

@Service
class CommissionSubjectService @Autowired constructor(
    private val subjectService: SubjectService,
    private val subjectRepository: SubjectRepository
){

    companion object {

        private val VERIFIED_STATUSES = arrayOf(
            TopicStatus.ACCEPTED_BY_COMMISSION,
            TopicStatus.REJECTED_BY_COMMISSION
        )
    }

    fun getSubjectsToVerify(): List<SubjectDto> =
        subjectService.findAllByStatuses(TopicStatus.ACCEPTED_BY_COORDINATOR)
            .map { SubjectDtoFactory.create(it) }

    fun getSubjectsVerified(): List<SubjectDto> =
        subjectService.findAllByStatuses(*VERIFIED_STATUSES)
            .map { SubjectDtoFactory.create(it) }

    fun getSubject(id: Long): SubjectDetailsDto =
        subjectService.getDetails(id)

    fun acceptSubject(id: Long): Unit =
        subjectRepository.getById(id).let {
            it.status = TopicStatus.ACCEPTED_BY_COMMISSION
            subjectRepository.save(it)
        }

    fun rejectSubject(id: Long): Unit =
        subjectRepository.getById(id).let {
            it.status = TopicStatus.REJECTED_BY_COMMISSION
            subjectRepository.save(it)
        }
}