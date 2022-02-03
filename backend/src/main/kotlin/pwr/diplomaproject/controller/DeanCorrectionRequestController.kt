package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.DeanCorrectionRequestDetailsDto
import pwr.diplomaproject.model.dto.DeanRequestDto

@RestController
@RequestMapping("/dean/request/correction")
class DeanCorrectionRequestController {

    @Operation(summary = "Do rozpatrzenia - wnioski o doprecyzowanie tematu")
    @GetMapping("/to-consider")
    fun getCorrectionRequestsToConsider(): List<DeanRequestDto> = TODO()

    @Operation(summary = "Rozpatrzone - wnioski o doprecyzowanie tematu")
    @GetMapping("/considered")
    fun getCorrectionRequestsConsidered(): List<DeanRequestDto> = TODO()

    @Operation(summary = "Szczegóły wniosku o doprecyzowanie tematu")
    @GetMapping("/{id}")
    fun getCorrectionRequest(@PathVariable id: Long): DeanCorrectionRequestDetailsDto = TODO()

    @Operation(summary = "Zaakceptowanie wniosku o doprecyzowanie tematu")
    @GetMapping("/accept/{id}")
    fun acceptCorrectionRequest(@PathVariable id: Long): Unit = TODO()

    @Operation(summary = "Odrzucenie wniosku o doprecyzowanie tematu")
    @GetMapping("/reject/{id}")
    fun rejectCorrectionRequest(@PathVariable id: Long): Unit = TODO()
}