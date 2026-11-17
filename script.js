/* =========================================
   SOL + ÁGUA
   JAVASCRIPT PRINCIPAL
========================================= */


/* =========================================
   1. MENU RESPONSIVO
========================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const aberto = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!aberto));
    mainNav.classList.toggle("active", !aberto);
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}


/* =========================================
   2. ACESSIBILIDADE
========================================= */

let tamanhoFonte = 100;

const fontUp = document.getElementById("fontUp");
const fontDown = document.getElementById("fontDown");
const fontReset = document.getElementById("fontReset");

function atualizarFonte() {
  document.documentElement.style.fontSize = tamanhoFonte + "%";
}

fontUp?.addEventListener("click", () => {
  tamanhoFonte = Math.min(tamanhoFonte + 10, 150);
  atualizarFonte();
});

fontDown?.addEventListener("click", () => {
  tamanhoFonte = Math.max(tamanhoFonte - 10, 80);
  atualizarFonte();
});

fontReset?.addEventListener("click", () => {
  tamanhoFonte = 100;
  atualizarFonte();
});


/* ALTO CONTRASTE */

const contrastToggle = document.getElementById("contrastToggle");

contrastToggle?.addEventListener("click", () => {
  const ativo = document.body.classList.toggle("high-contrast");

  contrastToggle.setAttribute("aria-pressed", String(ativo));
});


/* FONTE DE LEITURA */

const dyslexiaToggle = document.getElementById("dyslexiaToggle");

dyslexiaToggle?.addEventListener("click", () => {
  const ativo = document.body.classList.toggle("reading-font");

  dyslexiaToggle.setAttribute("aria-pressed", String(ativo));
});


/* ESPAÇAMENTO */

const spacingToggle = document.getElementById("spacingToggle");

spacingToggle?.addEventListener("click", () => {
  const ativo = document.body.classList.toggle("wide-spacing");

  spacingToggle.setAttribute("aria-pressed", String(ativo));
});


/* =========================================
   3. LEITURA EM ÁUDIO
========================================= */

const readPage = document.getElementById("readPage");
const stopRead = document.getElementById("stopRead");

readPage?.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) {
    alert("Seu navegador não oferece suporte à leitura em voz alta.");
    return;
  }

  window.speechSynthesis.cancel();

  const conteudo = document.getElementById("conteudo");
  const texto = conteudo.innerText;

  const leitura = new SpeechSynthesisUtterance(texto);

  leitura.lang = "pt-BR";
  leitura.rate = 0.95;
  leitura.pitch = 1;

  window.speechSynthesis.speak(leitura);
});

stopRead?.addEventListener("click", () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
});


/* =========================================
   4. SIMULADOR DE CORPO NEGRO
========================================= */

const tempSlider = document.getElementById("tempSlider");
const tempOutput = document.getElementById("tempOutput");
const thermalOrb = document.getElementById("thermalOrb");
const thermalDescription = document.getElementById("thermalDescription");

function atualizarCorpoNegro() {
  if (!tempSlider) return;

  const temperatura = Number(tempSlider.value);

  if (tempOutput) {
    tempOutput.textContent = temperatura;
  }

  if (thermalOrb) {
    let cor;

    if (temperatura < 2000) {
      cor = "#ff4b20";
    } else if (temperatura < 3500) {
      cor = "#ff8c35";
    } else if (temperatura < 4800) {
      cor = "#ffd16b";
    } else {
      cor = "#e9f5ff";
    }

    thermalOrb.style.background = cor;
    thermalOrb.style.boxShadow = `0 0 45px ${cor}`;
  }

  if (thermalDescription) {
    const pico = (2.898e-3 / temperatura) * 1e9;

    thermalDescription.textContent =
      `O pico da emissão ocorre aproximadamente em ${pico.toFixed(0)} nm. ` +
      "Quanto maior a temperatura, menor o comprimento de onda de pico.";
  }
}

tempSlider?.addEventListener("input", atualizarCorpoNegro);

