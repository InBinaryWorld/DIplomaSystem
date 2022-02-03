package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.EmployeeType

data class UserEmployeeRoleDto (
    val employeeId: Long,
    val type: EmployeeType
)