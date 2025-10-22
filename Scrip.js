const gif = document.getElementById('gif');
const toggleBtn = document.getElementById('toggle');
const resetBtn = document.getElementById('reset');

let paused = false;

// Pause/Resume animation toggling:
toggleBtn.addEventListener('click', () => {
  paused = !paused;
  if(paused){
    // pausar: aplicar estilo para detener animación y dar "pose"
    gif.style.animationPlayState = 'paused';
    toggleBtn.textContent = 'Reanudar';
    gif.style.cursor = 'pointer';
  } else {
    gif.style.animationPlayState = 'running';
    toggleBtn.textContent = 'Pausar';
    gif.style.cursor = 'grab';
  }
});

// Reiniciar animación (fuerza reflow para reiniciar keyframes)
resetBtn.addEventListener('click', () => {
  gif.style.animation = 'none';
  // forzar reflow
  void gif.offsetWidth;
  gif.style.animation = null; // vuelve a la definida en CSS
  // si estaba pausado, dejar en running
  if (paused) {
    gif.style.animationPlayState = 'paused';
  } else {
    gif.style.animationPlayState = 'running';
  }
});

// Interacción adicional: arrastrar ligeramente la imagen para que "emule" movimiento"
let isDown = false;
let startX = 0;
let startY = 0;

gif.addEventListener('pointerdown', (e) => {
  isDown = true;
  startX = e.clientX;
  startY = e.clientY;
  gif.setPointerCapture(e.pointerId);
  gif.style.transition = 'transform 0.12s ease';
});

gif.addEventListener('pointermove', (e) => {
  if(!isDown) return;
  const dx = (e.clientX - startX) / 30; // movimiento suave
  const dy = (e.clientY - startY) / 80;
  gif.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 1.5}deg) scale(1.02)`;
});

gif.addEventListener('pointerup', (e) => {
  isDown = false;
  gif.releasePointerCapture(e.pointerId);
  // restaurar a la animación CSS
  gif.style.transition = '';
  gif.style.transform = '';
});