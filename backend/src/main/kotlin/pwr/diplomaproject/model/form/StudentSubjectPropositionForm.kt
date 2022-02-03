package pwr.diplomaproject.model.form

data class StudentSubjectPropositionForm (
    val topic: String,
    val supervisorId: Long,
    val numberOfStudents: Int,
    val students: List<Long>,
    val description: String
)