// Protótipo da jornada do cliente, Archa. Sem backend: tudo acontece nesta página.
// Navegação por hash (#etapa-3, #acervo), setas do teclado, e estados de cada etapa.

(() => {
  const TOTAL = 6;
  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const $$ = (sel, raiz = document) => Array.from(raiz.querySelectorAll(sel));
  const desktop = () => matchMedia("(min-width: 1024px)").matches;

  // ---------- Escritórios fictícios ----------
  // Nada aqui é de um escritório real. "acervo" lista peças desenhadas em acervo-exemplo/.
  const ESCRITORIOS = {
    A: {
      nome: "Escritório Amostra",
      descricao: "Concreto aparente, aço e madeira escura. Casas e lofts com estrutura à vista.",
      projetos: [
        { titulo: "Casa com concreto e madeira", parede: "#b9b5ad", piso: "#6e5a44", movel: "#3b2f26", destaque: "#8a6d4b", tipo: "sala" },
        { titulo: "Cozinha de fórmica colorida", parede: "#e9e4d8", piso: "#8c7a63", movel: "#2f5d5b", destaque: "#d7a94b", tipo: "cozinha" },
        { titulo: "Loft com mezanino", parede: "#a7a39b", piso: "#5a4a3a", movel: "#1f1d1b", destaque: "#b57b4a", tipo: "loft" },
      ],
    },
    B: {
      nome: "Escritório Exemplo",
      descricao: "Carvalho claro, pedra cinza, latão e luz lateral. Projetos residenciais com cozinhas abertas para a sala.",
      assinatura: [
        ["Materiais", "Carvalho claro, pedra cinza, latão e plantas em vasos de barro"],
        ["Luz", "Lateral, de uma janela alta à esquerda"],
        ["Composição", "Frontal, um ponto de fuga, a parede do fundo como protagonista"],
        ["Programa", "Cozinhas abertas para a sala, com ilha para sentar"],
      ],
      acervo: [
        ["01-sala-de-estar", "Sala de estar"],
        ["02-cozinha-integrada", "Cozinha integrada"],
        ["03-quarto-de-casal", "Quarto de casal"],
        ["04-escritorio-em-casa", "Escritório em casa"],
        ["05-varanda", "Varanda"],
        ["06-banheiro", "Banheiro"],
        ["07-hall-de-entrada", "Hall de entrada"],
        ["08-sala-de-jantar", "Sala de jantar"],
      ],
      projetos: [
        { titulo: "Cozinha integrada com ilha de pedra", acervo: 1 },
        { titulo: "Sala com painel ripado e luz lateral", acervo: 0 },
        { titulo: "Quarto com cabeceira ripada", acervo: 2 },
      ],
    },
    C: {
      nome: "Escritório Ensaio",
      descricao: "Preto fosco, latão e madeira escura. Interiores urbanos com contraste forte.",
      assinatura: [
        ["Materiais", "Preto fosco, latão, madeira escura e ripado escuro"],
        ["Luz", "Lateral, com sombras marcadas"],
        ["Composição", "Frontal, um ponto de fuga, painel escuro ao fundo"],
        ["Programa", "Interiores urbanos, cozinhas com ilha escura"],
      ],
      acervo: [
        ["ensaio-01-sala-de-estar", "Sala de estar"],
        ["ensaio-02-cozinha-integrada", "Cozinha integrada"],
        ["ensaio-03-sala-de-jantar", "Sala de jantar"],
      ],
      projetos: [
        { titulo: "Loft com estrutura metálica", acervo: 0 },
        { titulo: "Sala com painel ripado escuro", acervo: 2 },
        { titulo: "Cozinha preta com ilha", acervo: 1 },
      ],
    },
  };

  // Ilustração abstrata de um interior (16:10), para o escritório sem acervo simulado.
  function interior(p) {
    const w = 400, h = 250;
    const esc = (hex, f) => {
      const n = parseInt(hex.slice(1), 16);
      const c = (v) => Math.min(255, Math.round(v * f));
      const r = c((n >> 16) & 255), g = c((n >> 8) & 255), b = c(n & 255);
      return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
    };
    let s = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${p.titulo}, ilustração de exemplo">`;
    s += `<rect width="${w}" height="${h}" fill="${p.parede}"/>`;
    s += `<polygon points="0,${h} ${w},${h} ${w - 70},170 70,170" fill="${p.piso}"/>`;
    s += `<polygon points="0,0 70,35 70,170 0,${h}" fill="${esc(p.parede, 0.9)}"/>`;
    s += `<polygon points="${w},0 ${w - 70},35 ${w - 70},170 ${w},${h}" fill="${esc(p.parede, 0.86)}"/>`;
    s += `<rect x="70" y="35" width="${w - 140}" height="135" fill="${esc(p.parede, 0.97)}"/>`;
    if (p.tipo === "cozinha") {
      s += `<rect x="90" y="105" width="220" height="65" fill="${p.movel}"/><rect x="90" y="99" width="220" height="8" fill="${p.destaque}"/>`;
      s += `<rect x="110" y="50" width="90" height="36" fill="${esc(p.parede, 0.82)}"/><rect x="114" y="54" width="82" height="28" fill="#cfe2f2"/>`;
      s += `<polygon points="130,200 290,200 300,232 120,232" fill="${p.movel}"/><polygon points="126,192 294,192 300,202 120,202" fill="${p.destaque}"/>`;
      for (const x of [160, 210, 260]) s += `<rect x="${x}" y="236" width="22" height="6" rx="3" fill="${esc(p.movel, 0.6)}"/>`;
    } else if (p.tipo === "sala") {
      s += `<rect x="120" y="52" width="160" height="70" fill="#cfe2f2"/><rect x="120" y="52" width="160" height="70" fill="none" stroke="${esc(p.parede, 0.8)}" stroke-width="6"/>`;
      s += `<rect x="110" y="172" width="180" height="46" rx="10" fill="${p.movel}"/><rect x="118" y="154" width="164" height="28" rx="8" fill="${esc(p.movel, 1.15)}"/>`;
      s += `<rect x="300" y="132" width="30" height="38" fill="${p.destaque}"/><ellipse cx="315" cy="118" rx="24" ry="28" fill="#5d7a4e"/>`;
      s += `<polygon points="140,232 260,232 262,244 138,244" fill="${p.destaque}"/>`;
    } else {
      s += `<rect x="70" y="35" width="${w - 140}" height="135" fill="url(#ripado-${p.destaque.slice(1)})"/>`;
      s += `<defs><pattern id="ripado-${p.destaque.slice(1)}" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="${esc(p.parede, 0.97)}"/><rect width="5" height="12" fill="${p.destaque}"/></pattern></defs>`;
      s += `<rect x="90" y="90" width="100" height="80" fill="${p.movel}"/><rect x="90" y="86" width="100" height="6" fill="${esc(p.movel, 1.4)}"/>`;
      s += `<rect x="210" y="118" width="120" height="52" fill="${esc(p.movel, 1.2)}"/>`;
      s += `<circle cx="300" cy="72" r="16" fill="${p.destaque}"/><line x1="300" y1="35" x2="300" y2="56" stroke="${p.movel}" stroke-width="2"/>`;
    }
    s += `<text x="12" y="${h - 10}" font-family="Exo 2, sans-serif" font-size="11" fill="#23263f" opacity=".7">ilustração de exemplo</text>`;
    s += `</svg>`;
    return s;
  }

  // ---------- Estado ----------
  const estado = {
    etapa: 1,
    escritorio: "B",
    escritorios: ["B", "C"], // escolhidos na etapa 3; o primeiro vem dos duelos
    opcao: 2,
    apresentacao: "Completa",
    preco: "R$ 1.000",
    votos: { A: 0, B: 0, C: 0 },
    duelo: 0,
    palco: "opcao", // opcao | video | dois
  };

  const OPCOES = [
    { n: 1, titulo: "Carvalho e pedra", partido: "Armários de carvalho claro, bancada e ilha com tampo de pedra cinza, pendentes de latão. A parede da sala vai embora; a janela fica.", arquivo: "imagens/opcao-1.png", materiais: ["Carvalho claro, armários", "Pedra cinza, bancada e ilha", "Latão, pendentes", "Taco da sala, mantido"] },
    { n: 2, titulo: "Ripado e prateleiras", partido: "Painel ripado de carvalho na parede do fundo, prateleiras de latão no lugar dos armários de cima e ilha de pedra para sentar.", arquivo: "imagens/opcao-2.png", materiais: ["Carvalho claro, painel ripado", "Pedra cinza, ilha", "Latão, prateleiras e pendentes", "Taco da sala, mantido"] },
    { n: 3, titulo: "Pedra até o teto", partido: "Revestimento de pedra cinza na parede do fundo, armários de pedra clara e ilha com tampo de carvalho. O piso de cerâmica fica.", arquivo: "imagens/opcao-3.png", materiais: ["Pedra cinza, parede do fundo", "Pedra clara, armários", "Carvalho claro, tampo da ilha", "Latão, pendentes"] },
  ];

  const ORDINAIS = ["", "uma", "duas", "três"];

  function aplicarEscritorio() {
    const e = ESCRITORIOS[estado.escritorio];
    $$("[data-escritorio]").forEach((el) => (el.textContent = e.nome));
    $$("[data-inicial]").forEach((el) => (el.textContent = e.nome.split(" ")[1][0]));
    $("#descricao-escritorio").textContent = e.descricao;
  }

  // ---------- Navegação ----------
  function ir(n, foco = true) {
    const acervo = n === "acervo";
    n = acervo ? 2 : Math.min(TOTAL, Math.max(1, Number(n) || 1));
    estado.etapa = n;
    $$(".tela").forEach((t) => {
      const ativa = acervo ? t.id === "tela-acervo" : Number(t.dataset.etapa) === n;
      t.hidden = !ativa;
      if (ativa) {
        t.style.animation = "none";
        void t.offsetWidth; // reinicia a transição de entrada
        t.style.animation = "";
      }
    });
    $$(".etapas__item").forEach((b) => {
      const k = Number(b.dataset.ir);
      if (k === n) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
      b.classList.toggle("etapas__item--feita", k < n);
    });
    $("#anterior").disabled = n === 1;
    $("#proxima").disabled = n === TOTAL;
    $("#posicao").firstChild.textContent = acervo ? "Acervo, etapa 2 " : `Etapa ${n} de ${TOTAL} `;
    const hash = acervo ? "#acervo" : `#etapa-${n}`;
    if (location.hash !== hash) history.replaceState(null, "", hash);
    if (!desktop()) window.scrollTo({ top: 0, behavior: "instant" });
    // chats abrem já no fim da conversa
    $$(".chat__fio").forEach((f) => { f.scrollTop = f.scrollHeight; });
    const ativo = $(".etapas__item[aria-current]");
    ativo?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    if (foco) $(acervo ? "#t-acervo" : `#t${n}`)?.focus?.({ preventScroll: true });
    document.title = acervo ? "Archa, acervo do escritório (protótipo de interface)" : `Archa, etapa ${n} de ${TOTAL} (protótipo de interface)`;
  }

  document.addEventListener("click", (ev) => {
    const alvo = ev.target.closest("[data-ir]");
    if (alvo) ir(alvo.dataset.ir);
  });
  $("#anterior").addEventListener("click", () => ir(estado.etapa - 1));
  $("#proxima").addEventListener("click", () => ir(estado.etapa + 1));
  document.addEventListener("keydown", (ev) => {
    if (ev.target.matches("input, textarea")) return;
    if (ev.key === "ArrowRight") ir(estado.etapa + 1);
    if (ev.key === "ArrowLeft") ir(estado.etapa - 1);
  });
  window.addEventListener("hashchange", () => {
    if (location.hash === "#acervo") return ir("acervo");
    const m = location.hash.match(/etapa-(\d)/);
    if (m && (Number(m[1]) !== estado.etapa || !$("#tela-acervo").hidden)) ir(m[1]);
  });
  $$("h1[id^='t']").forEach((h) => h.setAttribute("tabindex", "-1"));

  // ---------- Etapa 1: canal ----------
  $$("[data-canal]").forEach((b) =>
    b.addEventListener("click", () => {
      $$("[data-canal]").forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
      $(".chat__nome").textContent = b.dataset.canal === "whatsapp" ? "Agente Archa no WhatsApp" : "Agente Archa";
    }),
  );

  // ---------- Etapa 2: duelos, resultado e portfólios ----------
  const PARES = [
    ["A", 0, "B", 0],
    ["C", 0, "B", 1],
    ["A", 1, "C", 1],
  ];

  function figuraProjeto(sigla, p) {
    const e = ESCRITORIOS[sigla];
    return e.acervo
      ? `<img src="acervo-exemplo/${e.acervo[p.acervo][0]}.svg" alt="${p.titulo}, acervo simulado" width="1200" height="750">`
      : interior(p);
  }

  function cartaoProjeto(sigla, i) {
    const e = ESCRITORIOS[sigla];
    const p = e.projetos[i];
    return `<button class="projeto" type="button" data-sigla="${sigla}"><span class="projeto__figura">${figuraProjeto(sigla, p)}</span><span class="projeto__legenda"><strong>${p.titulo}</strong><span class="legenda">${e.nome}</span></span></button>`;
  }

  function renderDuelo() {
    const par = PARES[estado.duelo];
    $("#duelo-progresso").innerHTML = PARES.map((_, i) => `<span class="${i < estado.duelo ? "feito" : i === estado.duelo ? "atual" : ""}"></span>`).join("");
    const caixa = $("#duelo-par");
    caixa.innerHTML = cartaoProjeto(par[0], par[1]) + `<span class="duelo__ou" aria-hidden="true">ou</span>` + cartaoProjeto(par[2], par[3]);
    $$(".projeto", caixa).forEach((b) =>
      b.addEventListener("click", () => {
        if (caixa.dataset.travado) return;
        caixa.dataset.travado = "1";
        estado.votos[b.dataset.sigla] += 1;
        $$(".projeto", caixa).forEach((o) => o.classList.add(o === b ? "projeto--escolhido" : "projeto--perdeu"));
        setTimeout(() => {
          delete caixa.dataset.travado;
          estado.duelo += 1;
          if (estado.duelo >= PARES.length) mostrarResultado(); else renderDuelo();
        }, 420);
      }),
    );
  }

  function mostrarResultado() {
    const ordem = ["B", "A", "C"].sort((x, y) => estado.votos[y] - estado.votos[x]);
    estado.escritorio = ordem[0];
    if (!estado.escritorios.includes(estado.escritorio)) estado.escritorios = [estado.escritorio, ...estado.escritorios.filter((s) => s !== estado.escritorio)].slice(0, 2);
    aplicarEscritorio();
    renderAssinatura();
    renderEscritorios();
    const max = Math.max(1, ...Object.values(estado.votos));
    $("#afinidade").innerHTML = ordem
      .map((s) => `<li><strong>${ESCRITORIOS[s].nome}</strong><span class="barra"><i style="transform:scaleX(${Math.max(0.12, estado.votos[s] / max)})"></i></span></li>`)
      .join("");
    $("#duelo").hidden = true;
    $("#duelo-resultado").hidden = false;
  }

  function renderAssinatura() {
    const e = ESCRITORIOS[estado.escritorio];
    $("#assinatura-pecas").innerHTML = (e.acervo || []).slice(0, 3)
      .map(([a, t]) => `<img src="acervo-exemplo/${a}.svg" alt="${t}, acervo simulado" width="1200" height="750" loading="lazy">`)
      .join("");
    $("#assinatura-ficha").innerHTML = (e.assinatura || [["Assinatura", e.descricao]])
      .map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`)
      .join("");
  }

  $("#refazer-duelos").addEventListener("click", () => {
    estado.votos = { A: 0, B: 0, C: 0 };
    estado.duelo = 0;
    $("#duelo").hidden = false;
    $("#duelo-resultado").hidden = true;
    renderDuelo();
  });

  function renderPortfolios() {
    $("#portfolios").innerHTML = Object.entries(ESCRITORIOS)
      .map(
        ([sigla, e]) => `<div class="portfolio cartao">
          <div class="portfolio__grade">${e.acervo
            ? e.acervo.slice(0, 3).map(([a, t]) => `<img src="acervo-exemplo/${a}.svg" alt="${t}, acervo simulado" width="1200" height="750">`).join("")
            : e.projetos.map(interior).join("")}</div>
          <div><h3 class="cartao__titulo">${e.nome}</h3><p class="legenda" style="margin-top:4px">${e.descricao}</p>${e.acervo ? "" : '<p class="exemplo" style="margin-top:4px">Ilustrações de exemplo, sem acervo simulado</p>'}</div>
          <div class="acoes" style="margin-top:0">
            <button class="botao botao--contorno botao--pequeno" type="button" data-portfolio="${sigla}">Pedir apresentação</button>
            ${sigla === "B" ? '<button class="botao botao--contorno botao--pequeno" type="button" data-ir="acervo">Ver o acervo</button>' : ""}
          </div>
        </div>`,
      )
      .join("");
    $$("[data-portfolio]").forEach((b) =>
      b.addEventListener("click", () => {
        estado.escritorio = b.dataset.portfolio;
        if (!estado.escritorios.includes(estado.escritorio)) estado.escritorios = [estado.escritorio, ...estado.escritorios].slice(0, 2);
        aplicarEscritorio();
        renderEscritorios();
        ir(3);
      }),
    );
  }

  $$("[role=tab]").forEach((tab) =>
    tab.addEventListener("click", () => {
      $$("[role=tab]").forEach((t) => {
        const sel = t === tab;
        t.setAttribute("aria-selected", String(sel));
        $(`#${t.getAttribute("aria-controls")}`).hidden = !sel;
      });
    }),
  );

  // ---------- Etapa 3: pagamento ----------
  function renderEscritorios() {
    $("#escritorios").innerHTML = ["B", "C", "A"]
      .map((s) => {
        const e = ESCRITORIOS[s];
        const ligado = estado.escritorios.includes(s);
        return `<button class="pilula" type="button" data-escolher="${s}" aria-pressed="${ligado}"><span class="pilula__inicial" aria-hidden="true">${e.nome.split(" ")[1][0]}</span>${e.nome.split(" ")[1]}${s === estado.escritorio ? '<span class="legenda" style="color:inherit;opacity:.75">pelos seus duelos</span>' : ""}</button>`;
      })
      .join("");
    $$("[data-escolher]").forEach((b) =>
      b.addEventListener("click", () => {
        const s = b.dataset.escolher;
        if (estado.escritorios.includes(s)) {
          if (estado.escritorios.length === 1) return; // ao menos um
          estado.escritorios = estado.escritorios.filter((x) => x !== s);
        } else {
          estado.escritorios.push(s);
        }
        renderEscritorios();
      }),
    );
    atualizarResumo();
  }

  function atualizarResumo() {
    const n = estado.escritorios.length;
    const nomes = estado.escritorios.map((s) => ESCRITORIOS[s].nome.split(" ")[1]);
    $("#resumo-escritorios").textContent = nomes.length === 1 ? nomes[0] : nomes.slice(0, -1).join(", ") + " e " + nomes[nomes.length - 1];
    $("#resumo-apresentacao").textContent = estado.apresentacao;
    $("#resumo-preco-unitario").textContent = estado.preco;
    $("#resumo-preco").textContent = n === 1 ? estado.preco : `${ORDINAIS[n][0].toUpperCase()}${ORDINAIS[n].slice(1)} apresentações de ${estado.preco}`;
    $("#pagar-rotulo").textContent = n === 1 ? `Pagar ${estado.preco}` : `Pagar as ${ORDINAIS[n]} apresentações`;
  }

  $$("input[name=apresentacao]").forEach((r) =>
    r.addEventListener("change", () => {
      estado.apresentacao = r.value;
      estado.preco = r.dataset.preco;
      atualizarResumo();
      renderMiniaturas();
    }),
  );
  $$(".segmentado button").forEach((b) =>
    b.addEventListener("click", () => {
      $$("button", b.parentElement).forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
      if (b.dataset.selo) aplicarSelo(b.dataset.selo);
    }),
  );
  $("#pagar").addEventListener("click", () => {
    $("#pagamento-form").hidden = true;
    $("#pagamento-feito").hidden = false;
    const itens = $$("#geracao li");
    itens.forEach((li) => li.classList.remove("andando", "feito"));
    itens[3].hidden = estado.apresentacao === "Essencial";
    const visiveis = itens.filter((li) => !li.hidden);
    $("#ver-apresentacoes").disabled = true;
    let i = 0;
    const passo = () => {
      if (i > 0) visiveis[i - 1].classList.replace("andando", "feito");
      if (i < visiveis.length) {
        visiveis[i].classList.add("andando");
        i += 1;
        setTimeout(passo, 900);
      } else {
        $("#ver-apresentacoes").disabled = false;
        $("#ver-apresentacoes").focus();
      }
    };
    passo();
  });

  // ---------- Etapa 4: palco ----------
  function renderMiniaturas() {
    const comVideo = estado.apresentacao !== "Essencial";
    const rotuloVideo = estado.apresentacao === "Premium" ? "Vídeo de 3 min narrado" : "Vídeo de 60 s";
    $("#miniaturas").innerHTML =
      OPCOES.map(
        (o) => `<button class="miniatura" type="button" data-opcao="${o.n}" aria-pressed="${estado.palco === "opcao" && o.n === estado.opcao}"><img src="${o.arquivo}" alt="" width="1600" height="1000"><span>Opção ${o.n}<b>${o.titulo}</b></span></button>`,
      ).join("") +
      (comVideo
        ? `<button class="miniatura" type="button" data-video aria-pressed="${estado.palco === "video"}"><img src="${OPCOES[estado.opcao - 1].arquivo}" alt="" width="1600" height="1000"><span class="miniatura__play" aria-hidden="true"><svg><use href="#i-play"/></svg></span><span>Vídeo<b>${rotuloVideo}</b></span></button>`
        : "");
    $$("[data-opcao]").forEach((b) => b.addEventListener("click", () => escolherOpcao(Number(b.dataset.opcao))));
    $("[data-video]")?.addEventListener("click", mostrarVideo);
  }

  function modoPalco(modo) {
    estado.palco = modo;
    const v = $("#video");
    $("#palco-dois").hidden = modo !== "dois";
    $("#museu-opcoes").hidden = modo === "dois";
    $("#museu-dois").hidden = modo !== "dois";
    $("#ver-dois").setAttribute("aria-pressed", String(modo === "dois"));
    $("#ver-dois-rotulo").textContent = modo === "dois" ? "Voltar às opções" : "Dois escritórios";
    $("#ver-antes").hidden = modo === "dois";
    $("#video-play").hidden = modo !== "video";
    $("#video-poster").hidden = modo !== "video";
    $("#palco-rotulo").hidden = modo !== "video";
    if (modo !== "video") {
      v.hidden = true;
      v.pause?.();
      $("#video-poster").classList.remove("animando");
    }
    $$("[data-opcao]").forEach((b) => b.setAttribute("aria-pressed", String(modo === "opcao" && Number(b.dataset.opcao) === estado.opcao)));
    $("[data-video]")?.setAttribute("aria-pressed", String(modo === "video"));
  }

  function escolherOpcao(n) {
    estado.opcao = n;
    const o = OPCOES[n - 1];
    $("#palco-opcao").src = o.arquivo;
    $("#palco-opcao").alt = `Opção ${n}: a cozinha do cliente no estilo do escritório`;
    $("#museu-opcao").textContent = `Opção ${n}`;
    $("#museu-titulo").textContent = o.titulo;
    $("#museu-partido").textContent = o.partido;
    $("#materiais").innerHTML = o.materiais.map((m) => `<li>${m}</li>`).join("");
    $("#video").poster = o.arquivo;
    $("#video-poster").src = o.arquivo;
    $("#dois-exemplo").src = o.arquivo;
    $("#escolher-opcao").textContent = `Escolher a opção ${n} e pedir um ajuste`;
    $("#ajuste-opcao-nome").textContent = `opção ${n}`;
    $("#ajuste-opcao-nome-2").textContent = `opção ${n}`;
    $("#comparacao-antes").src = o.arquivo;
    $("#comparacao-antes-legenda").textContent = `Opção ${n}, ${o.titulo}`;
    $("#ajuste-aviso").hidden = n === 2;
    $("#ver-antes").setAttribute("aria-pressed", "false");
    $("#ver-antes-rotulo").textContent = "Ver o espaço atual";
    $("#palco-antes").classList.remove("visivel");
    const vid = $("[data-video] img");
    if (vid) vid.src = o.arquivo;
    modoPalco("opcao");
  }

  $("#ver-antes").addEventListener("click", (ev) => {
    const b = ev.currentTarget;
    const ligado = b.getAttribute("aria-pressed") !== "true";
    if (estado.palco === "video") modoPalco("opcao");
    b.setAttribute("aria-pressed", String(ligado));
    $("#ver-antes-rotulo").textContent = ligado ? "Voltar para a opção" : "Ver o espaço atual";
    $("#palco-antes").classList.toggle("visivel", ligado);
    $("#palco-antes").setAttribute("aria-hidden", String(!ligado));
  });

  $("#ver-dois").addEventListener("click", () => modoPalco(estado.palco === "dois" ? "opcao" : "dois"));

  function mostrarVideo() {
    modoPalco("video");
    $("#palco-rotulo").textContent = estado.apresentacao === "Premium" ? "Vídeo de 3 min narrado, apresentação Premium" : "Vídeo de 60 s, apresentação Completa";
  }

  $("#video-play").addEventListener("click", () => {
    const v = $("#video");
    const poster = $("#video-poster");
    const play = $("#video-play");
    play.hidden = true;
    v.hidden = false;
    v.controls = true;
    v.addEventListener("error", simular, { once: true });
    if (!v.getAttribute("src")) v.src = v.dataset.src; // só pede o arquivo no play, para não gerar 404 ao abrir a página
    v.play().catch(simular);
    function simular() {
      v.hidden = true;
      v.controls = false;
      poster.classList.remove("animando");
      void poster.offsetWidth;
      poster.classList.add("animando");
      const semMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;
      $("#video-nota").textContent = semMovimento
        ? "Simulação: imagens/video.mp4 ainda não existe. Com movimento reduzido, nada é animado."
        : "Simulação: imagens/video.mp4 ainda não existe. O percurso acima é uma animação sobre a imagem, não o vídeo gerado.";
      setTimeout(() => { if (estado.palco === "video") play.hidden = false; }, semMovimento ? 0 : 12000);
    }
    v.addEventListener("ended", () => { play.hidden = false; v.hidden = true; }, { once: true });
  });

  function renderReferencias() {
    const e = ESCRITORIOS.B;
    $("#referencias").innerHTML = [1, 0, 7]
      .map((i) => `<figure><img src="acervo-exemplo/${e.acervo[i][0]}.svg" alt="${e.acervo[i][1]}, acervo simulado" width="1200" height="750" loading="lazy"><figcaption>${e.acervo[i][1]}</figcaption></figure>`)
      .join("");
  }

  // ---------- Etapa 5: selo ----------
  function aplicarSelo(modo) {
    const selo = $("#selo");
    const nome = ESCRITORIOS[estado.escritorio].nome;
    selo.classList.toggle("selo--instantaneo", modo === "instantaneo");
    selo.classList.toggle("selo--prazo", modo === "prazo");
    if (modo === "instantaneo") {
      $("#selo-marca").innerHTML = '<svg aria-hidden="true"><use href="#i-check"/></svg>';
      $("#selo-titulo").innerHTML = `Aprovado pelo <span data-escritorio>${nome}</span>`;
      $("#selo-sub").textContent = "Selo de aprovação instantânea";
      $("#selo-texto").textContent = "O escritório autorizou a Archa a aprovar na hora apresentações geradas no estilo dele. A assinatura do autor vai junto com a imagem.";
    } else {
      $("#selo-marca").innerHTML = '<svg aria-hidden="true"><use href="#i-relogio"/></svg>';
      $("#selo-titulo").innerHTML = `Em análise pelo <span data-escritorio>${nome}</span>`;
      $("#selo-sub").textContent = "Aprovação com prazo";
      $("#selo-texto").textContent = "O escritório prefere revisar cada apresentação antes de assinar. Você recebe a resposta em até uma semana, e pode continuar ajustando enquanto espera.";
    }
  }

  // ---------- Etapa 6 ----------
  $("#falar").addEventListener("click", () => {
    $("#contato-acoes").hidden = true;
    $("#contato-feito").hidden = false;
  });

  // ---------- Acervo ----------
  function renderAcervo() {
    const e = ESCRITORIOS.B;
    $("#acervo-grade").innerHTML = e.acervo
      .map(([a, t]) => `<figure><img src="acervo-exemplo/${a}.svg" alt="${t}, acervo simulado" width="1200" height="750" loading="lazy"><figcaption>${t}</figcaption></figure>`)
      .join("");
  }

  // ---------- Início ----------
  aplicarEscritorio();
  renderAssinatura();
  renderDuelo();
  renderPortfolios();
  renderEscritorios();
  renderAcervo();
  renderReferencias();
  renderMiniaturas();
  escolherOpcao(2);
  if (location.hash === "#acervo" || /\/acervo\.html$/.test(location.pathname)) {
    ir("acervo", false);
  } else {
    const m = location.hash.match(/etapa-(\d)/) || location.pathname.match(/etapa-(\d)\.html$/);
    ir(m ? m[1] : 1, false);
  }
})();
