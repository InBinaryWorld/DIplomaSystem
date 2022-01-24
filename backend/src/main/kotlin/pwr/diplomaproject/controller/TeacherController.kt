package pwr.diplomaproject.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestParam
import pwr.diplomaproject.model.dto.TeacherDto

@Controller("/teacher")
class TeacherController {

    fun getTeachers(@RequestParam studentId: Long): List<TeacherDto> = TODO()
}