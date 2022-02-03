package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.DeanCorrectionRequestDetailsDto
import pwr.diplomaproject.model.dto.DeanCorrectionRequestDto

@RestController
@RequestMapping("/dean/request")
class DeanRequestController {

    @Operation(summary = "Do rozpatrzenia - wnioski o doprecyzowanie tematu")
    @GetMapping("/to-consider")
    fun getRequestsToConsider(): List<DeanCorrectionRequestDto> = TODO()

    @Operation(summary = "Rozpatrzone - wnioski o doprecyzowanie tematu")
    @GetMapping("/considered")
    fun getRequestsConsidered(): List<DeanCorrectionRequestDto> = TODO()

    @Operation(summary = "Szczegóły wniosku o doprecyzowanie tematu")
    @GetMapping("/{id}")
    fun getRequest(@PathVariable id: Long): DeanCorrectionRequestDetailsDto = TODO()

    @Operation(summary = "Zaakceptowanie wniosku o doprecyzowanie tematu")
    @GetMapping("/accept/{id}")
    fun acceptRequest(@PathVariable id: Long): Unit = TODO()

    @Operation(summary = "Odrzucenie wniosku o doprecyzowanie tematu")
    @GetMapping("/reject/{id}")
    fun rejectRequest(@PathVariable id: Long): Unit = TODO()
}