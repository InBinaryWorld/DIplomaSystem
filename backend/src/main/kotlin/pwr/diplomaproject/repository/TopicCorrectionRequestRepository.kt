package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import pwr.diplomaproject.model.dto.DeanCorrectionRequestDetailsDto
import pwr.diplomaproject.model.entity.TopicCorrectionRequest
import pwr.diplomaproject.model.enum.RequestResult

interface TopicCorrectionRequestRepository : JpaRepository<TopicCorrectionRequest, Long> {

    @Query(
        """
        SELECT new pwr.diplomaproject.model.dto.DeanCorrectionRequestDetailsDto(tcr.id, t.topic, t.description, tcr.newTopic, tcr.newDescription)
        FROM TopicCorrectionRequest tcr
        JOIN Student s ON tcr.student = s
        JOIN GroupMember g ON g.student = s
        JOIN Reservation r ON g.reservation = r
        JOIN Topic t ON r.topic = t
        WHERE r.status = 'CONFIRMED' AND tcr.id = :requestId
    """
    )
    fun getCorrectionRequestDetails(requestId: Long): DeanCorrectionRequestDetailsDto

    fun findAllByResultIn(results: List<RequestResult>): List<TopicCorrectionRequest>
}