CREATE DATABASE IF NOT EXISTS food_delivery;

USE food_delivery;

DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS user_address;
DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS product_extra;
DROP TABLE IF EXISTS product_image;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS store;
DROP TABLE IF EXISTS payment;
DROP TABLE IF EXISTS user;

CREATE TABLE user(
    id CHAR(56) PRIMARY KEY DEFAULT (UUID()),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    first_name VARCHAR(64) NOT NULL ,
    last_name VARCHAR(64) NOT NULL ,
    city VARCHAR(64) NOT NULL,
    barangay VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL UNIQUE,
    password TEXT NOT NULL ,
    gender VARCHAR(32),
    role ENUM('DELIVERY', 'CUSTOMER', 'SELLER')
);

CREATE TABLE user_address(
    id CHAR(56) PRIMARY KEY DEFAULT (UUID()) ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    city VARCHAR(255),
    barangay VARCHAR(255),
    street VARCHAR(255),
    floor_unit_room VARCHAR(255),
    delivery_instruction TEXT,
    label VARCHAR(32) NOT NULL,
    use_for_delivery BOOLEAN,
    user_id CHAR(56) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE store(
    id CHAR(56) PRIMARY KEY DEFAULT (UUID()) ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    name VARCHAR(255) NOT NULL ,
    description TEXT
);

CREATE TABLE product(
    id CHAR(56) PRIMARY KEY DEFAULT (UUID()) ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    variety VARCHAR(255),
    price FLOAT NOT NULL,
    store_id CHAR(56) NOT NULL,
    FOREIGN KEY (store_id) REFERENCES store(id)
);

CREATE TABLE product_image(
    id CHAR(56) PRIMARY KEY DEFAULT (UUID()) ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    url TEXT NOT NULL,
    product_id CHAR(56) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE product_extra(
    id CHAR(56) PRIMARY KEY DEFAULT (UUID()) ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price FLOAT NOT NULL,
    product_id CHAR(56) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE cart(
    id CHAR(56) PRIMARY KEY DEFAULT (UUID()),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    product_instruction TEXT,
    product_id CHAR(56) NOT NULL ,
    product_extra_id CHAR(56) NOT NULL ,
    user_id CHAR(56) NOT NULL,
    store_id CHAR(56) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (product_extra_id) REFERENCES product_extra(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (store_id) REFERENCES store(id)
);

CREATE TABLE payment(
    id CHAR(56) PRIMARY KEY DEFAULT (UUID()),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    payment_type VARCHAR(255) NOT NULL,
    payment_status ENUM('PAID', 'NOT_PAID') NOT NULL ,
    reference VARCHAR(255) NOT NULL
);

CREATE TABLE order_item(
    id CHAR(56) PRIMARY KEY DEFAULT (UUID()),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    order_status ENUM('COMPLETED', 'COOKING', 'IN_TRANSIT', 'CANCELLED') NOT NULL,
    payment CHAR(56) NOT NULL,
    customer_address CHAR(56) NOT NULL,
    delivery_man_id CHAR(56) NOT NULL,
    store_id CHAR(56) NOT NULL,
    product_id CHAR(56) NOT NULL,
    product_extra_id CHAR(56) NOT NULL,
    customer_id CHAR(56) NOT NULL,
    FOREIGN KEY (delivery_man_id) REFERENCES user(id),
    FOREIGN KEY (store_id) REFERENCES store(id),
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (product_extra_id) REFERENCES product_extra(id),
    FOREIGN KEY (customer_id) REFERENCES user(id)
);