let prevBtn=document.getElementById('prevBtn');
let nextBtn=document.getElementById('nextBtn');
const divApp=document.getElementById('app');
let ulElement=CreateElemntUl();
const searchBtn =document.getElementById('searchBtn');
const searchInput =document.getElementById('searchInput');
const resetBtn =document.getElementById('resetBtn');
const Info =document.getElementById('Info');


let offset=0;
const url=`https://pokeapi.co/api/v2/pokemon`

const getListPokemon=async(urlPokemon)=>{
    try{
        const reponse=await fetch(urlPokemon).then((response)=>{
            if (!response.ok){
                throw new Error ('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then((pokemon)=>{
            CleanDivApp();
            getInfoPokemon(pokemon.results)

            //Creamos los atributos para utilizar en los botones de prev y next
            prevBtn.setAttribute('data-prev',pokemon.previous);
            nextBtn.setAttribute('data-next',pokemon.next);
            
        })
    }catch{
        console.log('Error al obtener los datos');
    }


};



  const  getInfoPokemon=async(listPokemon )=>{
    try{
       

        listPokemon.forEach(async arrPokemon => {
            let result = await fetch(arrPokemon.url).then((response)=>{
                if (!response.ok){
                    throw new Error ('La solicitud no fue exitosa');
                }
                return response.json();
            }).then ((pokeomonInfo)=>{
                paintPokemons(pokeomonInfo);
            })
        })

        divApp.appendChild(ulElement);
    }catch{
        console.log('Error al obtener datos del Pokemon');  
    }
}


function paintPokemons(pokemon){
    let namePokemon = pokemon.name;
    namePokemon=namePokemon[0].toUpperCase() + namePokemon.substring(1);
const liElement =document.createElement('li');
    liElement.classList.add('liElement');

const divContainer=document.createElement('div');
divContainer.classList.add ('container');

//Imagen
const divImg=document.createElement('div');
divImg.classList.add ('divImg');

const imgPokemon=document.createElement('img');
imgPokemon.classList.add ('imgPokemon');
imgPokemon.src=pokemon.sprites.other['official-artwork'].front_default;
imgPokemon.alt='Imagen del Pokemon ' + namePokemon;

divImg.appendChild(imgPokemon);
divContainer.appendChild(divImg);

//div Name
const divName=document.createElement('div');
divName.classList.add ('divName');

const elementH3=document.createElement('h3');
elementH3.textContent=namePokemon;

divName.appendChild(elementH3);
divContainer.appendChild(divName);

//div ver Info y imagen favorito

const divInfo=document.createElement('div');
divInfo.classList.add ('divInfo');

const divVerInfo=document.createElement('div');
const elementoa=document.createElement('a');
elementoa.classList.add('Info');
elementoa.href='#'
elementoa.textContent='Ver información'


//evento clikc Mostrar la informaciñon del Pokemon
elementoa.addEventListener('click', ()=>{
    let divInPopUp =document.getElementById(namePokemon);
    divInPopUp.style.display='block';
    
})


divVerInfo.appendChild(elementoa);
divInfo.appendChild(divVerInfo);


//Imagenes
const divFavorite=document.createElement('div');
divFavorite.classList.add('divFavorite');
const imgNoFavorite=document.createElement('img');
imgNoFavorite.classList.add ('noFavorite');
imgNoFavorite.id='N' + namePokemon;
imgNoFavorite.src='../assets/img/start2.webp';
imgNoFavorite.alt='Imagen no favorito ';

divFavorite.appendChild(imgNoFavorite);


//Imagen de favoritos
const imgFavorite=document.createElement('img');
imgFavorite.classList.add ('favorite');
imgFavorite.id= 'F' + namePokemon;
imgFavorite.src='../assets/img/start.webp';
imgFavorite.alt='Imagen favorito ';

divFavorite.appendChild(imgFavorite);
divInfo.appendChild(divFavorite);

divContainer.appendChild(divInfo);
    liElement.appendChild(divContainer);
    //Nos guardamos el nombre del  Pokemon para luego recuperarla en el evento del clik
    liElement.setAttribute('data-infopokemon',namePokemon);

      //evento clikc para guardar el pokemón en LocalStores
    liElement.addEventListener('click', ()=>{

        //Nos traemos el nombre del Pokemon que se ha guarado en la instrucción  liElement.setAttribute('data-infopokemon',namePokemon);
        const infoPokemon=liElement.dataset.infopokemon ;
        saveLocalstore(infoPokemon);
        ActivarFavorito(namePokemon);

      })


//==========================================================
//==========================================================
      /*** Añadimos DIv para ventana Emergente */
       // Creamos un div para mostrar el Pokemon 
 const divPokemon=document.createElement('div');
 divPokemon.id=namePokemon;
 divPokemon.classList.add('divPokemon')
 
  ///===============IMAGEN
 //=====================
  //Div para la imagen
  const divImgPop =document.createElement('div');
  divImgPop.classList.add('divImgPop');

 
 //Creamos un elemento imagen
 const imgPokemonPop =document.createElement('img');
 imgPokemonPop.classList.add('imgPokemonPop');
 imgPokemonPop.src=pokemon.sprites.other.dream_world.front_default
 divImgPop.appendChild(imgPokemonPop);
 //añadimos en el div imagen la imagen del pokemon
 divPokemon.appendChild(divImgPop);
 ///**********************IMAGEN
 //=====================


 

 //=============INFORMACIÓN
 //========================
 const divInf =document.createElement('div');
 divInf.classList.add('divInf');

 //Nombre del pokemon
 const nomPokemon=document.createElement('p');
 nomPokemon.textContent=`Nombre: ${pokemon.name}`

 //tipo pokemon
 const tipoPokemon=document.createElement('p');
 tipoPokemon.textContent=`Tipo: ${pokemon.types[0].type.name}`

 //altura del pokemon
 const altPokemon=document.createElement('p');
 altPokemon.textContent=`Altura: ${pokemon.height}`;

 //peso pokemon
 const pesoPokemon=document.createElement('p');
 pesoPokemon.textContent=`Peso: ${pokemon.weight}`; 

 //Añdimos los párrafos al div de información
 divInf.appendChild(nomPokemon);
 divInf.appendChild(tipoPokemon);
 divInf.appendChild(altPokemon);
 divInf.appendChild(pesoPokemon);

 divPokemon.appendChild(divInf);

 const btnClose =document.createElement('button');
 btnClose.id='btnClose';
 btnClose.value='Cerrar';
 btnClose.textContent='Cerrar';
 //evento clikc boton cerrar de la ventana flotante
 btnClose.addEventListener('click', ()=>{
     divPokemon.style.display='none';
   })

  
 
 //divPop.appendChild(divContainePop);
 divPokemon.appendChild(btnClose)
 liElement.appendChild(divPokemon);

/// termina el pop-up

ulElement.appendChild(liElement);
    
}

function CreateElemntUl(){
     
    const ulElement =document.createElement('ul');
    ulElement.classList.add('ulPokemon')
    return ulElement;
}

//Limpiar el div que contiene la lista ordenada de Pokemons
function CleanDivApp(){
 
 document.getElementById('app').innerHTML = '';
 ulElement=CreateElemntUl();

 }
//Botón Previus
prevBtn.addEventListener('click',()=>{
    const prevButon=prevBtn.dataset.prev;
    offset -=10
   
    
    if(offset<0){
        offset=0;
        return;
    }else{
       
        getListPokemon(`${url}?offset=${offset}&limit=10`);
    }
})

//Botón Next
nextBtn.addEventListener('click',()=>{
    const next=nextBtn.dataset.next ;
    offset +=10
   
    if(next===null){
        return;
    }
    else{
        getListPokemon(`${url}?offset=${offset}&limit=10`);
    }
}

)

//Botón Buscar Pokemon por nombre
searchBtn.addEventListener('click',()=>{
  
    let namePokemon =searchInput.value.toLowerCase();
  
    if (!namePokemon ===null){return} ;
     let urlNom =`${url}/${namePokemon}`
    
    fetch(urlNom).then((response)=>{
        if (!response.ok){
           window.alert('Pokemon no encontrado');
        }
        return response.json();
    })
    .then((pokemon)=>{
        CleanDivApp();
        paintPokemons(pokemon)
        divApp.appendChild(ulElement);
    })
}

)


//Botón de Reset
resetBtn.addEventListener('click',()=>{
    searchInput.value='';
    CleanDivApp();
    offset=0;
    getListPokemon(`${url}?offset=${offset}&limit=10`);
    //Limpiamos el localstore
    localStorage.clear();
})


function saveLocalstore(namePokemon) {
    

    if (!namePokemon ===null){return} ;
    namePokemon =namePokemon.toLowerCase();
     let urlNom =`${url}/${namePokemon}`
  
    fetch(urlNom).then((response)=>{
        if (!response.ok){
           window.alert('Pokemon no encontrado');
        }
        return response.json();
    })
    .then((pokemon)=>{
     let arrFavorite = localStorage.getItem("arrFavorite") || "[]";
     arrFavorite = JSON.parse(arrFavorite);
        // buscamos el pokemon en la lista de favoritos
        const listFavorite = arrFavorite.findIndex(function(e) { return e.name == pokemon.name; });
        if (listFavorite > -1) {
            // si está, lo quitamos
            arrFavorite.splice(listFavorite, 1);
        } else {
            // si no está, lo añadimos
            arrFavorite.push(pokemon);
        }

        localStorage.setItem('arrFavorite', JSON.stringify(arrFavorite))
        

    })


}

function ActivarFavorito(namePokemon) {
     
    //Cre esta variable porque la primera leta está en mayusculas 
   let nameClase=namePokemon;

    if (!namePokemon ===null){return} ;

    namePokemon =namePokemon.toLowerCase();
   
    let arrFavorite = localStorage.getItem("arrFavorite") || "[]";
     arrFavorite = JSON.parse(arrFavorite);
    
        // buscamos el pokemon en la lista de favoritos
        const listFavorite = arrFavorite.findIndex(function(e) { return e.name == namePokemon; });
        if (listFavorite > -1) {
           
            // quitamos la marca 
            const imgNoFavorite=document.getElementById('N' + nameClase);
            imgNoFavorite.style.display='block';

            const imgFavorite=document.getElementById('F' + nameClase);
            imgFavorite.style.display='none';
             
     } else {
       
            // si no está, lo añadimos
            const imgFavorite=document.getElementById('F' + nameClase);
            imgFavorite.style.display='block';

            const imgNoFavorite=document.getElementById('N' + nameClase);
            imgNoFavorite.style.display='none';
        }



}



getListPokemon(`${url}?offset=${offset}&limit=10`);