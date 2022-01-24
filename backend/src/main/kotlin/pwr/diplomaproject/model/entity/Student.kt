package pwr.diplomaproject.model.entity

import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.ManyToOne

@Entity
data class Student(
    @Id
    val id: Long,
    @ManyToOne
    val user: User,
    @ManyToOne
    val courseOfStudy: CourseOfStudy,
    val index: String
)