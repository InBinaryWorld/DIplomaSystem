package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.DeanRequestDto
import pwr.diplomaproject.model.entity.TopicCorrectionRequest

class DeanRequestDtoFactory {

    companion object {

        fun create(request: TopicCorrectionRequest): DeanRequestDto = DeanRequestDto(
            request.id,
            StudentNameDtoFactory.create(request.student),
            request.requestDate,
            request.result
        )
    }
}