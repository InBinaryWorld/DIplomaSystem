package pwr.diplomaproject.model.dto

data class DeanCorrectionRequestDetailsDto(
    val id: Long,
    val oldTopic: String,
    val oldDescription: String,
    val newTopic: String,
    val newDescription: String
)
