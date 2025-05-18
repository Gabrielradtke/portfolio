function atualizarDataHora() {
    const agora = new Date();
    const opcoes = {
      weekday: 'long', year: 'numeric', month: 'long',
      day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    const formatado = agora.toLocaleDateString('pt-BR', opcoes);
    document.getElementById('data-hora').textContent = formatado;
  }
  
  setInterval(atualizarDataHora, 1000); // Atualiza a cada segundo
  atualizarDataHora(); // Atualiza imediatamente ao carregar

  document.querySelector('.modo-cor').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  const idiomaBtn = document.querySelector('.modo-idioma');
  let idiomaAtual = 'pt';

  idiomaBtn.addEventListener('click', () => {
    idiomaAtual = idiomaAtual === 'pt' ? 'en' : 'pt';

    // Alterna imagem da bandeira
    idiomaBtn.src = idiomaAtual === 'pt' ? '/imagens/pt-br.png' : '/imagens/en-us.png';

    // Atualiza todos os textos com base nos atributos data-*
    document.querySelectorAll('[data-pt]').forEach(element => {
      element.textContent = element.getAttribute(`data-${idiomaAtual}`);
    });
  });

  document.querySelector('.modo-cor').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });