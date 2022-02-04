package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import pwr.diplomaproject.model.entity.Graduation

interface GraduationRepository : JpaRepository<Graduation, Long> {

    @Query("FROM Graduation g JOIN Schedule s ON g = s.graduation WHERE g.courseOfStudy.id = :courseOfStudyId AND current_date < s.topicRegistrationDeadline ORDER BY s.topicRegistrationDeadline ASC")
    fun findCurrentGraduationByCourseOfStudyId(courseOfStudyId: Long): Graduation?
}