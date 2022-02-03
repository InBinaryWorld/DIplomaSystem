package pwr.diplomaproject.model.dto

data class UserRolesDto(
    val studentIds: List<Int>,
    val employeeRoles: List<UserEmployeeRoleDto>
)
