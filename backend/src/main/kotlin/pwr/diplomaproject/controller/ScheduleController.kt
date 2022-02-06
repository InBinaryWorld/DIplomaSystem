package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.ScheduleDto
import pwr.diplomaproject.service.ScheduleService

@RestController
@RequestMapping("/schedule")
class ScheduleController @Autowired constructor(
    private val scheduleService: ScheduleService
){

    @Operation(summary = "Zwraca wszystkie harmonogramy")
    @GetMapping
    fun getSchedules(): List<ScheduleDto> =
        scheduleService.getSchedules()

    @Operation(summary = "Zwraca harmonogram według id")
    @GetMapping(params = ["id"])
    fun getSchedule(@RequestParam id: Long): ScheduleDto =
        scheduleService.getScheduleById(id)
}