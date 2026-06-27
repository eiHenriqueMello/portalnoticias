# Portal de Notícias - Canoas Mil Grau 📰🔥

Uma aplicação web Full Stack desenvolvida para cobertura de notícias locais, integrando tecnologias modernas de desenvolvimento web e banco de dados relacional.

## 🚀 Tecnologias Utilizadas

- **Frontend:** Vue.js (framework progressivo de JavaScript), HTML5 e CSS3 moderno.
- **Backend:** Node.js com Express (API REST estruturada).
- **Banco de Dados:** SQLite3 (banco relacional local persistido em arquivo `banco_noticias.db`).
- **Integração Externa:** API Pública Open-Meteo para consumo de dados meteorológicos de Canoas em tempo real.
- **Hospedagem & Nuvem:** Deploy automatizado do Frontend na **Vercel** e do Backend no **Render**.

## 🛠️ Requisitos Atendidos

- [x] Frontend construído em framework moderno (Vue.js).
- [x] Backend estruturado em API REST com Express.
- [x] CRUD completo de Notícias (Cadastro, Consulta, Alteração e Exclusão integradas na interface).
- [x] Persistência em Banco de Dados Relacional (SQLite).
- [x] Comunicação assíncrona entre Front e Back usando Fetch API.
- [x] Autenticação básica de usuário (Painel Admin protegido com Usuário: `admin` / Senha: `123`).
- [x] Integração com serviço/API externa (Previsão do Tempo de Canoas).
- [x] **Design Responsivo e Mobile First:** Interface totalmente otimizada via CSS Media Queries para smartphones e tablets, adaptando a grade de notícias rígida para um fluxo vertical fluido e botões amigáveis para telas de toque.
- [x] **Segurança por Obscuridade (Painel oculto):** Remoção completa de botões públicos ou textos explicativos que revelavam o acesso à administração no rodapé da página.
- [x] **Ativação por Atalho de Teclado (Easter Egg):** Implementação de um escutador global de eventos no Vue (`keydown`) que ativa o painel de login de forma invisível se o usuário digitar sequencialmente a palavra `admin` no teclado.
- [x] **Ativação Dinâmica via URL (Query Parameters):** Lógica no ciclo de vida do componente que ativa a tela de login se o parâmetro `?acesso=secreto` for fornecido na URL, ideal para administração via dispositivos móveis.

---

## 🔒 Como Acessar a Área do Administrador (Modo Secreto)

Para garantir que apenas administradores acessem o painel de gerenciamento, o botão público de login foi removido. Existem duas formas exclusivas de abrir a autenticação:

### 1. Pelo Computador (Atalho no Teclado)
1. Abra a página inicial do portal.
2. Clique em qualquer espaço em branco na tela.
3. Digite sequencialmente no teclado as letras: **`a` `d` `m` `i` `n`**
4. O painel de login se abrirá automaticamente na tela.

### 2. Pelo Celular (URL Secreta)
1. Adicione o parâmetro de acesso ao final da URL do seu site, desta forma:
   `https://seu-site.vercel.app/?acesso=secreto`
2. O portal carregará já com a tela de autenticação ativada.

---

## 📦 Como Executar o Projeto Localmente

### 1. Configurar e rodar o Back-end
Abra um terminal na pasta `back`:
```bash
cd back
npm install
node server.js
