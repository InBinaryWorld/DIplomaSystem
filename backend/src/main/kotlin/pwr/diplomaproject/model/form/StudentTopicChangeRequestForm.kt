package pwr.diplomaproject.model.form

data class StudentTopicChangeRequestForm(
    val studentId: Long,
    val previousThesisId: Long,
    val thesisId: Long?,
    val newThesis: StudentTopicChangeRequestNewTopicForm?
) {

    fun thesisExists(): Boolean = thesisId != null
}
