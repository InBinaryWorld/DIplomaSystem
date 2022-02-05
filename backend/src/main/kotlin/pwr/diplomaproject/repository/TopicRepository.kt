package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import pwr.diplomaproject.model.entity.Topic

@Repository
interface TopicRepository : JpaRepository<Topic, Long> {
    @Query(
        """
        SELECT t
        FROM Topic t
        LEFT JOIN Reservation r ON r.topic = t
        LEFT JOIN GroupMember g ON g.reservation = r
        LEFT JOIN Student s ON g.student = s
        WHERE t.status = 'ACCEPTED_BY_COMMISSION' and s.id <> :studentId
        GROUP BY t
        HAVING sum(case r.status when 'CONFIRMED' then 1 else 0 end) = 0
    """
    )
    fun findAllAvailableForStudent(studentId: Long): List<Topic>

    @Query(
        """
        FROM Topic t
        WHERE t.createdByStudent = true and t.student.id = :studentId 
    """
    )
    fun findAllProposedByStudent(studentId: Long): List<Topic>
}
