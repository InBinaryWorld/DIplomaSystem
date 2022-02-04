package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.enum.TopicStatus

interface SubjectRepository : JpaRepository<Topic, Long> {

    fun findAllByStatusIsIn(statuses: List<TopicStatus>): List<Topic>
}