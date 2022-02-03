package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.TopicStatus

data class SubjectDto (
    val id: Long,
    val topic: String,
    val lecturerName: String,
    val creationDate: String,
    val numberOfStudents: Int,
    val status: TopicStatus
)