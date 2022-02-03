package pwr.diplomaproject.model.dto

data class TeacherSubjectDetailsDto(
    val id: Long,
    val topic: String,
    val numberOfStudents: Int,
    val description: String
)
