package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.TopicStatus
import java.time.LocalDate

data class TopicDto(
    val id: Long,
    // todo add related dtos (teacher, student, graduation)
    val topic: String,
    val description: String,
    val studentCount: Int,
    val status: TopicStatus,
    val coordinatorComments: String,
    val createdByStudent: Boolean,
    val creationDate: LocalDate
)