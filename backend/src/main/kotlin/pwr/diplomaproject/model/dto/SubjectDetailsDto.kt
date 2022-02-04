package pwr.diplomaproject.model.dto

data class SubjectDetailsDto(
    val id: Long,
    val topic: String,
    val lecturerName: String,
    val numberOfStudents: Int,
    val description: String
)
