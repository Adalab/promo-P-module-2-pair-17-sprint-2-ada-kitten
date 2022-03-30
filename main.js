'use strict';

// 1. Elementos que necesitamos del HTML

const btn = document.querySelector('.js_btn');
const caritaSelect = document.querySelector('.js_select');
const caritaDiv = document.querySelector('.js_carita');
const mainElement = document.querySelector('.js_main');

// 2. Declarar funciones y eventos

function generarNumeroAleatorio(max) {
  const pepino = parseInt(Math.random()*max);
  return pepino;
}

function actualizarCarita() {
  // Coger el value del select
  const caritaSeleccionada = caritaSelect.value;

  // Actualizar el elemento con la carita
  caritaDiv.innerHTML = caritaSeleccionada;
}

function cambiarElFondo() {
  // Generar un número aleatorio
  //const numAleat = parseInt(Math.random()*100);
  const numAleat = generarNumeroAleatorio(100);

  if( numAleat % 2 === 0 ) {
    // Es par
    mainElement.classList.remove('naranjaFuegoChileno');
    mainElement.classList.add('amarilloCorrecto');
  }
  else {
    // Es impar
    mainElement.classList.remove('amarilloCorrecto');
    mainElement.classList.add('naranjaFuegoChileno');
  }
}

function handleClickBtn(event) {
  event.preventDefault();

  actualizarCarita();

  cambiarElFondo();
}

/*
btn.addEventListener( 'click', (event) => {
  event.preventDefault();

  console.log('Ha hecho click!!!');
});
*/

// 3. Código que se ejecuta cuando carga la página

btn.addEventListener('click', handleClickBtn);