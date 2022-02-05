package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import pwr.diplomaproject.model.dto.StudentRequestDto
import pwr.diplomaproject.model.dto.TopicCorrectionRequestDetailsDto
import pwr.diplomaproject.model.entity.TopicCorrectionRequest
import pwr.diplomaproject.model.enum.RequestResult

interface TopicCorrectionRequestRepository : JpaRepository<TopicCorrectionRequest, Long> {

    @Query(value = "select max(r.id) + 1 from TopicCorrectionRequest r")
    fun getNextId(): Long

    @Query("""
        SELECT new pwr.diplomaproject.model.dto.TopicCorrectionRequestDetailsDto(tcr.id, t.topic, t.description, tcr.newTopic, tcr.newDescription, tcr.result)
        FROM TopicCorrectionRequest tcr
        JOIN Student s ON tcr.student = s
        JOIN GroupMember g ON g.student = s
        JOIN Reservation r ON g.reservation = r
        JOIN Topic t ON r.topic = t
        WHERE r.status = 'CONFIRMED' AND tcr.id = :requestId
    """)
    fun getCorrectionRequestDetails(requestId: Long): TopicCorrectionRequestDetailsDto

    fun findAllByResultIn(results: List<RequestResult>): List<TopicCorrectionRequest>

    @Query("""
        SELECT new pwr.diplomaproject.model.dto.StudentRequestDto(tcr.id, tcr.newTopic, concat(t.lecturer.title, ' ', t.lecturer.user.firstName, ' ', t.lecturer.user.lastName), tcr.result)
        FROM TopicCorrectionRequest tcr
        JOIN Student s ON tcr.student = s
        JOIN GroupMember g ON g.student = s
        JOIN Reservation r ON g.reservation = r
        JOIN Topic t ON r.topic = t
        WHERE r.status = 'CONFIRMED' AND s.id = :studentId
    """)
    fun findAllByStudentId(studentId: Long): List<StudentRequestDto>

    @Query("FROM TopicCorrectionRequest req WHERE req.student.user.id = :userId AND req.id = :requestId")
    fun getByStudentUserIdAndRequestId(userId: Long, requestId: Long): TopicCorrectionRequest
}