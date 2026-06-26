# Portal de Notícias - Canoas Mil Grau 📰🔥

Uma aplicação web Full Stack desenvolvida para cobertura de notícias locais, integrando tecnologias modernas de desenvolvimento web e banco de dados relacional.

## 🚀 Tecnologias Utilizadas

- **Frontend:** Vue.js (framework progressivo de JavaScript), HTML5 e CSS3 moderno.
- **Backend:** Node.js com Express (API REST estruturada).
- **Banco de Dados:** SQLite3 (banco relacional local persistido em arquivo `banco_noticias.db`).
- **Integração Externa:** API Pública Open-Meteo para consumo de dados meteorológicos de Canoas em tempo real.

## 🛠️ Requisitos Atendidos

- [x] Frontend construído em framework moderno (Vue.js).
- [x] Backend estruturado em API REST com Express.
- [x] CRUD completo de Notícias (Cadastro, Consulta, Alteração e Exclusão integradas na interface).
- [x] Persistência em Banco de Dados Relacional (SQLite).
- [x] Comunicação assíncrona entre Front e Back usando Fetch API.
- [x] Autenticação básica de usuário (Painel Admin protegido com Usuário: `admin` / Senha: `123`).
- [x] Integração com serviço/API externa (Previsão do Tempo de Canoas).

## 📦 Como Executar o Projeto Localmente

### 1. Configurar e rodar o Back-end
Abra um terminal na pasta `back`:
```bash
cd back
npm install
node server.js


# Como rodar
# 1- Ir na pasta do arquivo 
# 2- npm run dev 
# 3- Copiar o endereço do terminal 
# 4- Colar no navegador