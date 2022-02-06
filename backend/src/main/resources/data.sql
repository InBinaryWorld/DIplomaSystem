-- Table: app_user
insert into app_user (id, email, first_name, last_name)
values (1, 'jacek.werek@pwr.edu.pl', 'Jacek', 'Werek');
insert into app_user (id, email, first_name, last_name)
values (2, 'krzysztof.szarfa@pwr.edu.pl', 'Krzysztof', 'Szarfa');
insert into app_user (id, email, first_name, last_name)
values (3, 'lukasz.tomcio@pwr.edu.pl', 'Łukasz', 'Tomcio');
insert into app_user (id, email, first_name, last_name)
values (4, 'kamil.kolanko@pwr.edu.pl', 'Kamil', 'Kolanko');


-- Table: faculty
insert into faculty (id, name, number)
values (1, 'Wydział Informatyki i Telekomunikacji', 'w4n');


-- Table: course_of_study
insert into course_of_study (id, name, study_type, faculty_id)
values (1, 'Informatyka stosowana', 'ENGINEERS', 1);


-- Table: employee
insert into employee (id, title, type, faculty_id, user_id)
values (1, 'mgr inż.', 'LECTURER', 1, 1),
       (2, 'prof.', 'DEAN', 1, 1);


-- Table: student

insert into student (id, index, course_of_study_id, user_id)
values
    -- krzysztof
    (1, '123456', 1, 2),
    -- lukasz
    (2, '789876', 1, 3),
    -- kamil
    (3, '543821', 1, 4);


-- Table: graduation
insert into graduation (id, graduation_year, course_of_study_id)
values (1, 2021, 1);

-- Table: schedule
insert into schedule (id, topic_change_deadline, topic_commission_approval_deadline,
                      topic_coordinator_approval_deadline, topic_correction_deadline, topic_registration_deadline,
                      topic_selection_deadline, graduation_id)
values (1, '2023-01-01', '2023-01-01', '2023-01-01', '2023-01-01', '2023-01-01', '2023-01-01', 1);


-- Table: topic
insert into topic (id, coordinator_comments, created_by_student, creation_date, description, status, student_count,
                   topic, graduation_id, student_id, lecturer_id)
values (1, 'Lorem ipsum', false, '2022-02-09', 'Lorem ipsum', 'WAITING', 1,
        'Predykcja zachowań ludzi podczas lockdownu', 1, null, 1),
       (2, 'Lorem ipsum', false, '2022-02-04', 'Lorem ipsum', 'WAITING', 2,
        'Aplikacja z przepisami kucharskimi', 1, null, 1),
       (3, 'Lorem ipsum', false, '2022-02-04', 'Lorem ipsum', 'NEEDS_CORRECTION', 2,
        'Aplikacja z przepisami kucharskimi', 1, null, 1),
       (4, 'Lorem ipsum', true, '2022-02-04', 'Lorem ipsum', 'PROPOSED_BY_STUDENT', 2,
        'Aplikacja z przepisami kucharskimi', 1, 2, 1),
       (5, 'Lorem ipsum', true, '2022-02-04', 'Lorem ipsum', 'ACCEPTED_BY_COMMISSION', 2,
        'Aplikacja z przepisami kucharskimi', 1, 2, 1),
       (6, 'Lorem ipsum', true, '2022-02-04', 'Lorem ipsum', 'ACCEPTED_BY_COMMISSION', 2,
        'Aplikacja z przepisami kucharskimi', 1, 2, 1),
       (7, 'Lorem ipsum', true, '2022-02-04', 'Lorem ipsum', 'ACCEPTED_BY_COMMISSION', 1,
        'Wniosek o doprecyzowanie', 1, 2, 1),
       (8, 'Lorem ipsum', true, '2022-02-04', 'Lorem ipsum', 'ACCEPTED_BY_COMMISSION', 1,
        'Wniosek o zmianę tematu - stary temat', 1, 2, 1),
       (9, 'Lorem ipsum', true, '2022-02-04', 'Lorem ipsum', 'ACCEPTED_BY_COMMISSION', 1,
        'Wniosek o zmianę tematu - nowy temat', 1, 2, 1);


-- Table: reservation
insert into reservation (id, creation_date, status, topic_id)
values (1, '2022-02-10', 'WAITING', 1),
       (2, '2022-02-10', 'REGISTERED', 6),
       (3, '2022-02-10', 'REGISTERED', 6),
       (4, '2022-02-10', 'REJECTED_BY_LECTURER', 5),
       (5, '2022-02-10', 'CONFIRMED', 7),
       (6, '2022-02-10', 'CONFIRMED', 8);


-- Table: group_member
insert into group_member (id, status, reservation_id, student_id)
values (1, 'SUGGESTED', 1, 1),
       (2, 'WILLING', 2, 1),
       (3, 'WILLING', 2, 2),
       (4, 'WILLING', 3, 3),
       (5, 'WILLING', 4, 1),
       (6, 'WILLING', 4, 2),
       (7, 'WILLING', 4, 3),
       (8, 'CONFIRMED', 5, 3),
       (9, 'CONFIRMED', 6, 2);

-- Table: topic_correction_request
insert into topic_correction_request (id, new_description, new_topic, request_date, result, employee_id, student_id)
values (1, 'nowy opis', 'nowy temat', '2022-02-04', 'WAITING', null, 3);

-- Table: topic_change_request
insert into topic_change_request (id, request_date, result, employee_id, new_topic_id, old_topic_id, student_id)

values (1, '2022-02-05', 'WAITING', null, 9, 8, 2);