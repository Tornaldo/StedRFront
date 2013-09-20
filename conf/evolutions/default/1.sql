# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table wall (
  id                        bigint not null,
  name                      varchar(255),
  constraint pk_wall primary key (id))
;

create sequence wall_seq;




# --- !Downs

drop table if exists wall cascade;

drop sequence if exists wall_seq;

