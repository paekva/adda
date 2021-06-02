CREATE TABLE PRODUCT
(
    id          SERIAL          NOT NULL PRIMARY KEY,
    name        varchar(64)     NOT NULL,
    description text            NOT NULL,
    price       NUMERIC         NOT NULL
);

INSERT INTO PRODUCT (name, description, price)
VALUES ('Зажигалка Zoppo (жид.)', '', 2500);

INSERT INTO PRODUCT (name, description, price)
VALUES ('Зажигалка (жид.)', '', 450);

INSERT INTO PRODUCT (name, description, price)
VALUES ('Жидкость заправочная, 150 мл.', '', 500);

INSERT INTO PRODUCT (name, description, price)
VALUES ('Сигареты MULEBORO, 20 шт. (упак.)', '', 800);

INSERT INTO product (name, description, price)
VALUES ('Пена звукоизол., 750 мл.', '', 1200);

