package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import pwr.diplomaproject.model.dto.LecturerSubjectReservationDto
import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.enum.TopicStatus

interface SubjectRepository : JpaRepository<Topic, Long> {

    @Query(value = "select max(t.id) + 1 from Topic t")
    fun getNextId(): Long

    fun findAllByStatusIsIn(statuses: List<TopicStatus>): List<Topic>

    @Query("FROM Topic as t WHERE t.lecturer.id = :lecturerId AND t.createdByStudent = false")
    fun findAllLecturerProposedByLecturer(lecturerId: Long): List<Topic>

    @Query("FROM Topic as t WHERE t.lecturer.id = :lecturerId AND t.createdByStudent = true")
    fun findAllStudentProposedByLecturer(lecturerId: Long): List<Topic>

    fun findAllByLecturerIdAndStatus(lecturerId: Long, status: TopicStatus): List<Topic>

    @Query("FROM Topic as t WHERE t.lecturer.id = :lecturerId AND t.id = :subjectId")
    fun getByLecturerIdAndSubjectId(lecturerId: Long, subjectId: Long): Topic

    @Query("""
        SELECT new pwr.diplomaproject.model.dto.LecturerSubjectReservationDto(t.id, t.topic, t.studentCount, sum(case r.status when 'REGISTERED' then 1 else 0 end))
        FROM Topic t
        LEFT JOIN Reservation r ON r.topic = t
        WHERE t.status = 'ACCEPTED_BY_COMMISSION' AND t.lecturer.id = :lecturerId
        GROUP BY t
    """)
    fun getLecturerReservationDetails(lecturerId: Long): List<LecturerSubjectReservationDto>
}