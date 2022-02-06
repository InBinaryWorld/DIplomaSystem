package pwr.diplomaproject.model.notification

import pwr.diplomaproject.model.entity.Reservation
import pwr.diplomaproject.model.entity.User

class ReservationResolvedByLecturer(recipients: List<User>, reservation: Reservation) :
    NotificationAlert(
        recipients,
        "Prowadzący ${reservation.topic.lecturer.fullName()} rozpatrzył rezerwację na temat \"${reservation.topic.topic}\". Aktualny status rezerwacji: ${reservation.status}."
    )
