package pwr.jsos

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class JsosApplication

fun main(args: Array<String>) {
	runApplication<JsosApplication>(*args)
}
