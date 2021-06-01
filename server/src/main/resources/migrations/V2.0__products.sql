CREATE TABLE PRODUCT
(
    id    SERIAL  NOT NULL PRIMARY KEY,
    name  TEXT    NOT NULL,
    price NUMERIC NOT NULL
);

INSERT INTO PRODUCT (name, price)
VALUES ('Зажигалка Zoppo (жид.)', 2500);

INSERT INTO PRODUCT (name, price)
VALUES ('Зажигалка (жид.)', 450);

INSERT INTO PRODUCT (name, price)
VALUES ('Жидкость заправочная, 150 мл.', 500);

INSERT INTO PRODUCT (name, price)
VALUES ('Сигареты MULEBORO, 20 шт. (упак.)', 800);

INSERT INTO product (name, price)
VALUES ('Пена звукоизол., 750 мл.', 1200);

