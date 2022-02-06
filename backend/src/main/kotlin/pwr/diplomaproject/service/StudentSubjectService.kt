package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.StudentSubjectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.dto.factory.StudentSubjectDetailsDtoFactory
import pwr.diplomaproject.model.dto.factory.SubjectDtoFactory
import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.enum.EmployeeType
import pwr.diplomaproject.model.enum.TopicStatus
import pwr.diplomaproject.model.form.StudentSubjectPropositionForm
import pwr.diplomaproject.model.mail.SubjectProposedByStudent
import pwr.diplomaproject.model.mail.SubjectPropositionDeletedByStudent
import pwr.diplomaproject.repository.*
import java.time.LocalDate

@Service
class StudentSubjectService @Autowired constructor(
    private val topicRepository: TopicRepository,
    private val subjectRepository: SubjectRepository,
    private val employeeRepository: EmployeeRepository,
    private val studentRepository: StudentRepository,
    private val graduationRepository: GraduationRepository,
) {
    fun getAvailableSubjects(studentId: Long, graduationId: Long): List<SubjectDto> =
        topicRepository.findAllByGraduationAvailableForStudent(studentId, graduationId).map {
            SubjectDtoFactory.create(it)
        }

    fun getProposedSubjects(studentId: Long, graduationId: Long): List<SubjectDto> =
        topicRepository.findAllByStudentAndGraduation(studentId, graduationId).map {
            SubjectDtoFactory.create(it)
        }

    fun getSubject(id: Long): StudentSubjectDetailsDto =
        StudentSubjectDetailsDtoFactory.create(topicRepository.findByIdOrNull(id)!!)

    fun proposeSubject(studentId: Long, graduationId: Long, form: StudentSubjectPropositionForm) {
        val student = studentRepository.getById(studentId)
        val employee = employeeRepository.getEmployeeByUserIdAndType(form.supervisorId, EmployeeType.LECTURER)

        val newSubject = Topic(
            subjectRepository.getNextId(),
            employee,
            student,
            graduationRepository.getById(graduationId),
            form.topic,
            form.description,
            form.numberOfStudents,
            TopicStatus.PROPOSED_BY_STUDENT,
            null,
            true,
            LocalDate.now()
        )

        SubjectProposedByStudent(listOf(employee.user), newSubject, student.user).send()

        subjectRepository.save(newSubject)
    }

    fun deleteProposedSubject(studentId: Long, id: Long) {
        val subject = topicRepository.findByIndexAndStudent(id, studentId)
        if (subject.status == TopicStatus.PROPOSED_BY_STUDENT) {
            SubjectPropositionDeletedByStudent(listOf(subject.lecturer.user), subject, subject.student!!.user).send()
            topicRepository.delete(subject)
        }
    }
}
