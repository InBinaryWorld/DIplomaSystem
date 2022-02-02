package pwr.diplomaproject.controller

import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import java.security.Principal

@Controller
class TestController {

    @GetMapping("/public")
    fun public(): ResponseEntity<String> = ok("dane publiczne")

    @GetMapping("/private")
    fun private(principal: Principal?): ResponseEntity<String> {
        return ok("dane prywatne, user_id=${principal?.name}")
    }
}