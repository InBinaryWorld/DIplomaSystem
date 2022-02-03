package pwr.diplomaproject.model.dto

data class TeacherSubjectReservationDto(
    val subjectId: Long,
    val topic: String,
    val numberOfStudents: Int,
    val requireDecision: Int
)
