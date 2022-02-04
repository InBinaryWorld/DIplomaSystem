-- Table: app_user
insert into app_user (id, first_name, last_name)
values (1, 'Jacek', 'Werek');
insert into app_user (id, first_name, last_name)
values (2, 'Krzysztof', 'Szarfa');
insert into app_user (id, first_name, last_name)
values (3, 'Łukasz', 'Tomcio');
insert into app_user (id, first_name, last_name)
values (4, 'Kamil', 'Kolanko');


-- Table: faculty
insert into faculty (id, name, number)
values (1, 'Wydział Informatyki i Telekomunikacji', 'w4n');


-- Table: course_of_study
insert into course_of_study (id, name, study_type, faculty_id)
values (1, 'Informatyka stosowana', 'ENGINEERS', 1);


-- Table: employee
-- jacek
insert into employee (id, title, type, faculty_id, user_id)
values (1, 'mgr inż.', 'LECTURER', 1, 1);


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
insert into schedule (id, topic_change_deadline, topic_commission_approval_deadline, topic_coordinator_approval_deadline, topic_correction_deadline, topic_registration_deadline, topic_selection_deadline, graduation_id)
values (1, '2023-01-01', '2023-01-01', '2023-01-01', '2023-01-01', '2023-01-01', '2023-01-01', 1);


-- Table: topic
insert into topic (coordinator_comments, created_by_student, creation_date, description, status, student_count,
                   topic, graduation_id, student_id, lecturer_id)
values ('Lorem ipsum', false, '2022-02-09', 'Lorem ipsum', 'WAITING', 1,
        'Predykcja zachowań ludzi podczas lockdownu', 1, null, 1),
       ('Lorem ipsum', false, '2022-02-04', 'Lorem ipsum', 'WAITING', 2,
        'Aplikacja z przepisami kucharskimi', 1, null, 1),
       ('Lorem ipsum', false, '2022-02-04', 'Lorem ipsum', 'NEEDS_CORRECTION', 2,
        'Aplikacja z przepisami kucharskimi', 1, null, 1),
       ('Lorem ipsum', true, '2022-02-04', 'Lorem ipsum', 'PROPOSED_BY_STUDENT', 2,
        'Aplikacja z przepisami kucharskimi', 1, 2, 1);


-- Table: reservation
insert into reservation (id, creation_date, status, topic_id)
values (1, '2022-02-10', 'WAITING', 1);


-- Table: group_member
insert into group_member (id, status, reservation_id, student_id)
values (1, 'SUGGESTED', 1, 1);