package pwr.diplomaproject.model.mail

import pwr.diplomaproject.model.entity.GroupMember
import pwr.diplomaproject.model.entity.User

class GroupMemberUpdatedByStudent(recipients: List<User>, groupMember: GroupMember) :
    Mail(
        recipients,
        "Student ${groupMember.student.user.fullName()} zaktualizował swój status członka rezerwacji tematu \"${groupMember.reservation.topic.topic}\". Aktualny status członka grupy: ${groupMember.status}. Aktualny status rezerwacji: ${groupMember.reservation.status}."
    )
