package pwr.diplomaproject.model.entity

import pwr.diplomaproject.model.enum.EmployeeType
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.ManyToOne

@Entity
data class Employee(
    @Id
    val id: Long,
    @ManyToOne
    val user: User,
    @ManyToOne
    val faculty: Faculty,
    val type: EmployeeType,
    val title: String
)