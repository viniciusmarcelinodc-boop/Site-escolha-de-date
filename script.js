// ===============================
// ESTADO GLOBAL
// ===============================

let escolhas = {
  iniciar: "",
  disponibilidade: "",
  principal: "",
  categoria: "",
  detalhe: "",
};

let historicoNavegacao = [];

// ===============================
// FLUXO COMPLETO
// ===============================

const fluxo = {
  // NOVA PRIMEIRA PERGUNTA
  inicio: {
    pergunta: "Quer iniciar nosso formulário de planos? 💌",
    campo: "iniciar",
    opcoes: [
      { texto: " Sim, meu lindo", proximo: "disponibilidade" },
      { texto: "Agora não 😅", proximo: "encerrar" },
    ],
  },

  // NOVA SEGUNDA PERGUNTA
  disponibilidade: {
    pergunta: "Qual dia você está disponível? 📅",
    campo: "disponibilidade",
    opcoes: [
      { texto: "Sábado", proximo: "principalEscolha" },
      { texto: "Domingo", proximo: "principalEscolha" },
    ],
  },

  // RESTO DO FLUXO
  principalEscolha: {
    pergunta: "Como você quer que seja nosso dia? 💫",
    campo: "principal",
    opcoes: [
      { texto: "🌿 Ar livre / Fitness", proximo: "arLivreTipo" },
      { texto: "🍷 Algo romântico", proximo: "romanticoTipo" },
      { texto: "🏠 Aconchegante em casa", proximo: "casaTipo" },
    ],
  },

  arLivreTipo: {
    pergunta: "Qual vibe ao ar livre? 🌅",
    campo: "categoria",
    opcoes: [
      { texto: "💪 Atividade física", proximo: "arLivreFitness" },
      { texto: "🌇 Romance ao ar livre", proximo: "arLivreRomance" },
    ],
  },

  arLivreFitness: {
    pergunta: "Escolhe nosso momento fitness 🛼",
    campo: "detalhe",
    opcoes: [
      { texto: "🛼 Andar de patins", proximo: "resumo" },
      { texto: "🏋️ Treinar juntos em academia nova", proximo: "resumo" },
    ],
  },

  arLivreRomance: {
    pergunta: "Qual parque combina com a gente? 🌳",
    campo: "detalhe",
    opcoes: [
      { texto: "Parque Ibirapuera", proximo: "resumo" },
      { texto: "CERET", proximo: "resumo" },
      { texto: "Parque Vila Lobos", proximo: "resumo" },
      { texto: "Parque Belém", proximo: "resumo" },
    ],
  },

  romanticoTipo: {
    pergunta: "Qual momento romântico? ✨",
    campo: "categoria",
    opcoes: [
      { texto: "🍽️ Almoço / Jantar", proximo: "romanticoJantar" },
      { texto: "☕ Cafeteria no centro", proximo: "resumo" },
    ],
  },

  romanticoJantar: {
    pergunta: "Escolhe o estilo 🍷",
    campo: "detalhe",
    opcoes: [
      { texto: "🌆 Rooftop", proximo: "resumo" },
      { texto: "🍝 Restaurante de massa", proximo: "resumo" },
      { texto: "🍔 Hamburgueria", proximo: "resumo" },
    ],
  },

  casaTipo: {
    pergunta: "Qual plano aconchegante? 🖤",
    campo: "categoria",
    opcoes: [
      { texto: "🎬 Cinema em casa", proximo: "casaCinema" },
      { texto: "🍳 Cozinhar juntos", proximo: "casaCozinha" },
    ],
  },

  casaCinema: {
    pergunta: "O que vamos assistir? 🍿",
    campo: "detalhe",
    opcoes: [
      { texto: "🎌 Ver anime", proximo: "resumo" },
      { texto: "📺 Netflix", proximo: "resumo" },
      { texto: "🎥 Outro streaming", proximo: "resumo" },
    ],
  },

  casaCozinha: {
    pergunta: "O que vamos preparar? 🍫",
    campo: "detalhe",
    opcoes: [
      { texto: "🍫 Brigadeiro", proximo: "resumo" },
      { texto: "📱 Receita do tico teco", proximo: "resumo" },
    ],
  },

  encerrar: {
    pergunta: "Tudo bem, nem queria mesmo 😤",
    campo: null,
    opcoes: [],
  },
};

