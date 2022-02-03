package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import pwr.diplomaproject.model.entity.Employee

@Repository
interface EmployeeRepository : JpaRepository<Employee, Long> {

    fun getEmployeesByUserId(userId: Long): List<Employee>
}