package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import pwr.diplomaproject.model.entity.Topic

@Repository
interface TopicRepository : JpaRepository<Topic, Long>
