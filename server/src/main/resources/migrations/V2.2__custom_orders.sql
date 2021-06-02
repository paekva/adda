CREATE TABLE CUSTOM_ORDER_ITEM
(
    id              SERIAL      NOT NULL PRIMARY KEY,
    client          INT      NOT NULL,
    description     TEXT        NOT NULL,
    date_of_order   TIMESTAMPTZ NOT NULL,
    date_of_receive TIMESTAMPTZ NOT NULL,
    status          INT         NOT NULL
);

INSERT INTO CUSTOM_ORDER_ITEM (client, description, date_of_order, date_of_receive, status)
VALUES (1, 'Хочу слона', TIMESTAMP '2011-05-16 15:36:38', TIMESTAMP '2011-06-16 15:36:38', 0);

INSERT INTO CUSTOM_ORDER_ITEM (client, description, date_of_order, date_of_receive, status)
VALUES (1, '', TIMESTAMP '2021-05-16 15:36:38', TIMESTAMP '2021-06-16 15:36:38', 0);

INSERT INTO CUSTOM_ORDER_ITEM (client, description, date_of_order, date_of_receive, status)
VALUES (1, '', TIMESTAMP '2001-05-16 15:36:38', TIMESTAMP '2001-06-16 15:36:38', 0);