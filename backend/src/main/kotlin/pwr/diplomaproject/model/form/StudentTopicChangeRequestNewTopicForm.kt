package pwr.diplomaproject.model.form

data class StudentTopicChangeRequestNewTopicForm(
    val currentTopicId: Long,
    val newTopic: String,
    val newDescription: String,
    val newStudentCount: Int,
    val newSupervisorId: Long
)
