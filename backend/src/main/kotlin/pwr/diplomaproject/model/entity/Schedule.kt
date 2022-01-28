package pwr.diplomaproject.model.entity

import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.OneToOne

@Entity
data class Schedule(
    @Id
    val id: Long,
    @OneToOne
    val graduation: Graduation,
    val topicRegistrationDeadline: LocalDate,
    val topicCoordinatorApprovalDeadline: LocalDate,
    val topicCommissionApprovalDeadline: LocalDate,
    val topicSelectionDeadline: LocalDate,
    val topicCorrectionDeadline: LocalDate,
    val topicChangeDeadline: LocalDate
)
