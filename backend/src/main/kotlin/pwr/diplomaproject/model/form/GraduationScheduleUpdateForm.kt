package pwr.diplomaproject.model.form

import java.time.LocalDate

data class GraduationScheduleUpdateForm(
    val newTopicRegistrationDeadline: LocalDate,
    val newTopicCoordinatorApprovalDeadline: LocalDate,
    val newTopicCommissionApprovalDeadline: LocalDate,
    val newTopicSelectionDeadline: LocalDate,
    val newTopicCorrectionDeadline: LocalDate,
    val newTopicChangeDeadline: LocalDate
)
