package pwr.diplomaproject.model.entity

import pwr.diplomaproject.model.enum.ApplicationResult
import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.ManyToOne

@Entity
data class TopicChangeApplication(
    @Id
    val id: Long,
    @ManyToOne
    val student: Student,
    @ManyToOne
    val employee: Employee,
    @ManyToOne
    val oldTopic: Topic,
    @ManyToOne
    val newTopic: Topic,
    val result: ApplicationResult,
    val applicationDate: LocalDate,
)