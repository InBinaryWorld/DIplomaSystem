package pwr.diplomaproject.controller

import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class TestController {

    @GetMapping("/public")
    fun public(): ResponseEntity<Unit> = ok(Unit)

    @GetMapping("/private")
    fun private(): ResponseEntity<Unit> = ok(Unit)
}