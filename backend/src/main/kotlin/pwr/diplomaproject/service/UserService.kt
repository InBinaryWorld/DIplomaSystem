package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.StudentNameDto
import pwr.diplomaproject.model.dto.UserRolesDto
import pwr.diplomaproject.model.dto.factory.StudentNameDtoFactory
import pwr.diplomaproject.model.dto.factory.UserEmployeeRoleDtoFactory
import pwr.diplomaproject.repository.EmployeeRepository
import pwr.diplomaproject.repository.StudentRepository

@Service
class UserService @Autowired constructor(
    private val studentRepository: StudentRepository,
    private val employeeRepository: EmployeeRepository
){

    fun getUserRoles(userId: Long): UserRolesDto {
        val studentIds = studentRepository.getStudentsByUserId(userId)
            .map { it.id }
        val employeeRoles = employeeRepository.getEmployeesByUserId(userId)
            .map { UserEmployeeRoleDtoFactory.create(it) }

        return UserRolesDto(studentIds, employeeRoles)
    }

    fun getStudentByIndex(index: String): StudentNameDto =
        StudentNameDtoFactory.create(studentRepository.getStudentByIndex(index))
}