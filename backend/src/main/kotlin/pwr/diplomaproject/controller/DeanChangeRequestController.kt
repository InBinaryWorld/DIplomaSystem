package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.DeanChangeRequestDetailsDto
import pwr.diplomaproject.model.dto.DeanRequestDto

@RestController
@RequestMapping("/dean/request/change")
class DeanChangeRequestController {

    @Operation(summary = "Do rozpatrzenia - wnioski o zmianę tematu")
    @GetMapping("/to-consider")
    fun getChangeRequestsToConsider(): List<DeanRequestDto> = TODO()

    @Operation(summary = "Rozpatrzone - wnioski o zmianę tematu")
    @GetMapping("/considered")
    fun getChangeRequestsConsidered(): List<DeanRequestDto> = TODO()

    @Operation(summary = "Szczegóły wniosku o zmianę tematu")
    @GetMapping("/{id}")
    fun getChangeRequest(@PathVariable id: Long): DeanChangeRequestDetailsDto = TODO()

    @Operation(summary = "Zaakceptowanie wniosku o zmianę tematu")
    @GetMapping("/accept/{id}")
    fun acceptChangeRequest(@PathVariable id: Long): Unit = TODO()

    @Operation(summary = "Odrzucenie wniosku o zmianę tematu")
    @GetMapping("/reject/{id}")
    fun rejectChangeRequest(@PathVariable id: Long): Unit = TODO()
}