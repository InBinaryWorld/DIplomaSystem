-- Table: app_user
insert into app_user (id, first_name, last_name, password)
values (1, 'Jacek', 'Werek', 'password');
insert into app_user (id, first_name, last_name, password)
values (2, 'Krzysztof', 'Szarfa', 'password');
insert into app_user (id, first_name, last_name, password)
values (3, 'Łukasz', 'Tomcio', 'password');


-- Table: faculty
insert into faculty (id, name, number)
values (1, 'Wydział Informatyki i Telekomunikacji', 'w4n');


-- Table: course_of_study
insert into course_of_study (id, name, study_type, faculty_id)
values (1, 'Informatyka stosowana', 'ENGINEERS', 1);


-- Table: student
-- jacek
insert into student (id, index, course_of_study_id, user_id)
values (1, '123456', 1, 1);


-- Table: employee
-- krzysztof
insert into employee (id, title, type, faculty_id, user_id)
values (1, 'mgr inż.', 'LECTURER', 1, 2);


-- Table: graduation
insert into graduation (id, graduation_year, course_of_study_id)
values (1, 2021, 1);


-- Table: topic
insert into topic (id, coordinator_comments, created_by_student, creation_date, description, status, student_count,
                   topic, graduation_id, student_id, lecturer_id)
values (1, 'Lorem ipsum', false, '2022-02-09', 'Lorem ipsum', 'WAITING', 1,
        'Predykcja zachowań ludzi podczas lockdownu', 1, null, 1);


-- Table: reservation
insert into reservation (id, creation_date, status, topic_id)
values (1, '2022-02-10', 'WAITING', 1);


-- Table: group_member
insert into group_member (id, status, reservation_id, student_id)
values (1, 'SUGGESTED', 1, 1);