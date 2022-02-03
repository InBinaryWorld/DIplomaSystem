package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.RequestResult

data class StudentTopicChangeRequestDto(
    val id: Long,
    val oldTopic: String,
    val oldSupervisorName: String,
    val newTopic: String,
    val newDescription: String,
    val newSupervisorName: String,
    val status: RequestResult
)
