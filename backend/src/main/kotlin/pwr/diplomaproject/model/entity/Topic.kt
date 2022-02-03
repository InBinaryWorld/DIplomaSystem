package pwr.diplomaproject.model.entity

import pwr.diplomaproject.model.enum.TopicStatus
import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.ManyToOne

@Entity
data class Topic(
    @Id
    val id: Long,
    @ManyToOne
    val lecturer: Employee,
    @ManyToOne
    val student: Student?,
    @ManyToOne
    val graduation: Graduation,
    val topic: String,
    val description: String,
    val studentCount: Int,
    val status: TopicStatus,
    val coordinatorComments: String,
    val createdByStudent: Boolean,
    val creationDate: LocalDate
)
