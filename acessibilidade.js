(function () {

  /* ══════════════════════════════════════════
     1. ESTILOS — injeta <style> no <head>
  ══════════════════════════════════════════ */
  const style = document.createElement('style');
  style.textContent = `
    #acesso-btn {
      position: fixed;
      bottom: 32px;
      right: 32px;
      z-index: 9998;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #c0395a;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 18px rgba(192,57,90,0.38);
      transition: transform 0.2s, background 0.2s;
      outline: none;
    }
    #acesso-btn:hover,
    #acesso-btn:focus-visible {
      background: #a02a48;
      transform: scale(1.1);
    }
    #acesso-btn svg {
      width: 30px;
      height: 30px;
      fill: #fff;
      pointer-events: none;
    }
    #acesso-btn::after {
      content: "Acessibilidade";
      position: absolute;
      right: 66px;
      top: 50%;
      transform: translateY(-50%);
      background: #1a1a1a;
      color: #fff;
      font-family: 'Segoe UI', sans-serif;
      font-size: 13px;
      padding: 6px 12px;
      border-radius: 6px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }
    #acesso-btn:hover::after,
    #acesso-btn:focus-visible::after {
      opacity: 1;
    }

    #acesso-painel {
      position: fixed;
      bottom: 100px;
      right: 32px;
      z-index: 9999;
      width: 300px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.18);
      font-family: 'Segoe UI', Arial, sans-serif;
      overflow: hidden;
      transform: scale(0.85) translateY(20px);
      transform-origin: bottom right;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s, transform 0.25s;
    }
    #acesso-painel.aberto {
      opacity: 1;
      transform: scale(1) translateY(0);
      pointer-events: all;
    }
    .ac-header {
      background: #c0395a;
      color: #fff;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .ac-header span {
      font-size: 15px;
      font-weight: 700;
      letter-spacing: .02em;
    }
    .ac-fechar {
      background: none;
      border: none;
      color: #fff;
      font-size: 22px;
      cursor: pointer;
      line-height: 1;
      padding: 0 2px;
      opacity: .8;
      transition: opacity .15s;
    }
    .ac-fechar:hover { opacity: 1; }

    .ac-body {
      padding: 14px 16px 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .ac-secao {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .08em;
      color: #999;
      margin: 4px 0 2px;
    }
    .ac-opcoes {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .ac-op {
      background: #f5f4f6;
      border: 1.5px solid transparent;
      border-radius: 10px;
      padding: 10px 8px 8px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      font-size: 12px;
      color: #333;
      font-weight: 600;
      transition: background .15s, border-color .15s, color .15s;
      text-align: center;
      line-height: 1.3;
      min-height: 68px;
    }
    .ac-op svg {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }
    .ac-op:hover {
      background: #fde8ee;
      border-color: #e88fa4;
    }
    .ac-op.ativo {
      background: #fde8ee;
      border-color: #c0395a;
      color: #a02a48;
    }
    .ac-op.ativo svg { color: #c0395a; }

    .ac-fonte-ctrl {
      display: flex;
      align-items: center;
      background: #f5f4f6;
      border-radius: 10px;
      overflow: hidden;
    }
    .ac-fonte-ctrl button {
      background: none;
      border: none;
      width: 44px;
      height: 42px;
      font-size: 20px;
      cursor: pointer;
      color: #555;
      transition: background .15s, color .15s;
      font-weight: 700;
    }
    .ac-fonte-ctrl button:hover {
      background: #fde8ee;
      color: #c0395a;
    }
    .ac-fonte-ctrl span {
      flex: 1;
      text-align: center;
      font-size: 13px;
      font-weight: 600;
      color: #444;
    }

    .ac-reset {
      width: 100%;
      padding: 9px;
      border-radius: 8px;
      border: 1.5px solid #ddd;
      background: #fff;
      font-size: 13px;
      font-weight: 600;
      color: #666;
      cursor: pointer;
      transition: background .15s, border-color .15s, color .15s;
    }
    .ac-reset:hover {
      background: #fde8ee;
      border-color: #c0395a;
      color: #a02a48;
    }

    #ac-leitura-barra {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10000;
      background: #1a1a1a;
      color: #fff;
      font-family: 'Segoe UI', sans-serif;
      font-size: 15px;
      padding: 10px 20px;
      display: none;
      align-items: center;
      gap: 12px;
      box-shadow: 0 -3px 16px rgba(0,0,0,0.3);
    }
    #ac-leitura-barra.visivel { display: flex; }
    #ac-leitura-texto {
      flex: 1;
      font-size: 14px;
      opacity: .9;
    }
    #ac-leitura-barra button {
      background: #c0395a;
      border: none;
      color: #fff;
      border-radius: 6px;
      padding: 6px 14px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 700;
    }
    #ac-leitura-barra button:hover { background: #a02a48; }

    body.ac-cursor-ampliado,
    body.ac-cursor-ampliado * {
      cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='8' cy='8' r='7' fill='%23c0395a' stroke='%23fff' stroke-width='2'/%3E%3Cline x1='8' y1='0' x2='8' y2='16' stroke='%23fff' stroke-width='2'/%3E%3Cline x1='0' y1='8' x2='16' y2='8' stroke='%23fff' stroke-width='2'/%3E%3C/svg%3E") 8 8, crosshair !important;
    }

    body.ac-alto-contraste *:not(#acesso-painel):not(#acesso-painel *):not(#acesso-btn):not(#ac-leitura-barra):not(#ac-leitura-barra *) {
      background: #000 !important;
      color: #fff !important;
      border-color: #fff !important;
      text-shadow: none !important;
    }
    body.ac-alto-contraste a:not(#acesso-painel a) { color: #ff0 !important; }
    body.ac-alto-contraste img:not(#acesso-painel img) {
      filter: grayscale(1) contrast(1.5) !important;
    }

    body.ac-mono *:not(#acesso-painel):not(#acesso-painel *):not(#acesso-btn):not(#ac-leitura-barra):not(#ac-leitura-barra *) {
      filter: grayscale(1) !important;
    }

    body.ac-espacado *:not(#acesso-painel):not(#acesso-painel *):not(#acesso-btn) {
      letter-spacing: .12em !important;
      word-spacing: .25em !important;
      line-height: 2 !important;
    }

    .ac-leitura-destaque {
      outline: 3px solid #c0395a !important;
      background: #fde8ee !important;
      color: #1a1a1a !important;
      border-radius: 4px;
    }
  `;
  document.head.appendChild(style);


  /* ══════════════════════════════════════════
     2. HTML — injeta botão + painel + barra no <body>
  ══════════════════════════════════════════ */
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `

    <!-- BOTÃO FLUTUANTE -->
    <button id="acesso-btn"
            aria-label="Abrir menu de acessibilidade"
            aria-expanded="false"
            aria-controls="acesso-painel">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="4" r="2"/>
        <path d="M20 8H4l2 6h3l1 6h4l1-6h3z"/>
      </svg>
    </button>

    <!-- PAINEL -->
    <div id="acesso-painel"
         role="dialog"
         aria-label="Opções de acessibilidade"
         aria-modal="true">

      <div class="ac-header">
        <span>&#9851; Acessibilidade</span>
        <button class="ac-fechar" id="ac-fechar-btn" aria-label="Fechar menu">&times;</button>
      </div>

      <div class="ac-body">

        <p class="ac-secao">Visualização</p>
        <div class="ac-opcoes">

          <button class="ac-op" id="op-contraste" aria-pressed="false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2v20M2 12h20" stroke-dasharray="2 2"/>
              <path d="M12 2a10 10 0 0 1 0 20V2z" fill="currentColor" stroke="none"/>
            </svg>
            Alto contraste
          </button>

          <button class="ac-op" id="op-mono" aria-pressed="false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 12h8M8 8h8M8 16h5"/>
            </svg>
            Monocromia
          </button>

          <button class="ac-op" id="op-cursor" aria-pressed="false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M4 4l7 18 3-7 7-3z"/>
              <circle cx="17" cy="17" r="3"/>
            </svg>
            Cursor ampliado
          </button>

          <button class="ac-op" id="op-espacado" aria-pressed="false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M4 8h16M4 12h16M4 16h10"/>
              <path d="M20 4v16" stroke-dasharray="2 2"/>
            </svg>
            Espaç. de texto
          </button>

        </div>

        <p class="ac-secao">Tamanho da fonte</p>
        <div class="ac-fonte-ctrl">
          <button id="ac-fonte-menos" aria-label="Diminuir fonte">A&#8722;</button>
          <span id="ac-fonte-label">100%</span>
          <button id="ac-fonte-mais" aria-label="Aumentar fonte">A+</button>
        </div>

        <p class="ac-secao">Leitor de tela</p>
        <div class="ac-opcoes" style="grid-template-columns:1fr;">
          <button class="ac-op" id="op-leitor" aria-pressed="false"
                  style="flex-direction:row;justify-content:center;gap:10px;min-height:auto;padding:10px 14px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                 width="22" height="22" aria-hidden="true">
              <path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2z"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              <path d="M17 8s1.5 1.2 1.5 3S17 14 17 14" stroke-linecap="round"/>
              <path d="M19.5 6.5S22 8.3 22 11s-2.5 4.5-2.5 4.5" stroke-linecap="round"/>
            </svg>
            Leitor de tela
          </button>
        </div>

        <button class="ac-reset" id="ac-reset-btn">&#8634; Redefinir tudo</button>

      </div>
    </div>

    <!-- BARRA DO LEITOR -->
    <div id="ac-leitura-barra" role="status" aria-live="polite">
      <span>&#128266;</span>
      <span id="ac-leitura-texto">Clique em um texto da página para ouvi-lo.</span>
      <button id="ac-parar-btn">&#9632; Parar</button>
    </div>
  `;
  document.body.appendChild(wrapper);


  /* ══════════════════════════════════════════
     3. LÓGICA — JavaScript do widget
  ══════════════════════════════════════════ */
  let fonteNivel  = 0;
  const passoFonte = 10;
  let leitorAtivo  = false;

  const btnAbrir  = document.getElementById('acesso-btn');
  const painel    = document.getElementById('acesso-painel');
  const btnFechar = document.getElementById('ac-fechar-btn');
  const btnReset  = document.getElementById('ac-reset-btn');
  const btnMenos  = document.getElementById('ac-fonte-menos');
  const btnMais   = document.getElementById('ac-fonte-mais');
  const btnLeitor = document.getElementById('op-leitor');
  const btnParar  = document.getElementById('ac-parar-btn');
  const barraLeit = document.getElementById('ac-leitura-barra');
  const textoLeit = document.getElementById('ac-leitura-texto');
  const labelFont = document.getElementById('ac-fonte-label');

  /* — abrir / fechar painel — */
  function abrirPainel() {
    painel.classList.add('aberto');
    btnAbrir.setAttribute('aria-expanded', 'true');
    btnFechar.focus();
  }
  function fecharPainel() {
    painel.classList.remove('aberto');
    btnAbrir.setAttribute('aria-expanded', 'false');
    btnAbrir.focus();
  }
  btnAbrir.addEventListener('click', function () {
    painel.classList.contains('aberto') ? fecharPainel() : abrirPainel();
  });
  btnFechar.addEventListener('click', fecharPainel);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && painel.classList.contains('aberto')) fecharPainel();
  });

  /* — toggle de recurso — */
  function acToggle(classe, idBtn) {
    var ativo = document.body.classList.toggle('ac-' + classe);
    var opBtn = document.getElementById(idBtn);
    opBtn.classList.toggle('ativo', ativo);
    opBtn.setAttribute('aria-pressed', String(ativo));
    salvarEstado();
  }
  document.getElementById('op-contraste').addEventListener('click', function () { acToggle('alto-contraste', 'op-contraste'); });
  document.getElementById('op-mono').addEventListener('click',      function () { acToggle('mono',           'op-mono');      });
  document.getElementById('op-cursor').addEventListener('click',    function () { acToggle('cursor-ampliado','op-cursor');    });
  document.getElementById('op-espacado').addEventListener('click',  function () { acToggle('espacado',       'op-espacado');  });

  /* — tamanho da fonte — */
  function aplicarFonte() {
    var pct = 100 + fonteNivel * passoFonte;
    document.documentElement.style.fontSize = pct + '%';
    labelFont.textContent = pct + '%';
    salvarEstado();
  }
  btnMenos.addEventListener('click', function () {
    if (fonteNivel > -3) { fonteNivel--; aplicarFonte(); }
  });
  btnMais.addEventListener('click', function () {
    if (fonteNivel < 5) { fonteNivel++; aplicarFonte(); }
  });

  /* — leitor de tela — */
  function leitorHover(e) {
    if (!leitorAtivo) return;
    var el = e.target.closest('p,h1,h2,h3,h4,h5,h6,a,li,span,button,label,td,th');
    if (!el || el.closest('#acesso-painel') || el.closest('#ac-leitura-barra')) return;
    document.querySelectorAll('.ac-leitura-destaque').forEach(function (x) {
      x.classList.remove('ac-leitura-destaque');
    });
    el.classList.add('ac-leitura-destaque');
  }

  function leitorClick(e) {
    if (!leitorAtivo) return;
    var el = e.target.closest('p,h1,h2,h3,h4,h5,h6,a,li,span,button,label,td,th');
    if (!el || el.closest('#acesso-painel') || el.closest('#ac-leitura-barra')) return;
    e.preventDefault();
    e.stopPropagation();
    var txt = (el.innerText || el.textContent || '').trim();
    if (!txt) return;
    falar(txt);
  }

  function falar(texto) {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta síntese de voz.');
      return;
    }
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(texto);
    u.lang = 'pt-BR';
    u.rate = 0.95;
    textoLeit.textContent = texto.length > 80 ? texto.slice(0, 80) + '…' : texto;
    window.speechSynthesis.speak(u);
  }

  function pararLeitura() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    textoLeit.textContent = 'Clique em um texto da página para ouvi-lo.';
    document.querySelectorAll('.ac-leitura-destaque').forEach(function (x) {
      x.classList.remove('ac-leitura-destaque');
    });
  }

  btnLeitor.addEventListener('click', function () {
    leitorAtivo = !leitorAtivo;
    btnLeitor.classList.toggle('ativo', leitorAtivo);
    btnLeitor.setAttribute('aria-pressed', String(leitorAtivo));
    barraLeit.classList.toggle('visivel', leitorAtivo);
    if (leitorAtivo) {
      document.addEventListener('click',     leitorClick, true);
      document.addEventListener('mouseover', leitorHover);
    } else {
      pararLeitura();
      document.removeEventListener('click',     leitorClick, true);
      document.removeEventListener('mouseover', leitorHover);
    }
  });

  btnParar.addEventListener('click', pararLeitura);

  /* — reset — */
  btnReset.addEventListener('click', function () {
    ['alto-contraste', 'mono', 'cursor-ampliado', 'espacado'].forEach(function (c) {
      document.body.classList.remove('ac-' + c);
    });
    ['op-contraste', 'op-mono', 'op-cursor', 'op-espacado', 'op-leitor'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.classList.remove('ativo'); el.setAttribute('aria-pressed', 'false'); }
    });
    fonteNivel = 0;
    document.documentElement.style.fontSize = '';
    labelFont.textContent = '100%';
    if (leitorAtivo) {
      leitorAtivo = false;
      barraLeit.classList.remove('visivel');
      pararLeitura();
      document.removeEventListener('click',     leitorClick, true);
      document.removeEventListener('mouseover', leitorHover);
    }
    try { localStorage.removeItem('yab_acessibilidade'); } catch (e) {}
  });

  /* — persistência localStorage — */
  function salvarEstado() {
    try {
      localStorage.setItem('yab_acessibilidade', JSON.stringify({
        nivel:     fonteNivel,
        contraste: document.body.classList.contains('ac-alto-contraste'),
        mono:      document.body.classList.contains('ac-mono'),
        cursor:    document.body.classList.contains('ac-cursor-ampliado'),
        espacado:  document.body.classList.contains('ac-espacado')
      }));
    } catch (e) {}
  }

  function carregarEstado() {
    try {
      var raw = localStorage.getItem('yab_acessibilidade');
      if (!raw) return;
      var s = JSON.parse(raw);
      if (s.contraste) acToggle('alto-contraste', 'op-contraste');
      if (s.mono)      acToggle('mono',           'op-mono');
      if (s.cursor)    acToggle('cursor-ampliado','op-cursor');
      if (s.espacado)  acToggle('espacado',       'op-espacado');
      if (s.nivel && s.nivel !== 0) {
        fonteNivel = s.nivel;
        aplicarFonte();
      }
    } catch (e) {}
  }

  carregarEstado();

})();