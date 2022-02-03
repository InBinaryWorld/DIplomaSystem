package pwr.diplomaproject.model.form

data class TeacherNewTopicForm (
    val topic: String,
    val numberOfStudents: Int,
    val description: String
)