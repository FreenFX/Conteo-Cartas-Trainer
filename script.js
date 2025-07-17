let deck = [];
let runningCount = 0;
let practicaCount = 0;
let leyendaVisible = true;

function generarMazo(mazos = 1) {
  const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  let nuevoMazo = [];
  for (let i = 0; i < mazos; i++) {
    for (let v of valores) {
      for (let j = 0; j < 4; j++) {
        nuevoMazo.push(v);
      }
    }
  }
  return mezclar(nuevoMazo);
}

function mezclar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function valorHighLow(carta) {
  if (['2', '3', '4', '5', '6'].includes(carta)) return 1;
  if (['7', '8', '9'].includes(carta)) return 0;
  if (['10', 'J', 'Q', 'K', 'A'].includes(carta)) return -1;
}

function drawCard() {
  if (deck.length === 0) {
    document.getElementById('status').innerText = 'Mazo vacío. Reiniciá.';
    return;
  }
  const carta = deck.pop();
  const cardDisplay = document.getElementById('cardDisplay');
  runningCount += valorHighLow(carta);
  cardDisplay.innerText = '';
  setTimeout(() => {
    cardDisplay.innerText = carta;
    cardDisplay.classList.add('animate');
    setTimeout(() => cardDisplay.classList.remove('animate'), 200);
  }, 50);
}

function resetDeck() {
  const cantidadMazos = parseInt(document.getElementById('mazos').value);
  deck = generarMazo(cantidadMazos);
  runningCount = 0;
  document.getElementById('cardDisplay').innerText = '🂠';
  document.getElementById('status').innerText = `Nuevo mazo generado con ${cantidadMazos} mazo(s).`;
}

function mostrarCuenta() {
  document.getElementById('status').innerText = `Cuenta actual: ${runningCount}`;
}

function modoPractica() {
  resetDeck();
  practicaCount = 0;
  runningCount = 0;
  document.getElementById('status').innerText = 'Modo práctica iniciado...';
  document.getElementById('inputResultado').style.display = 'none';
  mostrarCartasPractica();
}

function mostrarCartasPractica() {
  if (practicaCount >= 10) {
    document.getElementById('cardDisplay').innerText = '🂠';
    document.getElementById('status').innerText = 'Ingresá el resultado que contaste:';
    document.getElementById('inputResultado').style.display = 'block';
    return;
  }
  const carta = deck.pop();
  const cardDisplay = document.getElementById('cardDisplay');
  runningCount += valorHighLow(carta);
  cardDisplay.innerText = '';
  setTimeout(() => {
    cardDisplay.innerText = carta;
    cardDisplay.classList.add('animate');
    setTimeout(() => cardDisplay.classList.remove('animate'), 200);
  }, 50);
  practicaCount++;
  const dificultad = parseInt(document.getElementById('dificultad').value);
  setTimeout(mostrarCartasPractica, dificultad);
}

function verificarResultado() {
  const valorUsuario = parseInt(document.getElementById('resultadoUsuario').value);
  if (valorUsuario === runningCount) {
    document.getElementById('status').innerText = '✅ ¡Correcto!';
  } else {
    document.getElementById('status').innerText = `❌ Incorrecto. La cuenta era ${runningCount}.`;
  }
  document.getElementById('inputResultado').style.display = 'none';
}

function toggleLeyenda() {
  const leyenda = document.getElementById('leyenda');
  const toggleBtn = document.getElementById('toggleBtn');
  leyendaVisible = !leyendaVisible;
  leyenda.style.display = leyendaVisible ? 'block' : 'none';
  toggleBtn.innerText = leyendaVisible ? 'Ocultar valores' : 'Mostrar valores';
}

resetDeck();
