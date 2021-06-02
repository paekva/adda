create table catalog_item(
    id          serial      not null    primary key,
    name        varchar(32) not null,
    description text        not null,
    price       float       not null
);

insert into catalog_item (name, description, price) values ('Item1', 'Товар №1', '119.99');
insert into catalog_item (name, description, price) values ('Item2', 'Товар №2', '99.99');
insert into catalog_item (name, description, price) values ('Item3', 'Товар №3', '249.99');
insert into catalog_item (name, description, price) values ('Item4', 'Товар №4', '9.99');
insert into catalog_item (name, description, price) values ('Item5', 'Товар №5', '149.99');

create table catalog_item_to_order(
    order_id    int references order_item (id) on update cascade on delete cascade,
    item_id     int references catalog_item (id) on update cascade,
    quantity    smallint not null default 1,
    constraint catalog_item_to_order_pkey primary key (order_id, item_id)
);

insert into catalog_item_to_order values (1, 1, 5);
insert into catalog_item_to_order values (1, 2, 1);
insert into catalog_item_to_order values (1, 4, 2);
insert into catalog_item_to_order values (2, 2, 2);
insert into catalog_item_to_order values (2, 3, 1);
insert into catalog_item_to_order values (2, 5, 1);
insert into catalog_item_to_order values (3, 1, 1);
insert into catalog_item_to_order values (3, 2, 1);
insert into catalog_item_to_order values (4, 4, 10);
insert into catalog_item_to_order values (5, 1, 3);
insert into catalog_item_to_order values (5, 5, 3);

create table cart(
    id      serial      not null    primary key,
    client  bigint      not null    references user_(id)
);

create table catalog_item_to_cart(
    cart_id     int references cart (id) on update cascade on delete cascade,
    item_id     int references catalog_item (id) on update cascade,
    quantity    smallint not null default 1,
    constraint catalog_item_to_cart_pkey primary key (cart_id, item_id)
);