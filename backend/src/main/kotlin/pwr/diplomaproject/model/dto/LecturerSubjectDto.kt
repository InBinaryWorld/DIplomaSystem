package pwr.diplomaproject.model.dto

import java.time.LocalDate

data class LecturerSubjectDto(
    val id: Long,
    val topic: String,
    val numberOfStudents: Int,
    val creationDate: LocalDate
)
