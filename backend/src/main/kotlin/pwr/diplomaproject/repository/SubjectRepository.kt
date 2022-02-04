package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.enum.TopicStatus

interface SubjectRepository : JpaRepository<Topic, Long> {

    fun findAllByStatusIsIn(statuses: List<TopicStatus>): List<Topic>

    @Query("FROM Topic as t WHERE t.lecturer.id = :lecturerId AND t.createdByStudent = false")
    fun findAllLecturerProposedByLecturer(lecturerId: Long): List<Topic>

    @Query("FROM Topic as t WHERE t.lecturer.id = :lecturerId AND t.createdByStudent = true")
    fun findAllStudentProposedByLecturer(lecturerId: Long): List<Topic>

    fun findAllByLecturerIdAndStatus(lecturerId: Long, status: TopicStatus): List<Topic>

    @Query("FROM Topic as t WHERE t.lecturer.id = :lecturerId AND t.id = :subjectId")
    fun getByLecturerIdAndSubjectId(lecturerId: Long, subjectId: Long): Topic
}