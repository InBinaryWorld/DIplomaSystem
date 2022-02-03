package pwr.diplomaproject.model.dto

data class DeanChangeRequestDetailsDto(
    val id: Long,
    val oldLecturerName: String,
    val oldTopic: String,
    val oldDescription: String,
    val newLecturerName: String,
    val newTopic: String,
    val newDescription: String
)
