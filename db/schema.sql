DROP TABLE IF EXISTS users;
CREATE TABLE users ( id INTEGER PRIMARY KEY AUTOINCREMENT, name text, password text, email text, borough text);

CREATE TRIGGER timestamp_update BEFORE UPDATE ON users BEGIN UPDATE user SET update_at = CURRENT_TIMESTAMP WHERE id = new.id;
END;

DROP TABLE IF EXISTS events;
CREATE TABLE events (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, dateParts text, timeParts text, longDesc text, shortDesc text, website text, contactName text, phone text, location text, addressType text, address text, city text, state text, zip text, borough text, userId integer);

CREATE TRIGGER timestamp_update BEFORE UPDATE ON events BEGIN UPDATE event SET update_at = CURRENT_TIMESTAMP WHERE id = new.id;
END;

DROP TABLE IF EXISTS eventsVote;
CREATE TABLE eventsVote (id INTEGER PRIMARY KEY AUTOINCREMENT, userId integer, eventId integer, vote boolean);




-- DROP TABLE IF EXISTS dates;
-- CREATE TABLE dates (
-- id INTEGER PRIMARY KEY,
-- name text,
-- hometown text,
-- pass text,
-- phone text,
-- img text);


