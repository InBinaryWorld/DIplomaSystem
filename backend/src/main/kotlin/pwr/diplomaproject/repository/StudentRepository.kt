package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import pwr.diplomaproject.model.entity.Student

@Repository
interface StudentRepository : JpaRepository<Student, Long> {

    fun getStudentsByUserId(userId: Long): List<Student>

    fun getStudentByIndex(index: String): Student

    @Query("FROM Student st JOIN GroupMember g JOIN Reservation JOIN Topic t WHERE t.id = :subjectId")
    fun getStudentByProposedSubjectId(subjectId: Long): List<Student>
}
