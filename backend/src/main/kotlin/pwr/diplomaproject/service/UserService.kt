package pwr.diplomaproject.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.StudentNameDto
import pwr.diplomaproject.model.dto.UserDto
import pwr.diplomaproject.model.dto.factory.StudentNameDtoFactory
import pwr.diplomaproject.model.dto.factory.UserDtoFactory
import pwr.diplomaproject.repository.EmployeeRepository
import pwr.diplomaproject.repository.StudentRepository
import pwr.diplomaproject.repository.UserRepository

@Service
class UserService @Autowired constructor(
    private val userRepository: UserRepository,
    private val studentRepository: StudentRepository,
    private val employeeRepository: EmployeeRepository
){

    fun getUser(userId: Long): UserDto {
        val user = userRepository.getById(userId)
        val students = studentRepository.getStudentsByUserId(userId)
        val employees = employeeRepository.getEmployeesByUserId(userId)

        return UserDtoFactory.create(user, students, employees)
    }

    fun getStudentByIndex(index: String): StudentNameDto =
        StudentNameDtoFactory.create(studentRepository.getStudentByIndex(index))
}