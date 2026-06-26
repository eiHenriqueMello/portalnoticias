<template>
  <div id="app">
    <AppHeader />

    <div class="container">
      <div class="grade">
        
        <main class="area-noticia" v-if="selecionada">
          <span class="tag-cat">{{ selecionada.categoria }}</span>
          <h2>{{ selecionada.titulo }}</h2>
          
          <p class="meta">
            Por <strong>{{ selecionada.quem_postou }}</strong> | Publicado em {{ selecionada.data_publicacao }}
          </p>

          <img :src="selecionada.imagem" :alt="selecionada.titulo" class="img-main">

          <div class="texto-corpo">{{ selecionada.conteudo }}</div>

          <div v-if="adminLogado" style="display: flex; gap: 12px; margin-top: 25px; flex-wrap: wrap;">
            <button @click="carregarParaCadastro" class="btn-admin" style="margin-top: 0; background: #2563eb;">
              ➕ Adicionar Nova Notícia
            </button>
            <button @click="carregarParaEdicao(selecionada)" class="btn-admin" style="margin-top: 0; background: #eab308;">
              ✏️ Editar Esta Notícia
            </button>
            <button @click="deletarNoticia(selecionada._id)" class="btn-deletar" style="margin-top: 0;">
              🗑️ Excluir Esta Notícia
            </button>
          </div>
        </main>

        <main class="area-noticia" v-else>
          <p class="texto-corpo" style="text-align: center; color: #64748b;">
            Nenhuma notícia selecionada ou banco vazio.
          </p>
          <div v-if="adminLogado" style="text-align: center; margin-top: 20px;">
            <button @click="carregarParaCadastro" class="btn-admin" style="background: #2563eb;">
              ➕ Adicionar Nova Notícia
            </button>
          </div>
        </main>

        <AppSidebar 
          :lista="noticias" 
          :selecionadaId="obterIdSelecionado()" 
          @selecionar="trocarNoticia" 
        />
      </div>

      <div style="margin-top: 40px; margin-bottom: 60px;">
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-bottom: 30px;">
        
        <div style="text-align: center;" v-if="!adminLogado && !mostrarLogin">
          <button class="btn-admin" @click="mostrarLogin = true">🔒 Acessar Área do Administrador</button>
        </div>

        <div class="painel-admin" v-if="mostrarLogin && !adminLogado">
          <h3 style="margin-bottom: 10px; color: #0f172a;">Autenticação do Sistema</h3>
          <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">
            Usuário: <strong>admin</strong> | Senha: <strong>123</strong>
          </p>
          <div class="form-grupo">
            <label>Usuário:</label>
            <input type="text" v-model="usuarioInput">
          </div>
          <div class="form-grupo" style="margin-top: 15px;">
            <label>Senha:</label>
            <input type="password" v-model="senhaInput" @keyup.enter="fazerLogin">
          </div>
          <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button class="btn-admin" @click="fazerLogin" style="margin-top: 0;">Entrar no Painel</button>
            <button class="btn-deletar" @click="mostrarLogin = false" style="margin-top: 0; background: #64748b;">Cancelar</button>
          </div>
        </div>

        <div class="painel-admin" v-if="adminLogado && exibirFormulario">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
            <h3 style="color: #0f172a; margin: 0;">
              {{ modoEdicao ? '📝 Editando Notícia Selecionada' : '➕ Cadastrar Nova Notícia' }}
            </h3>
            <button class="btn-deletar" style="margin: 0; background: #64748b;" @click="fecharFormulario">Fechar Caixa ❌</button>
          </div>

          <form @submit.prevent="salvarNoticia">
            <div class="form-grupo">
              <label>Título da Notícia:</label>
              <input type="text" v-model="novaNoticia.titulo" required>
            </div>
            
            <div class="form-grupo" style="margin-top: 15px;">
              <label>Categoria:</label>
              <input type="text" v-model="novaNoticia.categoria" required>
            </div>
            
            <div class="form-grupo" style="margin-top: 15px;">
              <label>Conteúdo Completo:</label>
              <textarea rows="5" v-model="novaNoticia.conteudo" required></textarea>
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 20px;">
              <button type="submit" class="btn-admin" style="margin-top:0; width: 100%;" :style="{ background: modoEdicao ? '#eab308' : '#16a34a' }">
                {{ modoEdicao ? '💾 Salvar Alterações' : '🚀 Publicar no Portal' }}
              </button>
              <button type="button" @click="fecharFormulario" class="btn-deletar" style="margin-top:0; background: #475569;">
                Cancelar
              </button>
            </div>
          </form>
        </div>

        <div style="text-align: center; margin-top: 20px;" v-if="adminLogado && !exibirFormulario">
          <button class="btn-deletar" style="background: #475569;" @click="adminLogado = false">Sair do Painel Admin 🔓</button>
        </div>
      </div>
      </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  components: { AppHeader, AppSidebar, AppFooter },
  data() {
    return {
      noticias: [],
      selecionada: null,
      
      mostrarLogin: false,
      adminLogado: false,
      usuarioInput: '',
      senhaInput: '',

      exibirFormulario: false, 
      modoEdicao: false,
      idSendoEditado: null,

      novaNoticia: {
        titulo: '',
        categoria: '',
        conteudo: ''
      }
    }
  },
  methods: {
    trocarNoticia(n) {
      this.selecionada = n;
      if(this.modoEdicao) this.fecharFormulario();
    },
    obterIdSelecionado() {
      if (!this.selecionada) return null;
      return this.selecionada._id;
    },
    async carregarNoticias() {
      try {
        const resposta = await fetch('http://localhost:3000/api/noticias');
        const dados = await resposta.json();
        this.noticias = dados;
        if (dados.length > 0) {
          if (this.selecionada) {
            const aindaExiste = dados.find(n => n._id === this.selecionada._id);
            this.selecionada = aindaExiste ? aindaExiste : dados[0];
          } else {
            this.selecionada = dados[0];
          }
        } else {
          this.selecionada = null;
        }
      } catch (erro) {
        console.error("Erro ao carregar as notícias:", erro);
      }
    },
    fazerLogin() {
      if (this.usuarioInput === 'admin' && this.senhaInput === '123') {
        this.adminLogado = true;
        this.mostrarLogin = false;
        this.usuarioInput = '';
        this.senhaInput = '';
      } else {
        alert("Usuário ou senha incorretos!");
      }
    },
    carregarParaCadastro() {
      this.modoEdicao = false;
      this.idSendoEditado = null;
      this.novaNoticia.titulo = '';
      this.novaNoticia.categoria = '';
      this.novaNoticia.conteudo = '';
      this.exibirFormulario = true;
      
      this.rolarAteFormulario();
    },
    carregarParaEdicao(noticia) {
      this.modoEdicao = true;
      this.idSendoEditado = noticia._id;
      this.novaNoticia.titulo = noticia.titulo;
      this.novaNoticia.categoria = noticia.categoria;
      this.novaNoticia.conteudo = noticia.conteudo;
      this.exibirFormulario = true;
      
      this.rolarAteFormulario();
    },
    fecharFormulario() {
      this.exibirFormulario = false;
      this.modoEdicao = false;
      this.idSendoEditado = null;
      this.novaNoticia.titulo = '';
      this.novaNoticia.categoria = '';
      this.novaNoticia.conteudo = '';
    },
    rolarAteFormulario() {
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 50);
    },
    async salvarNoticia() {
      if (this.modoEdicao) {
        try {
          const resposta = await fetch(`http://localhost:3000/api/noticias/${this.idSendoEditado}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.novaNoticia)
          });

          if (resposta.ok) {
            alert("Notícia alterada com sucesso no SQLite!");
            this.fecharFormulario();
            await this.carregarNoticias();
          }
        } catch (erro) {
          alert("Erro ao alterar notícia: " + erro.message);
        }
      } else {
        try {
          const resposta = await fetch('http://localhost:3000/api/noticias', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              titulo: this.novaNoticia.titulo,
              categoria: this.novaNoticia.categoria,
              conteudo: this.novaNoticia.conteudo,
              imagem: 'https://picsum.photos/800/400', 
              data_publicacao: new Date().toLocaleDateString('pt-BR'),
              quem_postou: 'Redação Canoas Mil Grau'
            })
          });

          if (resposta.ok) {
            alert("Notícia gravada no SQLite com sucesso!");
            this.fecharFormulario();
            await this.carregarNoticias();
          }
        } catch (erro) {
          alert("Erro ao cadastrar: " + erro.message);
        }
      }
    },
    async deletarNoticia(id) {
      if (!confirm("Tem certeza que deseja deletar permanentemente esta notícia do SQLite?")) return;
      
      try {
        const resposta = await fetch(`http://localhost:3000/api/noticias/${id}`, {
          method: 'DELETE'
        });

        if (resposta.ok) {
          alert("Notícia removida do banco de dados!");
          this.fecharFormulario();
          await this.carregarNoticias();
        }
      } catch (erro) {
        alert("Erro ao deletar: " + erro.message);
      }
    }
  },
  mounted() {
    this.carregarNoticias();
  }
}
</script>