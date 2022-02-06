package pwr.diplomaproject.model.mail

import pwr.diplomaproject.model.entity.User

abstract class Mail(private val recipients: List<User>, private val content: String) {
    fun send() {
        println("************************************")
        println("Notification to: ${recipients.map { it.fullName() + " (${it.email})" }}")
        println(content)
        println("************************************")
    }
}