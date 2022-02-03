package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.StudentNameDto
import pwr.diplomaproject.model.dto.UserRolesDto
import pwr.diplomaproject.service.UserService
import java.security.Principal

@RestController
@RequestMapping("/user")
class UserController @Autowired constructor(
    private val userService: UserService
) {

    @Operation(summary = "Zwraca listę ról użytkownika - studentId dostępnych studentów i employeeId z typem pracownika dostępnych pracowników")
    @GetMapping
    fun getUserRoles(principal: Principal): UserRolesDto =
        userService.getUserRoles(principal.name.toLong())

    @Operation(summary = "Pobranie studenta według numeru indeksu")
    @GetMapping("/student/{index}")
    fun getStudentByIndex(@PathVariable index: String): StudentNameDto =
        userService.getStudentByIndex(index)
}