CREATE DATABASE hackathon_db;



CREATE TABLE avaliadores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    login VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE equipes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE avaliacoes (
    id SERIAL PRIMARY KEY,
    avaliador_id INTEGER NOT NULL REFERENCES avaliadores(id),
    equipe_id INTEGER NOT NULL REFERENCES equipes(id),
    notas JSONB NOT NULL
);

ALTER TABLE avaliadores
ADD COLUMN email VARCHAR(255);


DELETE FROM avaliadores;



select * from equipes;

select * from avaliadores;

select * from avaliacoes;