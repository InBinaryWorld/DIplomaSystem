package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.DeanRequestDto
import pwr.diplomaproject.model.dto.TopicCorrectionRequestDetailsDto
import pwr.diplomaproject.service.DeanCorrectionRequestService
import pwr.diplomaproject.util.userId
import java.security.Principal

@RestController
@RequestMapping("/dean/request/correction")
class DeanCorrectionRequestController @Autowired constructor(
    private val deanCorrectionRequestService: DeanCorrectionRequestService
) {

    @Operation(summary = "Do rozpatrzenia - wnioski o doprecyzowanie tematu")
    @GetMapping("/to-consider")
    fun getCorrectionRequestsToConsider(): List<DeanRequestDto> =
        deanCorrectionRequestService.getCorrectionRequestsToConsider()

    @Operation(summary = "Rozpatrzone - wnioski o doprecyzowanie tematu")
    @GetMapping("/considered")
    fun getCorrectionRequestsConsidered(): List<DeanRequestDto> =
        deanCorrectionRequestService.getCorrectionRequestsConsidered()

    @Operation(summary = "Szczegóły wniosku o doprecyzowanie tematu")
    @GetMapping("/{id}")
    fun getCorrectionRequest(@PathVariable id: Long): TopicCorrectionRequestDetailsDto =
        deanCorrectionRequestService.getCorrectionRequest(id)

    @Operation(summary = "Zaakceptowanie wniosku o doprecyzowanie tematu")
    @GetMapping("/accept/{id}")
    fun acceptCorrectionRequest(
        principal: Principal,
        @PathVariable id: Long): Unit =
        deanCorrectionRequestService.acceptCorrectionRequest(principal.userId, id)

    @Operation(summary = "Odrzucenie wniosku o doprecyzowanie tematu")
    @GetMapping("/reject/{id}")
    fun rejectCorrectionRequest(
        principal: Principal,
        @PathVariable id: Long): Unit =
        deanCorrectionRequestService.rejectCorrectionRequest(principal.userId, id)
}