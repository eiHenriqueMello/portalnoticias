<template>
  <aside class="sidebar">
    <h3 class="titulo-side">ÚLTIMAS NOTÍCIAS</h3>
    
    <div 
      v-for="n in lista" 
      :key="n._id" 
      class="card-side" 
      @click="$emit('selecionar', n)"
      :class="{ ativo: selecionadaId === n._id }"
    >
      <img :src="n.imagem" class="thumb" :alt="n.titulo">
      <div class="info-side">
        <span class="tag-mini">{{ n.categoria }}</span>
        <h4>{{ n.titulo }}</h4>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'AppSidebar',
  props: {
    lista: { type: Array, required: true },
    // Aceita String ou Number para não gerar erro de tipo com o ID do banco
    selecionadaId: { type: [String, Number], default: null }
  }
}
</script>
<!-- 
<style scoped>
.sidebar {
  width: 350px;
}
.titulo-side {
  font-size: 1.2rem;
  border-bottom: 2px solid #333;
  padding-bottom: 5px;
  margin-bottom: 15px;
}
.card-side {
  display: flex;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background 0.2s;
}
.card-side:hover {
  background-color: #f5f5f5;
}
.card-side.ativo {
  border-left: 4px solid #ff4757;
  background-color: #f1f2f6;
}
.thumb {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}
.info-side h4 {
  margin: 5px 0 0 0;
  font-size: 0.95rem;
  color: #2c3e50;
}
.tag-mini {
  font-size: 0.7rem;
  background: #747d8c;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
}
</style> -->