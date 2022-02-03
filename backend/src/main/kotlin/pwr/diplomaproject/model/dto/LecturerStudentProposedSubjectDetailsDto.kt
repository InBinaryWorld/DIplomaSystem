package pwr.diplomaproject.model.dto

data class LecturerStudentProposedSubjectDetailsDto(
    val id: Long,
    val topic: String,
    val description: String,
    val students: List<StudentNameDto>
)
