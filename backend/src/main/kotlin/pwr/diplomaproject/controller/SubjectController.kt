package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.enum.TopicStatus
import pwr.diplomaproject.service.SubjectService

@RestController
@RequestMapping("/subject")
class SubjectController @Autowired constructor(
    private val subjectService: SubjectService
){

    @Operation(summary = "Tematy według statusu, dyplomowania i proponującego studenta")
    @GetMapping
    fun getSubjects(
        @RequestParam(required = false) status: TopicStatus?,
        @RequestParam(required = false) diplomaSessionId: Long?,
        @RequestParam(required = false) proposedByStudentId: Long?): List<SubjectDetailsDto> =
        subjectService.getSubjects(status, diplomaSessionId, proposedByStudentId)


    @Operation(summary = "Szczegóły tematu")
    @GetMapping(params = ["id"])
    fun getSubject(@RequestParam id: Long): SubjectDetailsDto =
        subjectService.getDetails(id)
}