package pwr.diplomaproject.model.entity

import javax.persistence.Entity
import javax.persistence.Id

@Entity(name = "AppUser")
data class User(
    @Id
    val id: Long,
    val firstName: String,
    val lastName: String,
    val password: String
)