// ===============================
// RENDERIZAÇÃO
// ===============================

function renderizar(etapa) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  if (etapa === "resumo") return mostrarResumo();

  const dados = fluxo[etapa];

  const pergunta = document.createElement("h2");
  pergunta.innerText = dados.pergunta;
  app.appendChild(pergunta);

  dados.opcoes.forEach((opcao) => {
    const botao = document.createElement("button");
    botao.innerText = opcao.texto;

    botao.onclick = () => {
      if (dados.campo) escolhas[dados.campo] = opcao.texto;
      historicoNavegacao.push(etapa);
      renderizar(opcao.proximo);
    };

    app.appendChild(botao);
  });

  if (historicoNavegacao.length > 0) {
    const voltar = document.createElement("button");
    voltar.innerText = "⬅ Voltar";
    voltar.onclick = () => {
      renderizar(historicoNavegacao.pop());
    };
    app.appendChild(voltar);
  }
}

// ===============================
// RESUMO
// ===============================

function mostrarResumo() {
  const app = document.getElementById("app");

  const registro = {
    disponibilidade: escolhas.disponibilidade,
    principal: escolhas.principal,
    categoria: escolhas.categoria,
    detalhe: escolhas.detalhe,
    data: new Date().toLocaleString(),
  };

  salvarRegistro(registro);

  app.innerHTML = `
    <h2>Então ta combinado ein</h2>
    <p><strong>Dia:</strong> ${registro.disponibilidade}</p>
    <p><strong>${registro.principal}</strong></p>
    <p>${registro.categoria}</p>
    <p>${registro.detalhe}</p>
    <p><em>${registro.data}</em></p>
    <button onclick="reiniciar()">Voltar ao início</button>
  `;
}

// ===============================
// LOCAL STORAGE
// ===============================

function salvarRegistro(registro) {
  let lista = JSON.parse(localStorage.getItem("historicoCompleto")) || [];
  lista.push(registro);
  localStorage.setItem("historicoCompleto", JSON.stringify(lista));
}

// ===============================
// 🔐 MODO ADMIN
// ===============================

function modoAdmin() {
  const senha = prompt("Digite a senha:");

  if (senha !== "admin123") {
    alert("Senha incorreta!");
    return;
  }

  let lista = JSON.parse(localStorage.getItem("historicoCompleto")) || [];
  const app = document.getElementById("app");

  app.innerHTML = "<h2>🔐 Painel Admin</h2>";

  lista.forEach((item) => {
    app.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin:10px;">
        <strong>${item.disponibilidade}</strong><br>
        ${item.principal}<br>
        ${item.categoria}<br>
        ${item.detalhe}<br>
        <em>${item.data}</em>
      </div>
    `;
  });

  app.innerHTML += `
    <button onclick="localStorage.removeItem('historicoCompleto'); location.reload();">
      🗑 Apagar tudo
    </button>
    <button onclick="reiniciar()">Voltar</button>
  `;
}

// ===============================
// REINICIAR
// ===============================

function reiniciar() {
  escolhas = {
    iniciar: "",
    disponibilidade: "",
    principal: "",
    categoria: "",
    detalhe: "",
  };
  historicoNavegacao = [];
  renderizar("inicio");
}

// ===============================
// INICIALIZAÇÃO
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.display = "flex";
  document.body.style.flexDirection = "column";
  document.body.style.alignItems = "center";
  document.body.style.justifyContent = "center";
  document.body.style.minHeight = "100vh";
  document.body.style.margin = "0";

  renderizar("inicio");

  const adminBtn = document.createElement("button");
  adminBtn.innerText = "🔐 Admin";
  adminBtn.onclick = modoAdmin;

  adminBtn.style.fontSize = "12px";
  adminBtn.style.padding = "4px 10px";
  adminBtn.style.position = "fixed";
  adminBtn.style.top = "10px";
  adminBtn.style.right = "10px";
  adminBtn.style.borderRadius = "6px";

  document.body.appendChild(adminBtn);
});
