package pwr.diplomaproject.model.dto

data class UserRolesDto(
    val studentIds: List<Long>,
    val employeeRoles: List<UserEmployeeRoleDto>
)
