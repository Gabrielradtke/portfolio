const idiomaBtn = document.querySelector('.modo-idioma');
const modoCorBtn = document.querySelector('.modo-cor');
let idiomaAtual = 'pt';
let modoEscuroAtivo = false;

// Lista dos idiomas disponíveis
const idiomas = ['pt', 'en', 'es'];
let idiomaIndex = 0;

// Alternância de idioma ao clicar
idiomaBtn.addEventListener('click', () => {
  // Avança para o próximo idioma no array
  idiomaIndex = (idiomaIndex + 1) % idiomas.length;
  idiomaAtual = idiomas[idiomaIndex];

  // Atualiza o ícone de bandeira
  if (idiomaAtual === 'pt') {
    idiomaBtn.src = '/imagens/icons/pt-br.png';
  } else if (idiomaAtual === 'en') {
    idiomaBtn.src = '/imagens/icons/en-us.png';
  } else if (idiomaAtual === 'es') {
    idiomaBtn.src = '/imagens/icons/es.png';
  }

  // Atualiza os textos com base no idioma
  document.querySelectorAll('[data-pt]').forEach(element => {
    element.textContent = element.getAttribute(`data-${idiomaAtual}`);
  });
});

// Alternância do modo claro/escuro
modoCorBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  modoEscuroAtivo = !modoEscuroAtivo;
  modoCorBtn.src = modoEscuroAtivo ? '/imagens/icons/sun.png' : '/imagens/icons/moon.png';
});

// Atualiza a hora local
function updateLocalTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('local-time').textContent = `${hours}:${minutes}`;
}

updateLocalTime();
setInterval(updateLocalTime, 60000);

// Geolocalização
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    async function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await response.json();
        const address = data.address || {};
        const city = address.city || address.town || address.village || address.hamlet || address.state || 'Local';
        const country = address.country || 'Desconhecido';
        document.getElementById('user-location').textContent = `${city}, ${country}`;

        // Buscar temperatura atual
        try {
          const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
          const weatherData = await weatherRes.json();
          const temperature = weatherData.current_weather.temperature;
          document.getElementById('local-temp').textContent = `${temperature} °C`;
        } catch (weatherError) {
          document.getElementById('local-temp').textContent = 'Temp. indisponível';
        }

      } catch (error) {
        document.getElementById('user-location').textContent = 'Localização indisponível';
      }
    },
    function (error) {
      document.getElementById('user-location').textContent = 'Permissão negada';
    }
  );
} else {
  document.getElementById('user-location').textContent = 'Geolocalização não suportada';
}
