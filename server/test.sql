create table users(
	user_id serial primary key,
	username varchar ( 100 ) unique not null,
	password varchar ( 100 ) not null
);

create table athletes(
    athlete_id serial primary key,
    name varchar ( 100 ) not null,
	image_url varchar ( 250 ) not null,
	category varchar ( 100 ) not null
);

create table votes(
	vote_id serial primary key,
	user_id integer not null references users,
	athlete_id integer not null references athletes,
	vote boolean not null default true
);


insert into athletes (name) values ('zak');
update athletes set vote = vote - 1 where athlete_id = 2;
select athletes.athlete_id, athletes.name, athletes.image_url, count(*) filter (where votes.vote = true) as likes, count(*) filter (where votes.vote = false) as dislikes from athletes inner join votes on votes.athlete_id = athletes.athlete_id group by athletes.athlete_id;