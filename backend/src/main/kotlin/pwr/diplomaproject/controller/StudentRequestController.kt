package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.StudentRequestDto
import pwr.diplomaproject.model.dto.StudentTopicChangeRequestDto
import pwr.diplomaproject.model.dto.StudentTopicCorrectionRequestDto
import pwr.diplomaproject.model.form.StudentTopicChangeRequestExistingTopicForm
import pwr.diplomaproject.model.form.StudentTopicChangeRequestNewTopicForm
import pwr.diplomaproject.model.form.StudentTopicCorrectionRequestForm

@RestController
@RequestMapping("/student/request")
class StudentRequestController {

    @Operation(summary = "Złożone przez zalogowanego studenta wnioski o zmianę tematu")
    @GetMapping("/topic-change")
    fun getTopicChangeRequest(@RequestParam studentId: Long): List<StudentRequestDto> = TODO()

    @Operation(summary = "Szczegóły wniosku o zmianę tematu")
    @GetMapping("/topic-change/{id}")
    fun getTopicChangeRequestDetails(@PathVariable id: Long): StudentTopicChangeRequestDto = TODO()

    @Operation(summary = "Złożone przez zalogowanego studenta wnioski o doprecyzowanie tematu")
    @GetMapping("/topic-correction")
    fun getTopicCorrectionRequest(@RequestParam studentId: Long): List<StudentRequestDto> = TODO()

    @Operation(summary = "Szczegóły wniosku o doprecyzowanie tematu")
    @GetMapping("/topic-correction/{id}")
    fun getTopicCorrectionRequestDetails(@PathVariable id: Long): StudentTopicCorrectionRequestDto = TODO()

    @Operation(summary = "Złożenie wniosku o zmianę tematu - na istniejący temat")
    @PostMapping("/topic-change/existing")
    fun makeTopicChangeToExistingTopicRequest(
        @RequestParam studentId: Long,
        @RequestBody form: StudentTopicChangeRequestExistingTopicForm): Unit = TODO()

    @Operation(summary = "Złożenie wniosku o zmianę tematu - na nowy temat")
    @PostMapping("/topic-change/new")
    fun makeTopicChangeToNewTopicRequest(
        @RequestParam studentId: Long,
        @RequestBody form: StudentTopicChangeRequestNewTopicForm): Unit = TODO()

    @Operation(summary = "Złożenie wniosku o doprecyzowanie tematu")
    @PostMapping("/topic-correction")
    fun makeTopicCorrectionRequest(
        @RequestParam studentId: Long,
        @RequestBody form: StudentTopicCorrectionRequestForm): Unit = TODO()

    @Operation(summary = "Anulowanie wniosku o zmianę tematu")
    @DeleteMapping("/topic-change/{id}")
    fun cancelTopicChangeRequest(@PathVariable id: Long): Unit = TODO()

    @Operation(summary = "Anulowanie wniosku o doprecyzowanie tematu")
    @DeleteMapping("/topic-correction/{id}")
    fun cancelTopicCorrectionRequest(@PathVariable id: Long): Unit = TODO()
}