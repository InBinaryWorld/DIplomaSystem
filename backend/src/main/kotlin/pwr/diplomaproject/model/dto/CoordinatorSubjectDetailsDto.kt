package pwr.diplomaproject.model.dto

data class CoordinatorSubjectDetailsDto(
    val id: Long,
    val topic: String,
    val lecturerName: String,
    val numberOfStudents: String,
    val description: String
)
