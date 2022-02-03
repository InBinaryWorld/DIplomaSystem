package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.StudentNameDto
import pwr.diplomaproject.model.dto.UserRolesDto

@RestController
@RequestMapping("/user")
class UserController {

    @Operation(summary = "Zwraca listę ról użytkownika - studentId dostępnych studentów i employeeId z typem pracownika dostępnych pracowników")
    @GetMapping
    fun getUserRoles(): UserRolesDto = TODO()

    @Operation(summary = "Pobranie studenta według numeru indeksu")
    @GetMapping("/student/{albumNumber}")
    fun getStudentByAlbumNumber(@PathVariable albumNumber: Int): StudentNameDto = TODO()
}