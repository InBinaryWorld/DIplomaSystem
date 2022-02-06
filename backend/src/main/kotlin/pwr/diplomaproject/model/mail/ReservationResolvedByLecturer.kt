package pwr.diplomaproject.model.mail

import pwr.diplomaproject.model.entity.Reservation
import pwr.diplomaproject.model.entity.User

class ReservationResolvedByLecturer(
    recipients: List<User>,
    reservation: Reservation,
) :
    Mail(
        recipients,
        "Prowadzący ${reservation.topic.lecturer.fullName()} rozpatrzył rezerwację na temat \"${reservation.topic.topic}\". Aktualny status rezerwacji: ${reservation.status}."
    )
