package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.TopicStatus

data class CoordinatorSubjectDto(
    val id: Long,
    val topic: String,
    val lecturerName: String,
    val status: TopicStatus?
)
