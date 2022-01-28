package pwr.diplomaproject.model.entity

import pwr.diplomaproject.model.enum.EmployeeType
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.ManyToOne
import javax.persistence.OneToOne

@Entity
data class Employee(
    @Id
    val id: Long,
    @OneToOne
    val user: User,
    @ManyToOne
    val faculty: Faculty,
    val type: EmployeeType,
    val title: String
)