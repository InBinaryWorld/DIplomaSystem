package pwr.diplomaproject.model.mail

import pwr.diplomaproject.model.entity.Reservation
import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.entity.User

class ReservationCreatedByStudent(recipients: List<User>, subject: Topic, reservation: Reservation, studentUser: User) :
    Mail(
        recipients,
        "Student ${studentUser.fullName()} złożył rezerwację na temat \"${subject.topic}\". Liczba zgłoszonych osób: ${reservation.groupMembers.size}."
    )
