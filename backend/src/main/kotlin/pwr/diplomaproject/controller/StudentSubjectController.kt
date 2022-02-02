package pwr.diplomaproject.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.StudentSubjectDetailsDto
import pwr.diplomaproject.model.dto.StudentSubjectDto

@RestController("/student/subject")
class StudentSubjectController {

    @GetMapping("/available")
    fun getAvailableSubjects(): List<StudentSubjectDto> = TODO()

    @GetMapping("/proposed")
    fun getProposedSubjects(): List<StudentSubjectDto> = TODO()

    @GetMapping()
    fun getSubject(@RequestParam id: Long): StudentSubjectDetailsDto = TODO()
}