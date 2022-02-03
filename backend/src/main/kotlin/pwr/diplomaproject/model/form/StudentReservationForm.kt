package pwr.diplomaproject.model.form

data class StudentReservationForm(
    val subjectId: Long,
    val studentIds: List<Long>
)
