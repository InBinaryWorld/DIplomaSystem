package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.StudentRequestDto
import pwr.diplomaproject.model.dto.TopicChangeRequestDetailsDto
import pwr.diplomaproject.model.dto.TopicCorrectionRequestDetailsDto
import pwr.diplomaproject.model.form.StudentTopicChangeRequestExistingTopicForm
import pwr.diplomaproject.model.form.StudentTopicChangeRequestNewTopicForm
import pwr.diplomaproject.model.form.StudentTopicCorrectionRequestForm
import pwr.diplomaproject.service.StudentRequestService
import pwr.diplomaproject.util.userId
import java.security.Principal

@RestController
@RequestMapping("/student/request")
class StudentRequestController @Autowired constructor(
    private val studentRequestService: StudentRequestService
){

    @Operation(summary = "Złożone przez zalogowanego studenta wnioski o zmianę tematu")
    @GetMapping("/topic-change")
    fun getTopicChangeRequests(@RequestParam studentId: Long): List<StudentRequestDto> =
        studentRequestService.getTopicChangeRequests(studentId)

    @Operation(summary = "Szczegóły wniosku o zmianę tematu")
    @GetMapping("/topic-change/{id}")
    fun getTopicChangeRequestDetails(@PathVariable id: Long): TopicChangeRequestDetailsDto =
        studentRequestService.getTopicChangeRequestDetails(id)

    @Operation(summary = "Złożone przez zalogowanego studenta wnioski o doprecyzowanie tematu")
    @GetMapping("/topic-correction")
    fun getTopicCorrectionRequests(@RequestParam studentId: Long): List<StudentRequestDto> =
        studentRequestService.getTopicCorrectionRequests(studentId)

    @Operation(summary = "Szczegóły wniosku o doprecyzowanie tematu")
    @GetMapping("/topic-correction/{id}")
    fun getTopicCorrectionRequestDetails(@PathVariable id: Long): TopicCorrectionRequestDetailsDto =
        studentRequestService.getTopicCorrectionRequestDetails(id)

    @Operation(summary = "Złożenie wniosku o zmianę tematu - na istniejący temat")
    @PostMapping("/topic-change/existing")
    fun makeTopicChangeToExistingTopicRequest(
        @RequestParam studentId: Long,
        @RequestBody form: StudentTopicChangeRequestExistingTopicForm): Unit =
        studentRequestService.makeTopicChangeToExistingTopicRequest(studentId, form)

    @Operation(summary = "Złożenie wniosku o zmianę tematu - na nowy temat")
    @PostMapping("/topic-change/new")
    fun makeTopicChangeToNewTopicRequest(
        @RequestParam studentId: Long,
        @RequestBody form: StudentTopicChangeRequestNewTopicForm): Unit =
        studentRequestService.makeTopicChangeToNewTopicRequest(studentId, form)

    @Operation(summary = "Złożenie wniosku o doprecyzowanie tematu")
    @PostMapping("/topic-correction")
    fun makeTopicCorrectionRequest(
        @RequestParam studentId: Long,
        @RequestBody form: StudentTopicCorrectionRequestForm): Unit =
        studentRequestService.makeTopicCorrectionRequest(studentId, form)

    @Operation(summary = "Anulowanie wniosku o zmianę tematu")
    @DeleteMapping("/topic-change/{id}")
    fun cancelTopicChangeRequest(
        principal: Principal,
        @PathVariable id: Long): Unit =
        studentRequestService.cancelTopicChangeRequest(principal.userId, id)

    @Operation(summary = "Anulowanie wniosku o doprecyzowanie tematu")
    @DeleteMapping("/topic-correction/{id}")
    fun cancelTopicCorrectionRequest(
        principal: Principal,
        @PathVariable id: Long): Unit =
        studentRequestService.cancelTopicCorrectionRequest(principal.userId, id)
}