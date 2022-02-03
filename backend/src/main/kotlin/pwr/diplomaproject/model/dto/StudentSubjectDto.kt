package pwr.diplomaproject.model.dto

import pwr.diplomaproject.model.enum.TopicStatus

data class StudentSubjectDto(
    val id: Long,
    val topic: String,
    val supervisorName: String,
    val numberOfStudents: Int,
    val status: TopicStatus
)