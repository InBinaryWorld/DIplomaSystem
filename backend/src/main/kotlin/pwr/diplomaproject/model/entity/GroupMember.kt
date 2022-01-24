package pwr.diplomaproject.model.entity

import pwr.diplomaproject.model.enum.MemberStatus
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.ManyToOne

@Entity
data class GroupMember(
    @Id
    val id: Long,
    @ManyToOne
    val reservation: Reservation,
    @ManyToOne
    val student: Student,
    val status: MemberStatus
)