create table product_to_order(
    order_id    int references order_item (id) on update cascade on delete cascade,
    item_id     int references product (id) on update cascade,
    quantity    smallint not null default 1,
    constraint product_to_order_pkey primary key (order_id, item_id)
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
    client  bigint      not null    references user_(id)
);

create table product_to_cart(
    cart_id     int references cart (id) on update cascade on delete cascade,
    item_id     int references product (id) on update cascade,
    quantity    smallint not null default 1,
    constraint product_to_cart_pkey primary key (cart_id, item_id)
);