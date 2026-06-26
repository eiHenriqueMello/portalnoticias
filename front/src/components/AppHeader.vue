<template>
  <header class="topo">
    <div class="container header-flex">
      <h1>Canoas <span> Mil grau</span></h1>
      
      <div class="clima-container" v-if="clima">
        <span class="📍">Canoas: </span>
        <strong>{{ clima.temperatura }}°C</strong> 
        <span class="condicao">({{ clima.condicao }})</span>
      </div>
      <div class="clima-container" v-else>
        <span class="carregando-clima">Carregando clima...</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      clima: null
    }
  },
  methods: {
    async buscarClima() {
      try {
        // API publica Open-Meteo tempo previsao
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-29.9161&longitude=-51.1838&current_weather=true');
        const dados = await res.json();
        
        if (dados && dados.current_weather) {
          this.clima = {
            temperatura: Math.round(dados.current_weather.temperature),
            condicao: this.traduzirClima(dados.current_weather.weathercode)
          };
        }
      } catch (error) {
        console.error("Erro ao buscar API de clima externa:", error);
      }
    },
    traduzirClima(codigo) {
      if (codigo === 0) return 'Céu Limpo';
      if (codigo >= 1 && codigo <= 3) return 'Parcialmente Nublado';
      if (codigo >= 51 && codigo <= 67) return 'Chovendo';
      if (codigo >= 71 && codigo <= 77) return 'Névoa';
      return 'Nublado';
    }
  },
  mounted() {
    this.buscarClima();
  }
}
</script>
