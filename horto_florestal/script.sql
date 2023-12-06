-- Criar o banco de dados (substitua 'nome_do_banco' pelo nome desejado)
CREATE DATABASE IF NOT EXISTS nome_do_banco;
USE nome_do_banco;

-- Criar a tabela 'plants' para armazenar informações sobre plantas
CREATE TABLE IF NOT EXISTS plants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);