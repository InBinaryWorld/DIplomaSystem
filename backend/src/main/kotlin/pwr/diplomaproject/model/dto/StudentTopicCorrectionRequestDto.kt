package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.RequestResult

data class StudentTopicCorrectionRequestDto(
    val id: Long,
    val oldTopic: String,
    val oldDescription: String,
    val newTopic: String,
    val newDescription: String,
    val status: RequestResult
)
