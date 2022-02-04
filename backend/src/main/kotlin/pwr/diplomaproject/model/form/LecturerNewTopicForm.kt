package pwr.diplomaproject.model.form

data class LecturerNewTopicForm (
    val topic: String,
    val numberOfStudents: Int,
    val description: String,
    val courseOfStudyId: Long
)