package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import pwr.diplomaproject.model.entity.Reservation

@Repository
interface ReservationRepository: JpaRepository<Reservation, Long> {

    @Query("select g.reservation from GroupMember g where g.student.id = :studentId")
    fun findByStudentId(studentId: Long): List<Reservation>
}
