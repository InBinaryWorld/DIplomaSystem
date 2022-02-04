package pwr.diplomaproject.model.entity

import pwr.diplomaproject.model.enum.ReservationStatus
import java.time.LocalDate
import javax.persistence.*

@Entity
data class Reservation(
    @Id
    val id: Long,
    @ManyToOne
    val topic: Topic,
    @Enumerated(EnumType.STRING)
    var status: ReservationStatus,
    val creationDate: LocalDate,
    @OneToMany(mappedBy = "reservation")
    val groupMembers: List<GroupMember>
)