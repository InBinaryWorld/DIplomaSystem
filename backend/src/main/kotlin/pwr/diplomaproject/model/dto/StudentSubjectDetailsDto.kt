package pwr.diplomaproject.model.dto

data class StudentSubjectDetailsDto(
    val id: Long,
    val topic: Long,
    val supervisorName: String,
    val numberOfStudents: Int,
    val description: String
)
