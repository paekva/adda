CREATE TABLE order_confirmation
(
    order_id     INT   NOT NULL PRIMARY KEY,
    status       INT   NOT NULL,
    confirmation bytea NOT NULL
);