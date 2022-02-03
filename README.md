# DIplomaProject


## Security

* Login ma postać `<role>_<id>` gdzie
    * `<role>` to małe litery oznaczające role logowanego użytkownika wg mapowania z `MockUserDetailsService`:
    ```
    val charToRole = mapOf(
            'a' to GrantedAuthority { "ADMIN" },
            's' to GrantedAuthority { "STUDENT" },
            'l' to GrantedAuthority { "LECTURER" },
            'd' to GrantedAuthority { "DEAN" },
            'c' to GrantedAuthority { "COORDINATOR" },
            'p' to GrantedAuthority { "PROGRAM_COMMITTEE_MEMBER" },
            'm' to GrantedAuthority { "DIPLOMA_SECTION_MEMBER" }
        )
    ```
    * `<id>` to id użytkownika odpowiadające id z encji `User` (tabeli `AppUser`)
    * Przykładowi użytkownicy:
        * `s_24242` ma rolę `STUDENT` i id 24242
        * `dl_54312` ma rolę `DEAN` oraz `LECTURER` oraz id 54312

* Hasło zawsze ma wartość `password`

### Frontend

Przy logowaniu:

* na `localhost:8081/oauth/token` wysyłany jest POST z nagłówkiem `Authorization: "Basic cHVibGljOg=="` i body:
    
    ```
    {
        grant_type: "password"
        username: $USERNAME$
        password: $PASSWORD$
    }
    ```
    Gdzie zamiast `$USERNAME$` i `$PASSWORD$` wstawiany jest login i hasło.

* w odpowiedzi jest zwracany json, z którego należy wyciągnąć atrybut `access_token` i gdzieś go trzymać

* `access_token` składa się z trzech segmentów oddzielonych kropkami. Drugi z nich to payload i po odkodowaniu z base64 wygląda w ten sposób:

    ```
    {
        "user_id": "543312",
        "user_name": "sp_543312",
        "scope": [
            "*"
        ],
        "exp": 1643890225,
        "authorities": [
            "STUDENT",
            "PROGRAM_COMMITTEE_MEMBER"
        ],
        "jti": "a95RehAuXuy4AQzdBs-gHaW7E4A",
        "client_id": "public"
    }
    ```
    Z listy `authorities` można wyciągnąć role użytkownika.


Przy wysyłaniu żądań:

* dołączamy header `Authorization: Bearer $ACCESS_TOKEN$` gdzie w pole `$ACCESS_TOKEN$` wstawiamy zapisany wcześniej `access_token`

### Backend

Przykładowe użycie security jest w `TestController`. 
* w obiekcie `Principal` znajduje się id użytkownika w polu `name`
* konfiguracja dostępów znajduje się w `JwtSecurityConfig`