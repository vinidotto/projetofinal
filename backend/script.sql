CREATE DATABASE hackathon_db;


CREATE TABLE avaliadores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    login VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    firebaseID VARCHAR(255)
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
CREATE TABLE equipe_avaliador (
    equipe_id INTEGER NOT NULL REFERENCES equipes(id),
    avaliador_id INTEGER NOT NULL REFERENCES avaliadores(id),
    PRIMARY KEY (equipe_id, avaliador_id)
);



select * from avaliadores;
select * from equipes;
select * from avaliacoes;
select * from equipe_avaliador ;



select * from equipes;

select * from avaliadores;

select * from avaliacoes;