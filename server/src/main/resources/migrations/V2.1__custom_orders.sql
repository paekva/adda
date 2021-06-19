CREATE TABLE CUSTOM_ORDER_ITEM
(
    id              SERIAL      NOT NULL PRIMARY KEY,
    client          INT      NOT NULL,
    description     TEXT        NOT NULL,
    date_of_order   TIMESTAMPTZ NOT NULL,
    date_of_receive TIMESTAMPTZ NOT NULL,
    status          INT         NOT NULL,
    price           TEXT        NOT NULL
);

INSERT INTO CUSTOM_ORDER_ITEM (client, description, date_of_order, date_of_receive, status, price)
VALUES (1, 'Хочу слона', TIMESTAMP '2011-05-16 15:36:38', TIMESTAMP '2011-06-16 15:36:38', 7, 'Не оценена');

INSERT INTO CUSTOM_ORDER_ITEM (client, description, date_of_order, date_of_receive, status, price)
VALUES (1, 'Хочу лупу', TIMESTAMP '2021-05-16 15:36:38', TIMESTAMP '2021-06-16 15:36:38', 4, 'Не оценена');

INSERT INTO CUSTOM_ORDER_ITEM (client, description, date_of_order, date_of_receive, status, price)
VALUES (1, 'Я банан', TIMESTAMP '2001-05-16 15:36:38', TIMESTAMP '2001-06-16 15:36:38', 3, 'Не оценена');