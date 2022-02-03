package pwr.diplomaproject.model.entity

import pwr.diplomaproject.model.enum.RequestResult
import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.ManyToOne

@Entity
data class TopicCorrectionRequest(
    @Id
    val id: Long,
    @ManyToOne
    val student: Student,
    @ManyToOne
    val employee: Employee,
    val result: RequestResult,
    val requestDate: LocalDate,
    val newName: String,
    val newDescription: String
)