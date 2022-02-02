package pwr.diplomaproject.model.dto

data class StudentSubjectDto(
    val id: Long,
    val topic: String,
    val supervisorName: String,
    val numberOfStudents: Int
)