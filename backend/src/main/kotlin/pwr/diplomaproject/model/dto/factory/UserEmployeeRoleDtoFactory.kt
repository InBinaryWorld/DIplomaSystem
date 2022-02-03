package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.UserEmployeeRoleDto
import pwr.diplomaproject.model.entity.Employee

class UserEmployeeRoleDtoFactory {
    companion object {
        fun create(employee: Employee): UserEmployeeRoleDto = UserEmployeeRoleDto(
            employee.id,
            employee.type
        )
    }
}