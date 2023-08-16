const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];




    // capturo los elementos involucrados (opcion de pizza, caja de busqueda,  formulario  y el contenedor de la card de la pizza selecciona)
const opcion = document.getElementById('opcion');
const boton = document.getElementById('button');
const form = document.getElementById('form-pizza');
const cardPizza = document.getElementById('cardPizza');

opcion.value = '';

let idBuscado;


//Verificar si hay id guardado en LS
let idExistente = buscarLS();

if(idExistente){
  console.log('hay en LS');
 
  let pizza2 = idExistente;
 
  cardPizza.innerHTML = `
  <div class="img-cont"><img src="${pizza2.imagen}" class="pizza-img" alt="${pizza2.nombre}" /></div>
  <h3 class="pizza-name">${pizza2.nombre}</h3>
  <ul class="pizza-ingredientes">${pizza2.ingredientes.join(" | ")}</ul>
  <p class="pizza-precio">$ ${pizza2.precio}</p>
  
  `;

}else{
  console.log('NO hay en LS');
};



const init = form.addEventListener('submit',(e) => {

  e.preventDefault();


idBuscado = ajustarValorInput(opcion.value);





// const initialContainer = document.getElementById('pizza-container');

// initialContainer.classList.remove('initial-container');



if(idBuscado >= 0 && idBuscado <= 99999 ){
    const pizza = buscarPizza(idBuscado);

    if(pizza == undefined){
      cardPizza.innerHTML = `
        <h3 class="pizza-notFound">Item no Encontrado</h3>   
        `;
      console.warn('no existe');
    }else{
      createPizzaTemplate(pizza);
      // console.log(`La pizza con ID: ${pizza.id} |  ${pizza.nombre}  tiene un precio de $ ${pizza.precio} y sus ingredientes son ${pizza.ingredientes}`);  
         guardarLS(pizza);
    };


}else{

  console.log('ENTRE POR ACA PORQUE NO ES UN NUMERO');

opcion.value = '';

  cardPizza.innerHTML = `
        <h3 class="pizza-notFound">Debe Ingresar un Valor numérico</h3>   
        `;
     
      console.warn('no es un numero');

}

});



//crear card
const createPizzaTemplate = (pizza) => {
    
  cardPizza.innerHTML = `
    <div class="img-cont"><img src="${pizza.imagen}" class="pizza-img" alt="${pizza.nombre}" /></div>
    <h3 class="pizza-name">${pizza.nombre}</h3>
    <ul class="pizza-ingredientes">${pizza.ingredientes.join(" | ")}</ul>
    <p class="pizza-precio">$ ${pizza.precio}</p>
    
    `;
};




    //validar el valor ingresado
    const ajustarValorInput = (id) => {
      return Number(id.trim().replace(/\s+/g, " "));
    };


    function buscarPizza(idBuscado){

      const resultado = pizzas.find(pizza => {
          return idBuscado === pizza.id;
      });
      return resultado;
    };


    //Guardar en LS
    function guardarLS(pizza){
      // localStorage.setItem('id',pizza.id);
      localStorage.setItem('pizza',JSON.stringify(pizza));
    };

    //Verificar si hay contenido en LS
    function buscarLS(){
      let pizza =JSON.parse(localStorage.getItem('pizza'));
      return pizza;
    };


    init;