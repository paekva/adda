create table cart
(
    id     serial not null primary key,
    client int    not null references user_ (id)
);

create table product_to_cart
(
    id         SERIAL NOT NULL PRIMARY KEY,
    cart_id    int references cart (id) on update cascade on delete cascade,
    product_id int references product (id) on update cascade
);

INSERT INTO cart (client)
VALUES (21);

INSERT INTO cart (client)
VALUES (22);

INSERT INTO product_to_cart (cart_id, product_id)
VALUES (1, 1);
INSERT INTO product_to_cart (cart_id, product_id)
VALUES (1, 3);
INSERT INTO product_to_cart (cart_id, product_id)
VALUES (1, 3);
INSERT INTO product_to_cart (cart_id, product_id)
VALUES (1, 2);

INSERT INTO product_to_cart (cart_id, product_id)
VALUES (2, 1);
INSERT INTO product_to_cart (cart_id, product_id)
VALUES (2, 5);
INSERT INTO product_to_cart (cart_id, product_id)
VALUES (2, 4);

