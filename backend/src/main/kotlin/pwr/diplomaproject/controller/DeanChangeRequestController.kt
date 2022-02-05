package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.DeanRequestDto
import pwr.diplomaproject.model.dto.TopicChangeRequestDetailsDto
import pwr.diplomaproject.service.DeanChangeRequestService
import pwr.diplomaproject.util.userId
import java.security.Principal

@RestController
@RequestMapping("/dean/request/change")
class DeanChangeRequestController @Autowired constructor(
    private val deanChangeRequestService: DeanChangeRequestService
){

    @Operation(summary = "Do rozpatrzenia - wnioski o zmianę tematu")
    @GetMapping("/to-consider")
    fun getChangeRequestsToConsider(): List<DeanRequestDto> =
        deanChangeRequestService.getChangeRequestsConsidered()

    @Operation(summary = "Rozpatrzone - wnioski o zmianę tematu")
    @GetMapping("/considered")
    fun getChangeRequestsConsidered(): List<DeanRequestDto> =
        deanChangeRequestService.getChangeRequestsToConsider()

    @Operation(summary = "Szczegóły wniosku o zmianę tematu")
    @GetMapping("/{id}")
    fun getChangeRequest(@PathVariable id: Long): TopicChangeRequestDetailsDto =
        deanChangeRequestService.getChangeRequest(id)

    @Operation(summary = "Zaakceptowanie wniosku o zmianę tematu")
    @GetMapping("/accept/{id}")
    fun acceptChangeRequest(
        principal: Principal,
        @PathVariable id: Long): Unit =
        deanChangeRequestService.acceptChangeRequest(principal.userId, id)

    @Operation(summary = "Odrzucenie wniosku o zmianę tematu")
    @GetMapping("/reject/{id}")
    fun rejectChangeRequest(
        principal: Principal,
        @PathVariable id: Long): Unit =
        deanChangeRequestService.rejectChangeRequest(principal.userId, id)
}