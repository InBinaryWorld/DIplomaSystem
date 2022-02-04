package pwr.diplomaproject.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import pwr.diplomaproject.model.entity.Reservation

@Repository
interface ReservationRepository : JpaRepository<Reservation, Long> {
    @Query("select g.reservation from GroupMember g where g.student.id = :studentId")
    fun findAllByStudentId(studentId: Long): List<Reservation>

    @Query(value = "select max(r.id) + 1 from Reservation r")
    fun getNextId(): Long

    @Query("from Reservation r where r.id = :reservationId and r.topic.lecturer.id = :lecturerId")
    fun getByIdAndLecturerId(reservationId: Long, lecturerId: Long): Reservation

    @Query("from Reservation r where r.topic.id = :subjectId and r.topic.lecturer.id = :lecturerId")
    fun findAllBySubjectIdAndLecturerId(subjectId: Long, lecturerId: Long): List<Reservation>
}
