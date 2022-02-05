package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.dto.factory.SubjectDtoFactory
import pwr.diplomaproject.repository.TopicRepository

@Service
class StudentSubjectService @Autowired constructor(
    private val topicRepository: TopicRepository,
) {
    fun getAvailableSubjects(studentId: Long): List<SubjectDto> =
        topicRepository.findAllAvailableForStudent(studentId).map {
            SubjectDtoFactory.create(it)
        }
}
