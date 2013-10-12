# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table picture (
  pictureid                 bigint not null,
  wall_model_wall_id        bigint not null,
  url                       varchar(255),
  constraint pk_picture primary key (pictureid))
;

create table wall (
  wall_id                   bigint not null,
  latitude                  float,
  longitude                 float,
  name                      varchar(255),
  constraint pk_wall primary key (wall_id))
;

create sequence picture_seq;

create sequence wall_seq;

alter table picture add constraint fk_picture_wall_1 foreign key (wall_model_wall_id) references wall (wall_id);
create index ix_picture_wall_1 on picture (wall_model_wall_id);



# --- !Downs

drop table if exists picture cascade;

drop table if exists wall cascade;

drop sequence if exists picture_seq;

drop sequence if exists wall_seq;

