package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.NotificationDto
import pwr.diplomaproject.service.AdminNotificationService

@RestController
@RequestMapping("/admin/notification")
class AdminNotificationController @Autowired constructor(
    private val adminNotificationService: AdminNotificationService
) {

    @Operation(summary = "Zwraca listę powiadomień")
    @GetMapping()
    fun getNotifications(): List<NotificationDto> =
        adminNotificationService.getNotifications()
}