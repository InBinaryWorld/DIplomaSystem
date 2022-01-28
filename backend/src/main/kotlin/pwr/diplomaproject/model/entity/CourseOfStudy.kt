package pwr.diplomaproject.model.entity

import pwr.diplomaproject.model.enum.StudyType
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.ManyToOne

@Entity
data class CourseOfStudy(
    @Id
    val id: Long,
    @ManyToOne
    val faculty: Faculty,
    val name: String,
    val studyType: StudyType
)
