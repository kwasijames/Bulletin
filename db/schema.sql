DROP TABLE IF EXISTS users;
CREATE TABLE users ( id INTEGER PRIMARY KEY AUTOINCREMENT, username text, password text, email text, user_borough text);

-- CREATE TRIGGER timestamp_update BEFORE UPDATE ON users BEGIN UPDATE user SET update_at = CURRENT_TIMESTAMP WHERE id = new.id;
-- END;

-- Table used for NYC Events Calendar API
-- DROP TABLE IF EXISTS events;
-- CREATE TABLE events (id INTEGER PRIMARY KEY AUTOINCREMENT, event_name text, dateParts text, timeParts text, longDesc text, shortDesc text, website text, contactName text, phone text, location text, addressType text, address text, city text, state text, zip text, borough text, user_id integer);

-- Table used for NYC Permitted Event Information SODA API
DROP TABLE IF EXISTS events;
CREATE TABLE events(id INTEGER PRIMARY KEY AUTOINCREMENT, event_name text, start_date_time, end_date_time, event_type, event_location, event_borough, street_closure_type);


DROP TABLE IF EXISTS eventsVote;
CREATE TABLE eventsVote (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id integer, event_id integer, vote boolean);

CREATE TRIGGER timestamp_update BEFORE UPDATE ON events BEGIN UPDATE event SET update_at = CURRENT_TIMESTAMP WHERE id = new.id;
END;



-- DROP TABLE IF EXISTS dates;
-- CREATE TABLE dates (
-- id INTEGER PRIMARY KEY,
-- name text,
-- hometown text,
-- pass text,
-- phone text,
-- img text);


