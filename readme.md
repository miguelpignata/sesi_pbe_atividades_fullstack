# Atividades PBE Full Stack - PBE (SENAI)

Repositório unificado desenvolvido para as aulas de Programação de Back-End (PBE) do Senai, contendo projetos de APIs RESTful estruturadas em arquitetura **MVC (Model-View-Controller)** utilizando **Node.js**, **Express** e persistência de dados com **MariaDB / MySQL**.

---

## 📂 Projetos Desenvolvidos

### 1. Gestão de Resíduos Sólidos (`backend_residuos`)
* **Descrição:** Sistema voltado para o monitoramento e registro de pontos de descarte irregular de resíduos, permitindo o controle de ocorrências por tipo de resíduo, nível de risco e geolocalização dos descartes.
* **Funcionalidades:** CRUD de usuários, autenticação (login), CRUD de ocorrências e resumo estatístico de ocorrências tratadas.

### 2. Registros de Uso de Inteligência Artificial (`backend_usos_ia`)
* **Descrição:** Desenvolvido para atender a uma demanda de pesquisa da Faculdade de Jauariúna, com o objetivo de catalogar e monitorar o uso de IA em empresas, escolas e outros setores.
* **Funcionalidades:** CRUD de usuários, login, cadastro de sistemas de IA (finalidade, tecnologia, revisões humanas) e resumo contendo a contagem total de níveis de risco (Alto, Médio e Baixo).

### 3. Registro e Monitoramento de Consumo Energético (`backend_energia`)
* **Descrição:** Sistema desenvolvido para o SESI com o intuito de registrar equipamentos e locais, acompanhando o consumo energético para identificar possíveis desperdícios.
* **Funcionalidades:** CRUD de usuários, login, CRUD de registros de consumo por equipamento e cálculo automatizado da média de consumo em kWh.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas
* **Linguagem & Runtime:** JavaScript / Node.js
* **Banco de Dados Relacional:** MariaDB / MySQL (via XAMPP / MySQL Workbench)
* **Testes de API:** Thunder Client 
* **Modelagem:** Draw.io (Diagramas DER/MER salvos nas pastas `./docs` de cada projeto)

---

## 🚀 Como Executar os Projetos

1. **Pré-requisitos:**
   * Ter o **Node.js** e o **XAMPP** (com o serviço MySQL ativo) instalados em sua máquina.
   * Ter o **MySQL Workbench** para a execução dos scripts de banco de dados.

2. **Passo a passo geral:**
   * Acesse a pasta do projeto desejado (ex: `backend_residuos`, `backend_usos_ia` ou `backend_energia`).
   * Abra o MySQL Workbench, crie o banco de dados executando o script localizado na pasta `./db/script.sql` de cada projeto.
   * Abra o terminal integrado do VS Code na pasta do projeto escolhido e instale as dependências:
     ```bash
     npm install
     ```
   * Inicie o servidor em modo de desenvolvimento:
     ```bash
     npm run dev
     ```
   * O servidor rodará localmente em `http://localhost:3000`.