atualizarCorpoNegro();


/* =========================================
   5. SIMULADOR DE ENERGIA DO FÓTON
========================================= */

const frequency = document.getElementById("frequency");
const frequencyOut = document.getElementById("frequencyOut");
const photonEnergy = document.getElementById("photonEnergy");

const PLANCK = 6.626e-34;

function formatarCientifico(valor) {
  return valor.toExponential(2)
    .replace("e", " × 10^");
}

function atualizarFoton() {
  if (!frequency) return;

  const frequencia = Number(frequency.value) * 1e14;
  const energia = PLANCK * frequencia;

  if (frequencyOut) {
    frequencyOut.textContent =
      (frequencia / 1e14).toFixed(1) + " × 10¹⁴";
  }

  if (photonEnergy) {
    photonEnergy.textContent = formatarCientifico(energia) + " J";
  }
}

frequency?.addEventListener("input", atualizarFoton);

atualizarFoton();


/* =========================================
   6. SIMULADOR DO EFEITO FOTOELÉTRICO
========================================= */

const incidentFreq = document.getElementById("incidentFreq");
const incidentOut = document.getElementById("incidentOut");

const cutoffFreq = document.getElementById("cutoffFreq");
const cutoffOut = document.getElementById("cutoffOut");

const cutoffStatus = document.getElementById("cutoffStatus");
const cutoffEnergy = document.getElementById("cutoffEnergy");

function atualizarFotoeletrico() {
  if (!incidentFreq || !cutoffFreq) return;

  const incidente = Number(incidentFreq.value);
  const corte = Number(cutoffFreq.value);

  if (incidentOut) {
    incidentOut.textContent = incidente.toFixed(1);
  }

  if (cutoffOut) {
    cutoffOut.textContent = corte.toFixed(1);
  }

  if (incidente >= corte) {
    const energia = PLANCK * (incidente - corte) * 1e14;

    cutoffStatus.textContent = "Há emissão no modelo";
    cutoffEnergy.textContent =
      "Energia cinética: " + formatarCientifico(energia) + " J";
  } else {
    cutoffStatus.textContent = "Não há emissão";
    cutoffEnergy.textContent = "Frequência abaixo do limite";
  }
}

incidentFreq?.addEventListener("input", atualizarFotoeletrico);
cutoffFreq?.addEventListener("input", atualizarFotoeletrico);

atualizarFotoeletrico();


/* =========================================
   7. SIMULADOR FOTOVOLTAICO
========================================= */

const lightIntensity = document.getElementById("lightIntensity");
const lightOut = document.getElementById("lightOut");
const meterFill = document.getElementById("meterFill");
const generationOut = document.getElementById("generationOut");

function atualizarFotovoltaica() {
  if (!lightIntensity) return;

  const intensidade = Number(lightIntensity.value);

  if (lightOut) {
    lightOut.textContent = intensidade;
  }

  if (generationOut) {
    generationOut.textContent = intensidade + "%";
  }

  if (meterFill) {
    meterFill.style.width = intensidade + "%";
  }
}

lightIntensity?.addEventListener("input", atualizarFotovoltaica);

atualizarFotovoltaica();


/* =========================================
   8. SIMULADOR DE TEMPERATURA DA PISCINA
========================================= */

const poolTemp = document.getElementById("poolTemp");
const poolTempOut = document.getElementById("poolTempOut");
const coverToggle = document.getElementById("coverToggle");
const poolLoss = document.getElementById("poolLoss");

function atualizarPiscina() {
  if (!poolTemp) return;

  const temperatura = Number(poolTemp.value);
  const comCapa = coverToggle?.checked ?? false;

  const perdaBase = (temperatura - 20) * 1.5 + 2;
  const perda = comCapa ? perdaBase * 0.3 : perdaBase;

  if (poolTempOut) {
    poolTempOut.textContent = temperatura;
  }

  if (poolLoss) {
    poolLoss.textContent =
      (comCapa ? "Com capa: " : "Sem capa: ") +
      perda.toFixed(1) + " unidades";
  }
}

