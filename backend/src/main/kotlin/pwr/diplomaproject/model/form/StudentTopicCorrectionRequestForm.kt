package pwr.diplomaproject.model.form

data class StudentTopicCorrectionRequestForm(
    val topicId: Long,
    val newTopic: String,
    val newDescription: String
)
