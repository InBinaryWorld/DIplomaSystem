package pwr.diplomaproject.model.entity

import pwr.diplomaproject.model.dto.ReservationDto
import pwr.diplomaproject.model.enum.ReservationStatus
import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.ManyToOne

@Entity
data class Reservation(
    @Id
    val id: Long,
    @ManyToOne
    val topic: Topic,
    val status: ReservationStatus,
    val creationDate: LocalDate
) {

    fun toDto(): ReservationDto =
        ReservationDto(id, topic.toDto(), status, creationDate)
}