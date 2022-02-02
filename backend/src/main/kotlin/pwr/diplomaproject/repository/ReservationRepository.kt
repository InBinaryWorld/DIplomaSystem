package pwr.diplomaproject.repository

import org.springframework.stereotype.Repository
import org.springframework.data.jpa.repository.JpaRepository
import pwr.diplomaproject.model.entity.Reservation

@Repository
interface ReservationRepository: JpaRepository<Reservation, Long> {

}