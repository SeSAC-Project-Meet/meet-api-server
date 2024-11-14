create table area
(
    area_id    int auto_increment
        primary key,
    name       varchar(100)                              not null,
    address    varchar(300)                              not null,
    created_at timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6)
);

create table badge
(
    badge_id    int auto_increment
        primary key,
    name        varchar(30)                               not null,
    description varchar(100)                              not null,
    created_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6)
);

create table chatroom
(
    chatroom_id int auto_increment
        primary key,
    name        varchar(100)                              not null,
    status      varchar(100)                              not null,
    created_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6)
);

create table mbti
(
    mbti_id     int auto_increment
        primary key,
    type        varchar(15)                               not null,
    description varchar(100)                              not null,
    created_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6)
);

create table meetroom
(
    meetroom_id int auto_increment
        primary key,
    expires_at  timestamp(6)                              not null,
    created_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6)
);

create table spec
(
    spec_id       int auto_increment
        primary key,
    name          varchar(100)                              not null,
    type          varchar(30)                               not null,
    verify_domain varchar(100)                              not null,
    created_at    timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at    timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6)
);

create table tag
(
    tag_id     int auto_increment
        primary key,
    name       varchar(30)                               not null,
    type       varchar(100)                              null,
    created_at timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6)
);

create table term
(
    term_id     int auto_increment
        primary key,
    title       varchar(1024)                             not null,
    content     varchar(4096)                             not null,
    is_required tinyint(1)                                not null,
    created_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6)
);

create table user
(
    user_id      int auto_increment
        primary key,
    username     varchar(50)                               not null,
    password     varchar(100)                              not null,
    email        varchar(100)                              not null,
    phone_number varchar(40)                               not null,
    created_at   timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at   timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    constraint email
        unique (email),
    constraint username
        unique (username)
);

create table inquiry
(
    inquiry_id  int auto_increment
        primary key,
    user_id     int                                       null,
    title       varchar(100)                              not null,
    content     varchar(4096)                             not null,
    photo_url_1 varchar(1024)                             null,
    created_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    constraint fk_inquiry_user
        foreign key (user_id) references user (user_id)
);

create table message
(
    message_id  int auto_increment
        primary key,
    user_id     int                                       not null,
    chatroom_id int                                       not null,
    type        varchar(30)                               not null,
    text        varchar(4096)                             null,
    image_url   varchar(1024)                             null,
    created_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    constraint fk_message_chatroom
        foreign key (chatroom_id) references chatroom (chatroom_id),
    constraint fk_message_user
        foreign key (user_id) references user (user_id)
);

create table message_user
(
    message_user_id int auto_increment
        primary key,
    message_id      int                                       not null,
    checked_user_id int                                       not null,
    checked_at      timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    constraint fk_message_user_checked_user
        foreign key (checked_user_id) references user (user_id),
    constraint fk_message_user_message
        foreign key (message_id) references message (message_id)
);

create table user_badge
(
    user_badge_id int auto_increment
        primary key,
    user_id       int                                       not null,
    badge_id      int                                       not null,
    created_at    timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at    timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    constraint fk_user_badge_badge
        foreign key (badge_id) references badge (badge_id),
    constraint fk_user_badge_user
        foreign key (user_id) references user (user_id)
);

create table user_blocked
(
    user_blocked_id int auto_increment
        primary key,
    user_id         int                                       null,
    opponent_id     int                                       not null,
    type            varchar(30)                               not null,
    blocked_at      timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    unblocked_at    timestamp(6)                              null,
    created_at      timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at      timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    constraint fk_user_blocked_opponent
        foreign key (opponent_id) references user (user_id),
    constraint fk_user_blocked_user
        foreign key (user_id) references user (user_id)
);

create table user_chatroom
(
    user_chatroom_id int auto_increment
        primary key,
    user_id          int                                       null,
    chatroom_id      int                                       not null,
    user_status      varchar(30)                               not null,
    created_at       timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at       timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    constraint fk_user_chatroom_chatroom
        foreign key (chatroom_id) references chatroom (chatroom_id),
    constraint fk_user_chatroom_user
        foreign key (user_id) references user (user_id)
);

create table user_meetroom
(
    user_meetroom_id int auto_increment
        primary key,
    user_id          int                                       not null,
    meetroom_id      int                                       not null,
    created_at       timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at       timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    constraint user_meetroom_meetroom_meetroom_id_fk
        foreign key (meetroom_id) references meetroom (meetroom_id),
    constraint user_meetroom_user_user_id_fk
        foreign key (user_id) references user (user_id)
);

create table user_profile
(
    user_profile_id int auto_increment
        primary key,
    user_id         int          not null,
    nickname        varchar(30)  not null,
    introduction    varchar(100) not null,
    mbti_id         int          not null,
    constraint user_profile_mbti_mbti_id_fk
        foreign key (mbti_id) references mbti (mbti_id),
    constraint user_profile_user_user_id_fk
        foreign key (user_id) references user (user_id)
);

create table user_refresh_token
(
    user_refresh_token_id int auto_increment
        primary key,
    user_id               int                                       not null,
    token                 varchar(300)                              not null,
    user_valid            tinyint(1)   default 1                    not null,
    created_at            timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at            timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    constraint user_refresh_token_user_user_id_fk
        foreign key (user_id) references user (user_id)
);

create table user_socket
(
    user_socket_id int auto_increment
        primary key,
    socket_id      varchar(50) not null,
    user_id        int         not null,
    status         tinyint(1)  not null,
    constraint user_socket_user_user_id_fk
        foreign key (user_id) references user (user_id)
);

create table user_spec
(
    user_spec_id int auto_increment
        primary key,
    user_id      int                                       not null,
    spec_id      int                                       not null,
    created_at   timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at   timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    constraint fk_user_spec_spec
        foreign key (spec_id) references spec (spec_id),
    constraint fk_user_spec_user
        foreign key (user_id) references user (user_id)
);

create table user_tag
(
    user_tag_id int auto_increment
        primary key,
    user_id     int                                       not null,
    tag_id      int                                       not null,
    created_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    constraint fk_user_tag_tag
        foreign key (tag_id) references tag (tag_id),
    constraint fk_user_tag_user
        foreign key (user_id) references user (user_id)
);

create table user_term
(
    user_term_id int auto_increment
        primary key,
    user_id      int                                       not null,
    term_id      int                                       not null,
    agreement    tinyint(1)                                not null,
    created_at   timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at   timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    constraint user_term_term_term_id_fk
        foreign key (term_id) references term (term_id),
    constraint user_term_user_user_id_fk
        foreign key (user_id) references user (user_id)
);

create table user_token
(
    user_token_id int auto_increment
        primary key,
    user_id       int                                       not null,
    token         varchar(64)                               not null,
    type          varchar(30)                               not null,
    created_at    timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    expires_at    timestamp(6)                              not null,
    constraint fk_user_token_user
        foreign key (user_id) references user (user_id)
);

create table user_usage_time
(
    user_usage_time_id int auto_increment
        primary key,
    user_id            int                                       not null,
    type               varchar(30)                               not null,
    time               timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    created_at         timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at         timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    constraint fk_user_usage_time_user
        foreign key (user_id) references user (user_id)
);

