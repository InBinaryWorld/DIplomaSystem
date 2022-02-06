package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.ChangeRequestDto
import pwr.diplomaproject.model.dto.ClarificationRequestDto
import pwr.diplomaproject.service.RequestService

@RestController
@RequestMapping("/request")
class RequestController @Autowired constructor(
    private val requestService: RequestService
){

    @Operation(summary = "Zwraca wniosek o doprecyzowanie według id")
    @GetMapping("/clarification", params = ["id"])
    fun getClarificationRequestById(@RequestParam id: Long): ClarificationRequestDto =
        requestService.getClarificationRequestById(id)

    @Operation(summary = "Zwraca wnioski o doprecyzowanie według dyplomowania, studenta lub rozpatrującego dziakana")
    @GetMapping("/clarification")
    fun getClarificationRequestsByDiplomaSessionOrStudentOrDean(
        @RequestParam(required = false) diplomaSessionId: Long?,
        @RequestParam(required = false) studentId: Long?,
        @RequestParam(required = false) deanId: Long?): List<ClarificationRequestDto> =
        requestService.getClarificationRequestsByGraduationOrStudentOrDean(diplomaSessionId, studentId, deanId)

    @Operation(summary = "Zwraca wniosek o zmianę tematu według id")
    @GetMapping("/change", params = ["id"])
    fun getChangeRequestById(@RequestParam id: Long): ChangeRequestDto =
        requestService.getChangeRequestById(id)

    @Operation(summary = "Zwraca wnioski o zmianę tematu według dyplomowania, studenta lub rozpatrującego członka komisji")
    @GetMapping("/change")
    fun getChangeRequestsByDiplomaSessionOrStudentOrCommittee(
        @RequestParam(required = false) diplomaSessionId: Long?,
        @RequestParam(required = false) studentId: Long?,
        @RequestParam(required = false) committeeId: Long?): List<ChangeRequestDto> =
        requestService.getChangeRequestsByGraduationOrStudentOrCommittee(diplomaSessionId, studentId, committeeId)
}