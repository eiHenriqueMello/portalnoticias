import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'banco_noticias.db');
const db = new (sqlite3.verbose().Database)(dbPath, (err) => {
  if (err) {
    console.error('❌ Erro ao conectar no SQLite:', err.message);
  } else {
    console.log('📦 Conectado com sucesso ao banco SQLite local!');
  }
});


db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS noticias (
      _id TEXT PRIMARY KEY,
      titulo TEXT,
      conteudo TEXT,
      categoria TEXT,
      imagem TEXT,
      data_publicacao TEXT,
      quem_postou TEXT
    )
  `);


  db.get("SELECT COUNT(*) AS total FROM noticias", [], (err, row) => {
    if (!err && row.total === 0) {
      console.log("🌱 Banco vazio detectado! Inserindo notícias iniciais...");

      const noticiasIniciais = [
        { id: "noticia_1", categoria: "Tecnologia", titulo: "IA generativa já substitui 30% dos desenvolvedores júnior", conteudo: "Relatório do Fórum Econômico Mundial aponta que ferramentas como o GitHub Copilot e o ChatGPT realizaram tarefas de codificação que antes exigiam equipes inteiras de juniores. Empresas de tecnologia reduziram contratações iniciais e investem em 'desenvolvedores-gerentes' que revisam código gerado por IA. A previsão é que 50% das vagas de entrada sejam automatizadas até 2028.", imagem: "https://picsum.photos/id/91/800/450", data_publicacao: "13/05/2026", quem_postou: "Aline Moraes" },
        { id: "noticia_2", categoria: "Economia", titulo: "Criptomoedas despencam após regulação global", conteudo: "O G20 anunciou novas regras para exchanges e stablecoins, causando queda de 40% no mercado. Especialistas preveem migração para ativos lastreados em ouro digital.", imagem: "https://picsum.photos/id/26/800/450", data_publicacao: "25/01/2020", quem_postou: "Paulo Guedes" },
        { id: "noticia_3", categoria: "Ciência", titulo: "Cérebro humano é parcialmente simulado em supercomputador", conteudo: "Pesquisadores europeus conseguiram replicar o funcionamento de 1 bilhão de neurônios, abrindo caminho para tratamentos de Alzheimer e Parkinson via IA.", imagem: "https://picsum.photos/id/107/800/450", data_publicacao: "24/10/2020", quem_postou: "Albert Einstein" },
        { id: "noticia_4", categoria: "Esportes", titulo: "Atletas-robôs competem nas primeiras Olimpíadas de IA", conteudo: "Androides humanoides disputaram modalidades como futebol e corrida; organizadores planejam incluir a categoria nos Jogos Olímpicos de 2032.", imagem: "https://picsum.photos/id/96/800/450", data_publicacao: "24/09/2020", quem_postou: "Craque Neto" },
        { id: "noticia_5", categoria: "Cultura", titulo: "Filme feito inteiramente por IA vence festival de Cannes", conteudo: "A produção 'Ecos Sintéticos' utilizou roteiro, atuações e trilha sonora gerados por inteligência artificial, gerando debate sobre o futuro da arte.", imagem: "https://picsum.photos/id/88/800/450", data_publicacao: "24/07/2020", quem_postou: "Tati Quebra Barraco" },
        { id: "noticia_6", categoria: "Saúde", titulo: "Vacina brasileira contra dengue tem 95% de eficiência", conteudo: "Após testes em larga escala, o imunizante desenvolvido pelo Instituto Butantan mostra resultados promissores e deve estar disponível no SUS ainda este ano.", imagem: "https://picsum.photos/id/101/800/450", data_publicacao: "15/02/2025", quem_postou: "Renato do Grau" },
        { id: "noticia_7", categoria: "Meio Ambiente", titulo: "Reflorestamento da Amazônia atinge maior índice em década", conteudo: "Dados do INPE mostram que o desmatamento caiu 40% e o plantio de mudas nativas ultrapassou 10 milhões de hectares.", imagem: "https://picsum.photos/id/104/800/450", data_publicacao: "03/06/2024", quem_postou: "IBAMA" },
        { id: "noticia_8", categoria: "Moda", titulo: "Tecidos sustentáveis dominam semana de moda de Paris", conteudo: "Materiais reciclados e tingimento natural foram tendência absoluta nos desfiles; marcas abandonam o uso de poliéster.", imagem: "https://picsum.photos/id/106/800/450", data_publicacao: "12/10/2025", quem_postou: "O Diabo Veste Prada" },
        { id: "noticia_9", categoria: "Educação", titulo: "Escolas de tempo integral se tornam padrão no país", conteudo: "Lei aprovada em 2025 universaliza a jornada de 7 horas diárias; alunos têm acesso a alimentação, arte e robótica.", imagem: "https://picsum.photos/id/20/800/450", data_publicacao: "22/01/2026", quem_postou: "Evandro Guedes" },
        { id: "noticia_10", categoria: "Transporte", titulo: "Trem hiperloop liga São Paulo ao Rio em 30 minutos", conteudo: "Após anos de testes, a cápsula de alta velocidade começa a operar comercialmente; passagem custará R$ 150,00.", imagem: "https://picsum.photos/id/111/800/450", data_publicacao: "07/03/2026", quem_postou: "Ayrton Senna" }
      ];

      const stmt = db.prepare(`
        INSERT INTO noticias (_id, titulo, conteudo, categoria, imagem, data_publicacao, quem_postou)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      noticiasIniciais.forEach((n) => {
        stmt.run([n.id, n.titulo, n.conteudo, n.categoria, n.imagem, n.data_publicacao, n.quem_postou]);
      });

      stmt.finalize(() => {
        console.log("✅ 10 Notícias iniciais injetadas com sucesso!");
      });
    }
  });
});


// CONSULTA (GET)

app.get('/api/noticias', (req, res) => {
  db.all(`SELECT * FROM noticias`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    res.json(rows);
  });
});


// CADASTRO 

app.post('/api/noticias', (req, res) => {
  const { titulo, conteudo, categoria, imagem, data_publicacao, quem_postou } = req.body;
  const novoId = 'noticia_' + Math.random().toString(36).substring(2, 11);

  const query = `
    INSERT INTO noticias (_id, titulo, conteudo, categoria, imagem, data_publicacao, quem_postou)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [novoId, titulo, conteudo, categoria, imagem, data_publicacao, quem_postou], function(err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    res.status(201).json({ _id: novoId, titulo, conteudo, categoria, imagem, data_publicacao, quem_postou });
  });
});


// Editar uma notícia existente

app.put('/api/noticias/:id', (req, res) => {
  const idNoticia = req.params.id;
  const { titulo, conteudo, categoria } = req.body;

  const query = `
    UPDATE noticias 
    SET titulo = ?, conteudo = ?, categoria = ?
    WHERE _id = ?
  `;

  db.run(query, [titulo, conteudo, categoria, idNoticia], function(err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    res.json({ mensagem: "Notícia atualizada com sucesso no SQLite!" });
  });
});


// DELETE

app.delete('/api/noticias/:id', (req, res) => {
  const idNoticia = req.params.id;
  
  db.run(`DELETE FROM noticias WHERE _id = ?`, [idNoticia], function(err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    res.json({ mensagem: "Notícia deletada com sucesso do SQLite!", idDeletado: idNoticia });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor da API REST rodando na porta ${PORT}`);
});