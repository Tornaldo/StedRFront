# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table wall (
  id                        bigint not null,
  name                      varchar(255),
  constraint pk_wall primary key (id))
;

create table wall_model (
  id                        bigint not null,
  name                      varchar(255),
  constraint pk_wall_model primary key (id))
;

create sequence wall_seq;

create sequence wall_model_seq;




# --- !Downs

drop table if exists wall cascade;

drop table if exists wall_model cascade;

drop sequence if exists wall_seq;

drop sequence if exists wall_model_seq;

