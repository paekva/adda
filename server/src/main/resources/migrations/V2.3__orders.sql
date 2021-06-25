CREATE TABLE ORDER_ITEM
(
    id              SERIAL      NOT NULL PRIMARY KEY,
    client          INT         NOT NULL REFERENCES user_ (id),
    date_of_order   TIMESTAMPTZ NOT NULL,
    date_of_receive TIMESTAMPTZ NOT NULL,
    status          INT         NOT NULL,
    last_error      TEXT
);

INSERT INTO ORDER_ITEM (client, date_of_order, date_of_receive, status, last_error)
VALUES (21, TIMESTAMP '2021-05-13 15:36:38', TIMESTAMP '2021-06-16 15:00:00', 7, null);

INSERT INTO ORDER_ITEM (client, date_of_order, date_of_receive, status, last_error)
VALUES (21, TIMESTAMP '2021-05-4 15:36:38', TIMESTAMP '2021-06-2 15:00:00', 22, null);

INSERT INTO ORDER_ITEM (client, date_of_order, date_of_receive, status, last_error)
VALUES (22, TIMESTAMP '2021-05-14 15:16:38', TIMESTAMP '2021-06-16 15:00:00', 10, null);

INSERT INTO ORDER_ITEM (client, date_of_order, date_of_receive, status, last_error)
VALUES (22, TIMESTAMP '2021-05-16 15:16:38', TIMESTAMP '2021-06-16 15:00:00', 5, null);

INSERT INTO ORDER_ITEM (client, date_of_order, date_of_receive, status, last_error)
VALUES (23, TIMESTAMP '2021-05-9 16:36:38', TIMESTAMP '2021-06-9 15:00:00', 18, null);


create table product_to_order
(
    id         SERIAL NOT NULL PRIMARY KEY,
    order_id   int references ORDER_ITEM (id) on update cascade on delete cascade,
    product_id int references product (id) on update cascade
);

insert into product_to_order(order_id, product_id)
values (1, 1);
insert into product_to_order(order_id, product_id)
values (1, 2);
insert into product_to_order(order_id, product_id)
values (1, 4);
insert into product_to_order(order_id, product_id)
values (2, 2);
insert into product_to_order(order_id, product_id)
values (2, 3);
insert into product_to_order(order_id, product_id)
values (2, 1);
insert into product_to_order(order_id, product_id)
values (3, 1);
insert into product_to_order(order_id, product_id)
values (3, 2);
insert into product_to_order(order_id, product_id)
values (3, 3);
insert into product_to_order(order_id, product_id)
values (3, 4);
insert into product_to_order(order_id, product_id)
values (4, 4);
insert into product_to_order(order_id, product_id)
values (4, 2);
insert into product_to_order(order_id, product_id)
values (5, 5);

create table worker_to_order
(
    id        SERIAL NOT NULL PRIMARY KEY,
    order_id  int references ORDER_ITEM (id) on update cascade on delete cascade,
    client_id int references user_ (id) on update cascade
);

insert into worker_to_order(order_id, client_id)
values (1, 3);
insert into worker_to_order(order_id, client_id)
values (1, 4);
insert into worker_to_order(order_id, client_id)
values (1, 5);
insert into worker_to_order(order_id, client_id)
values (1, 6);


insert into worker_to_order(order_id, client_id)
values (2, 3);
insert into worker_to_order(order_id, client_id)
values (2, 4);
insert into worker_to_order(order_id, client_id)
values (2, 5);
insert into worker_to_order(order_id, client_id)
values (2, 6);


insert into worker_to_order(order_id, client_id)
values (3, 3);
insert into worker_to_order(order_id, client_id)
values (3, 4);
insert into worker_to_order(order_id, client_id)
values (3, 5);
insert into worker_to_order(order_id, client_id)
values (3, 6);


insert into worker_to_order(order_id, client_id)
values (4, 3);
insert into worker_to_order(order_id, client_id)
values (4, 4);
insert into worker_to_order(order_id, client_id)
values (4, 5);
insert into worker_to_order(order_id, client_id)
values (4, 7);


insert into worker_to_order(order_id, client_id)
values (5, 3);
insert into worker_to_order(order_id, client_id)
values (5, 4);
insert into worker_to_order(order_id, client_id)
values (5, 5);
insert into worker_to_order(order_id, client_id)
values (5, 7);