drop database if exists gestao_residuos;
create database gestao_residuos;
use gestao_residuos;

create table usuario (
    id int not null auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    senha varchar(100) not null
);

create table ocorrencia (
    id int not null auto_increment primary key,
    usuarioId int not null,
    local varchar(100) not null,
    tipoResiduo varchar(50) not null,
    nivelRisco enum('Baixo', 'Medio', 'Alto') default('Medio') not null,
    data Date not null,
    status enum('Novo', 'Tratado', 'Pendente') default('Novo') not null
);

alter table ocorrencia add constraint fk_registra foreign key (usuarioId) references usuario(id);

insert into usuario (nome, email, senha) values
('Maria Oliveira', 'maria.oliveira@email.com', md5('senha123')),
('João Silva', 'joao.silva@email.com', md5('senha123')),
('Ana Souza', 'ana.souza@email.com', md5('senha123'));

insert into ocorrencia(usuarioId, local, tipoResiduo, nivelRisco, data, status) values
(1, 'Avenida Osmar Contato, 120', 'Eletrônico', 'Alto', curdate(), 'Novo'),
(2, 'Rua Osmar Motta, 1313', 'Veículo usado', 'Baixo', curdate(), 'Pendente'),
(1, 'Rua Lucas trado, 15', 'Eletrônico', 'Alto', curdate(), 'Tratado'),
(2, 'Rua Rolando da Rocha, S/N', 'Móvel usado', 'Medio', curdate(), 'Novo'),
(3, 'Rua Jacinto Melo, 101', 'Hospitalar', 'Alto', curdate(), 'Novo');