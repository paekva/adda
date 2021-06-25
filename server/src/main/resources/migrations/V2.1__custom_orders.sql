CREATE TABLE CUSTOM_ORDER_ITEM
(
    id              SERIAL      NOT NULL PRIMARY KEY,
    client          INT         NOT NULL,
    description     TEXT        NOT NULL,
    date_of_order   TIMESTAMPTZ NOT NULL,
    date_of_receive TIMESTAMPTZ NOT NULL,
    status          INT         NOT NULL,
    price           TEXT        NOT NULL,
    last_error       TEXT
);

INSERT INTO CUSTOM_ORDER_ITEM (client, description, date_of_order, date_of_receive, status, price, last_error)
VALUES (21, 'Сигары Доминиканские марки BigSmoke в деревянном кейсе на 20 штук, зажигалка газовая металлическая Firebolt и 500 мл заправки к ней', TIMESTAMP '2011-05-16 15:36:38', TIMESTAMP '2011-06-16 15:36:38', 3, 'Не оценена', null);

INSERT INTO CUSTOM_ORDER_ITEM (client, description, date_of_order, date_of_receive, status, price, last_error)
VALUES (22, 'Табак ферментированный мексиканский марки OrangeBox, 400 г.', TIMESTAMP '2021-05-16 15:36:38', TIMESTAMP '2021-06-16 15:36:38', 17, 'Не оценена', null);


create table worker_to_custom_order
(
    id              SERIAL NOT NULL PRIMARY KEY,
    custom_order_id int references CUSTOM_ORDER_ITEM (id) on update cascade on delete cascade,
    client_id       int references user_ (id) on update cascade
);

insert into worker_to_custom_order(custom_order_id, client_id)
values (1, 3);
insert into worker_to_custom_order(custom_order_id, client_id)
values (1, 4);
insert into worker_to_custom_order(custom_order_id, client_id)
values (1, 5);
insert into worker_to_custom_order(custom_order_id, client_id)
values (1, 6);

insert into worker_to_custom_order(custom_order_id, client_id)
values (2, 3);
insert into worker_to_custom_order(custom_order_id, client_id)
values (2, 4);
insert into worker_to_custom_order(custom_order_id, client_id)
values (2, 5);
insert into worker_to_custom_order(custom_order_id, client_id)
values (2, 7);