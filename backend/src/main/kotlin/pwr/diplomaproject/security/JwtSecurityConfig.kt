package pwr.diplomaproject.security

import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.web.servlet.invoke

@Configuration
class JwtSecurityConfig : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity?) {
        http!! {
            authorizeRequests {
                authorize("/public", permitAll)
                authorize("/private", hasAnyRole("ADMIN"))
                authorize("/student/reservation", hasAnyRole("STUDENT"))
                authorize("*", permitAll)
            }
        }
        http!!.oauth2ResourceServer { oauth2 -> oauth2.jwt() }
    }
}