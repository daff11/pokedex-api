CREATE TABLE pokemon (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    height INT,
    weight INT,
    base_experience INT,
    image VARCHAR(255)
);

INSERT INTO pokemon (id, name, height, weight, base_experience, image)
VALUES
(1, 'bulbasaur', 7, 69, 64, 'bulbasaur.png'),
(2, 'ivysaur', 10, 130, 142, 'ivysaur.png'),
(3, 'venusaur', 20, 1000, 236, 'venusaur.png'),
(4, 'charmander', 6, 85, 62, 'charmander.png');

SELECT * FROM pokemon