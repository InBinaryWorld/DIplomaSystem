package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.ReservationStatus
import java.time.LocalDate

data class ReservationDto(
    val id: Long,
    val topic: TopicDto,
    val status: ReservationStatus,
    val creationDate: LocalDate
)