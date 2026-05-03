-- create database maia;

create table if not exists customers
(
    id              serial primary key,
    snils           text not null,
    full_name       text not null,
    sex             text not null,
    birth           text,
    profession      text,
    salary          int check (salary > 0),
    kids            int default 0
);

create table if not exists app_history
(
    uuid        text primary key,
    customer_id int references customers(id),
    service     text,
    using_time  int
);

create table if not exists credit_history
(
    uuid         text primary key,
    customer_id  int references customers(id),
    type         text,
    summ         int check (summ > 0),
    is_correct   bool,
    created_date date default now()
);

create table if not exists insurance_history
(
    uuid         text primary key,
    customer_id  int references customers(id),
    type         text,
    summ         int check (summ > 0),
    created_date date default now()
);
