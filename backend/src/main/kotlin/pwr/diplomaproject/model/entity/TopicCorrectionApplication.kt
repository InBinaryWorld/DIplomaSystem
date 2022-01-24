package pwr.diplomaproject.model.entity

import pwr.diplomaproject.model.enum.ApplicationResult
import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.ManyToOne

@Entity
data class TopicCorrectionApplication(
    @Id
    val id: Long,
    @ManyToOne
    val student: Student,
    @ManyToOne
    val employee: Employee,
    val result: ApplicationResult,
    val applicationDate: LocalDate,
    val newName: String,
    val newDescription: String
)