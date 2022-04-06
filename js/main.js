'use strict';


/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMesageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');


/*//Objetos con cada gatito
const kittenData_1 = {
    image: "https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg",
    name: "Anastacio",
    desc: "Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
    race: "British Shorthair",
};
const kittenData_2 = {
    image: "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_39/3021711/190923-cat-pet-stock-cs-1052a.jpg",
    name: "Fiona",
    desc: "Juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
    race: "British Shorthair",
};
const kittenData_3 = {
    image: "https://images.emedicinehealth.com/images/article/main_image/cat-scratch-disease.jpg",
    name: "Cielo",
    desc: "Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
    race: "British Shorthair",
};*/

//const kittenDataList = [kittenData_1, kittenData_2, kittenData_3];

let kittenDataList = [];
//Funciones
/*function renderKitten(kittenData) {
    const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.image}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
    return kitten;
}*/

function renderKittenList(kittenDataList) {
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
        listElement.innerHTML += renderKitten(kittenItem);
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}
//Adicionar nuevo gatito
let newKittenDataObject = {};
//obtener la información de los gatitos del formulario

function addNewKitten(event) {
    event.preventDefault();
    const valueDesc = inputDesc.value;
    const valuePhoto = inputPhoto.value;
    const valueName = inputName.value;
    const valueRace = inputRace.value;
    if (valueDesc === "" && valuePhoto === "" && valueName === "") {
        labelMesageError.innerHTML = "Debe rellenar todos los valores";
    } else {
        if (valueDesc !== "" && valuePhoto !== "" && valueName !== "") {
            labelMesageError.innerHTML = "";
        }
    
    }
    let newKittenDataObject = {
        name:valueName,
        url:valuePhoto,
        desc:valueDesc,
        race:valueRace,
      };
      kittenDataList.push(newKittenDataObject);
      renderKittenList(kittenDataList);
      localStorage.setItem("kittenListStored",JSON.stringify(kittenDataList) );
/*console.log(newKittenDataObject);
for(const  newKittenDataObject of kittenDataList){
    listElement.innerHTML += `<li>${newKittenDataObject}</li>`
}*/
}

//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
}

//Filtrar por descripción
function filterKitten(event) {
    event.preventDefault();
    const descrSearchText = input_search_desc.value;
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
        if (kittenItem.desc.includes(descrSearchText)) {
            listElement.innerHTML += renderKitten(kittenItem);
        }
    }
}

//Mostrar el litado de gatitos en ell HTML
renderKittenList(kittenDataList);

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);

//Peticiones al servidor

const GITHUB_USER = 'celiarodriguezmo';
const SERVER_URL = `https://adalab-api.herokuapp.com/api/kittens/${GITHUB_USER}`;

/*fetch(SERVER_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response)=> response.json())
  .then((data)=> {
kittenDataList = data.results;
console.log(kittenDataList);
 renderKittenList(kittenDataList);
 
  });*/

  function renderKitten(data) {
    const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${data.url}
        alt="gatito"
      />
      <h3 class="card_title">${data.name}</h3>
      <h3 class="card_race">${data.race}</h3>
      <p class="card_description">
      ${data.desc}
      </p>
    </article>
    </li>`;
    return kitten;
}

//Almacenar en localstorage

const kittenListStored = JSON.parse(localStorage.getItem('kittenListStored'));
if (kittenListStored !== null) {
    //si existe el listado de gatitos en el local storage
    kittenDataList=kittenListStored;
    // vuelve a pintar el listado de gatitos
    renderKittenList(kittenDataList);
  } else {
    //sino existe el listado de gatitos en el local storage
    //haz la petición al servidor
    fetch(SERVER_URL)
      .then((response) => response.json())
      .then((data) => {
        kittenDataList = data.results;
        //guarda el listado obtenido en el local storage.
       localStorage.setItem("kittenListStored",JSON.stringify(data.results) )
        //vuelve a pintar el listado de gatitos
        renderKittenList(kittenDataList);
      })
      .catch((error) => {
        console.error(error);
      });
  }
//Peticiones servidor  II// guardar en local storage//
/*fetch(
    `https://adalab-api.herokuapp.com/api/kittens/${GITHUB_USER}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newKittenDataObject),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success !== "") {
        //Completa y/o modifica el código:
     
        //Agrega el nuevo gatito al listado

        addNewKitten(newKittenDataObject);
        //Guarda el listado actualizado en el local stoarge
        localStorage.setItem("kittenListStored",JSON.stringify(data.results) )
        //Visualiza nuevamente el listado de gatitos
        renderKittenList(kittenDataList);
        //Limpia los valores de cada input
        resetList();

      } else {
        console.error("No tienes guardado ningún gatito");
      }
    });*/

    function resetList() {
        inputDesc.value = "";
        inputPhoto.value = "";
        inputName.value = "";
        inputRace.value= "";
    }
    