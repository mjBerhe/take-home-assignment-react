CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);
CREATE UNIQUE INDEX email_unique_idx ON public.users USING btree (lower(email));
 
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    access_token TEXT NOT NULL UNIQUE,
    refresh_token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL NOT NULL,
    currency TEXT NOT NULL DEFAULT 'CAD'
);


-- Dummy Data
INSERT INTO users (name, email, password) VALUES
    ('Bob', 'bob@example.com', 'password'),
    ('Protected', 'hidden@example.com', '123456');

INSERT INTO products (title, description, price) VALUES
    ('Aged Dawn', 'Aged dawn, the finer things in life', 22.13),
    ('Muddy Rain', 'Do not go outside without an umbrella', 12.98),
    ('Purple Moon', 'This mysterious moon will get people asking questions at your next party', 13.12),
    ('Small Sunset', 'A small world requires a small sunset', 33.91);