package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.GraduationScheduleDto
import pwr.diplomaproject.model.dto.factory.GraduationScheduleDtoFactory
import pwr.diplomaproject.model.form.GraduationScheduleUpdateForm
import pwr.diplomaproject.repository.ScheduleRepository

@Service
class GraduationScheduleService @Autowired constructor(
    private val scheduleRepository: ScheduleRepository
) {

    fun getSchedule(scheduleId: Long): GraduationScheduleDto =
        GraduationScheduleDtoFactory.create(scheduleRepository.getById(scheduleId))

    fun updateSchedule(scheduleId: Long, form: GraduationScheduleUpdateForm) {
        val schedule = scheduleRepository.getById(scheduleId)

        schedule.topicRegistrationDeadline = form.newTopicRegistrationDeadline
        schedule.topicCoordinatorApprovalDeadline = form.newTopicCoordinatorApprovalDeadline
        schedule.topicCommissionApprovalDeadline = form.newTopicCommissionApprovalDeadline
        schedule.topicSelectionDeadline = form.newTopicSelectionDeadline
        schedule.topicCorrectionDeadline = form.newTopicCorrectionDeadline
        schedule.topicChangeDeadline = form.newTopicChangeDeadline

        scheduleRepository.save(schedule)
    }

}
