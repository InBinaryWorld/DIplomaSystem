package pwr.diplomaproject.controller

import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.StudentSubjectDetailsDto
import pwr.diplomaproject.model.dto.StudentSubjectDto

@RestController
@RequestMapping("/student/subject")
class StudentSubjectController {

    @GetMapping("/available")
    fun getAvailableSubjects(): List<StudentSubjectDto> = TODO()

    @GetMapping("/proposed")
    fun getProposedSubjects(): List<StudentSubjectDto> = TODO()

    @GetMapping("/{id}")
    fun getSubject(@PathVariable id: Long): StudentSubjectDetailsDto = TODO()
}