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

create table comments(
	comment_id serial primary key,
	user_id integer not null references users,
	athlete_id integer not null references athletes,
	username varchar ( 100 ) not null,
	body varchar (250) not null,
	created_on varchar(250) not null
);