create table product_to_order(
    order_id    int references order_item (id) on update cascade on delete cascade,
    product_id     int references product (id) on update cascade,
    quantity    int not null,
    constraint product_to_order_pkey primary key (order_id, product_id)
);

insert into product_to_order values (1, 1, 5);
insert into product_to_order values (1, 2, 1);
insert into product_to_order values (1, 4, 2);
insert into product_to_order values (2, 2, 2);
insert into product_to_order values (2, 3, 1);
insert into product_to_order values (2, 5, 1);
insert into product_to_order values (3, 1, 1);
insert into product_to_order values (3, 2, 1);
insert into product_to_order values (4, 4, 10);
insert into product_to_order values (5, 1, 3);
insert into product_to_order values (5, 5, 3);

create table cart(
    id      serial      not null    primary key,
    client  int         not null    references user_(id)
);

create table product_to_cart(
    cart_id     int references cart (id) on update cascade on delete cascade,
    product_id     int references product (id) on update cascade,
    quantity    int not null,
    constraint product_to_cart_pkey primary key (cart_id, product_id)
);

INSERT INTO cart (client)
VALUES (21);

INSERT INTO cart (client)
VALUES (22);

INSERT INTO product_to_cart
VALUES (1, 1, 5);
INSERT INTO product_to_cart
VALUES (1, 3, 1);
INSERT INTO product_to_cart
VALUES (1, 2, 16);

INSERT INTO product_to_cart
VALUES (2, 1, 3);
INSERT INTO product_to_cart
VALUES (2, 5, 1);
INSERT INTO product_to_cart
VALUES (2, 4, 1);

