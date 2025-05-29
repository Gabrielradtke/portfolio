const idiomaBtn = document.querySelector('.modo-idioma');
const modoCorBtn = document.querySelector('.modo-cor');
let idiomaAtual = 'pt';
let modoEscuroAtivo = false;

idiomaBtn.addEventListener('click', () => {
  idiomaAtual = idiomaAtual === 'pt' ? 'en' : 'pt';
  idiomaBtn.src = idiomaAtual === 'pt' ? '/imagens/icons/pt-br.png' : '/imagens/icons/en-us.png';
  document.querySelectorAll('[data-pt]').forEach(element => {
    element.textContent = element.getAttribute(`data-${idiomaAtual}`);
  });
});

modoCorBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  modoEscuroAtivo = !modoEscuroAtivo;
  modoCorBtn.src = modoEscuroAtivo ? '/imagens/icons/sun.png' : '/imagens/icons/moon.png';
});

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