poolTemp?.addEventListener("input", atualizarPiscina);
coverToggle?.addEventListener("change", atualizarPiscina);

atualizarPiscina();


/* =========================================
   9. QUIZZES RÁPIDOS
========================================= */

document.querySelectorAll(".mini-quiz").forEach(quiz => {
  const botoes = quiz.querySelectorAll("[data-correct]");
  const feedback = quiz.querySelector(".feedback");

  botoes.forEach(botao => {
    botao.addEventListener("click", () => {
      const correto = botao.dataset.correct === "true";

      botoes.forEach(item => {
        item.disabled = true;
      });

      if (correto) {
        feedback.textContent = "✓ Resposta correta! Muito bem!";
        feedback.className = "feedback correct";
      } else {
        feedback.textContent =
          "✗ Não foi dessa vez! Revise o conteúdo e tente novamente.";
        feedback.className = "feedback incorrect";
      }

      const respostaCorreta = quiz.querySelector(
        '[data-correct="true"]'
      );

      if (respostaCorreta) {
        respostaCorreta.classList.add("correct-answer");
      }
    });
  });
});


/* =========================================
   10. QUIZ FINAL
========================================= */

const finalQuiz = document.getElementById("finalQuiz");
const quizResult = document.getElementById("quizResult");
const resetQuiz = document.getElementById("resetQuiz");

const respostasCorretas = {
  qf1: "b",
  qf2: "a",
  qf3: "b",
  qf4: "a",
  qf5: "b",
  qf6: "a"
};

finalQuiz?.addEventListener("submit", event => {
  event.preventDefault();

  let acertos = 0;
  let respondidas = 0;

  Object.entries(respostasCorretas).forEach(([questao, resposta]) => {
    const selecionada = finalQuiz.querySelector(
      `input[name="${questao}"]:checked`
    );

    if (selecionada) {
      respondidas++;

      if (selecionada.value === resposta) {
        acertos++;
      }
    }
  });

  if (respondidas < 6) {
    quizResult.textContent =
      `Você respondeu ${respondidas} de 6 questões. ` +
      "Complete todas antes de corrigir.";
    quizResult.className = "quiz-result incomplete";
    return;
  }

  const porcentagem = (acertos / 6) * 100;

  let mensagem;

  if (acertos === 6) {
    mensagem = "🏆 Perfeito! Você dominou o conteúdo!";
  } else if (acertos >= 4) {
    mensagem = "👏 Muito bem! Você está no caminho certo!";
  } else if (acertos >= 2) {
    mensagem = "📚 Bom começo! Vale revisar alguns conceitos.";
  } else {
    mensagem = "💡 Continue estudando! Cada tentativa ensina algo.";
  }

  quizResult.textContent =
    `${mensagem} Resultado: ${acertos}/6 acertos (${porcentagem.toFixed(0)}%).`;

  quizResult.className = "quiz-result completed";
});

resetQuiz?.addEventListener("click", () => {
  setTimeout(() => {
    if (quizResult) {
      quizResult.textContent = "";
      quizResult.className = "quiz-result";
    }
  }, 0);
});


/* =========================================
   11. COPIAR CÓDIGO ARDUINO
========================================= */

const copyCode = document.getElementById("copyCode");
const arduinoCode = document.getElementById("arduinoCode");

copyCode?.addEventListener("click", async () => {
  if (!arduinoCode) return;

  const codigo = arduinoCode.textContent;

  try {
    await navigator.clipboard.writeText(codigo);

    copyCode.textContent = "✓ Código copiado!";

    setTimeout(() => {
      copyCode.textContent = "Copiar código Arduino";
    }, 2000);

  } catch (erro) {
    copyCode.textContent = "Não foi possível copiar";
  }
});


/* =========================================
   12. ANO AUTOMÁTICO NO RODAPÉ
========================================= */

console.log("Sol + Água carregado com sucesso! ☀️💧");
