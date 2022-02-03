package pwr.diplomaproject.model.form

data class TeacherTopicCorrectionForm(
    val topicId: Long,
    val topic: String,
    val numberOfStudents: Int,
    val description: String
)
