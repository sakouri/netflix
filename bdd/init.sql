
-- création bdd
DROP DATABASE IF EXISTS netflix_db;
CREATE DATABASE netflix_db;
USE netflix_db;

-- table des catégories
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- table des contenus 
CREATE TABLE IF NOT EXISTS contents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type ENUM('movie', 'documentary') NOT NULL,
    release_year INT,
    duration VARCHAR(50),
    image_url TEXT,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- table catégories
INSERT INTO categories (name) VALUES 
('Action'),
('Horreur'),
('Western'),
('Nature'),
('Sport');
