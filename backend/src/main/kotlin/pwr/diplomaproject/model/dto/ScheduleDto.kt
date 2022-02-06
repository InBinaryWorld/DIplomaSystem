package pwr.diplomaproject.model.dto

import java.time.LocalDate

data class ScheduleDto(
    val id: Long,
    val diplomaSessionId: Long,
    val submittingThesis: LocalDate,
    val approvingThesisByCoordinator: LocalDate,
    val approvingThesisByCommittee: LocalDate,
    val selectingThesis: LocalDate,
    val clarificationThesis: LocalDate,
    val changingThesis: LocalDate
)
