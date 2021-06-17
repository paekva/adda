CREATE TABLE ORDER_ITEM
(
    id              SERIAL      NOT NULL PRIMARY KEY,
    client          INT         NOT NULL REFERENCES user_ (id),
    date_of_order   TIMESTAMPTZ NOT NULL,
    date_of_receive TIMESTAMPTZ NOT NULL,
    status          INT         NOT NULL
);

INSERT INTO ORDER_ITEM (client, date_of_order, date_of_receive, status)
VALUES (21, TIMESTAMP '2011-05-16 15:36:38', TIMESTAMP '2011-06-16 15:36:38', 1);

INSERT INTO ORDER_ITEM (client, date_of_order, date_of_receive, status)
VALUES (21, TIMESTAMP '2021-05-16 15:36:38', TIMESTAMP '2021-06-16 15:36:38', 2);

INSERT INTO ORDER_ITEM (client, date_of_order, date_of_receive, status)
VALUES (22, TIMESTAMP '2001-05-16 15:36:38', TIMESTAMP '2001-06-16 15:36:38', 3);

INSERT INTO ORDER_ITEM (client, date_of_order, date_of_receive, status)
VALUES (22, TIMESTAMP '2011-05-16 15:36:38', TIMESTAMP '2011-06-16 15:36:38', 4);

INSERT INTO ORDER_ITEM (client, date_of_order, date_of_receive, status)
VALUES (23, TIMESTAMP '2021-05-16 15:36:38', TIMESTAMP '2021-06-16 15:36:38', 5);

INSERT INTO ORDER_ITEM (client, date_of_order, date_of_receive, status)
VALUES (23, TIMESTAMP '2001-05-16 15:36:38', TIMESTAMP '2001-06-16 15:36:38', 6);

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
values (1, 2);
insert into product_to_order(order_id, product_id)
values (1, 4);
insert into product_to_order(order_id, product_id)
values (2, 2);
insert into product_to_order(order_id, product_id)
values (2, 3);
insert into product_to_order(order_id, product_id)
values (2, 5);
insert into product_to_order(order_id, product_id)
values (3, 1);
insert into product_to_order(order_id, product_id)
values (3, 2);
insert into product_to_order(order_id, product_id)
values (4, 4);
insert into product_to_order(order_id, product_id)
values (5, 1);
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