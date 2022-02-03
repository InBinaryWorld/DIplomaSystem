package pwr.diplomaproject.model.dto

import java.time.LocalDate

data class TeacherSubjectDto(
    val id: Long,
    val topic: String,
    val numberOfStudents: Int,
    val creationDate: LocalDate
)
