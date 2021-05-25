CREATE USER server_user WITH PASSWORD 'ERVb95UQhjV7pBnKUxHCe9nrqRrq7tGQ';
CREATE DATABASE adda_database;
GRANT ALL PRIVILEGES ON DATABASE adda_database TO server_user;
ALTER USER server_user VALID UNTIL 'infinity';
