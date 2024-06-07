const contTarjetas= document.getElementById("contTarjetas")
const sectionSelectAtq = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('boton-reiniciar')
const btnCutremonPlayer = document.getElementById("btn-cutremon")

const btnReiniciar = document.getElementById("boton-reiniciar")
const msgSection = document.getElementById('resultado')
const spanCutremonEnemigo = document.getElementById("cutremon-enemigo")
const spanCutremonJugador = document.getElementById("cutremon-jugador")
const ataquesJugador = document.getElementById('ataques-jugador')
const ataquesEnemigo = document.getElementById('ataques-enemigo')

const sectionSelectCutremon = document.getElementById('seleccionar-cutremon')
const contAtaques = document.getElementById('contAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')



let ataqueJugador
let inputAtaqueJugador = []
let ataqueEnemigo = []
let inputAtaqueEnemigo = []
let banderaAtaqueJugador = 0
let saludJugador = 3
let saludEnemigo = 3
let cutremonJugador = ''
let cutremonJugadorObj
let cutremonEnemigo = ''
let cutremones = []
let ataquesCutremon
let btnAtqFuego
let btnAtqAgua
let btnAtqTierra
let botones = []

let victoriasJugador = 0
let victoriasEnemigo = 0

let lienzo = mapa.getContext('2d')
let velocidad = 2

let intervalo

let canvasBackground = new Image()
canvasBackground.src = './assets/map.png'



class Cutremon{
    constructor(nombre,foto,vida,x,y){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

let emputardo = new Cutremon('Emputardo', './assets/emputardo.png',3)
emputardo.ataques.push(
    {nombre:'FUEGO',id:'btn-fuego'},
    {nombre:'FUEGO',id:'btn-fuego'},
    {nombre:'FUEGO',id:'btn-fuego'},
    {nombre:'AGUA',id:'btn-agua'},
    {nombre:'TIERRA',id:'btn-tierra'},
    )

let retristre = new Cutremon('Retristre', './assets/retristre.png',3)
retristre.ataques.push(
    {nombre:'AGUA',id:'btn-agua'},
    {nombre:'AGUA',id:'btn-agua'},
    {nombre:'AGUA',id:'btn-agua'},
    {nombre:'FUEGO',id:'btn-fuego'},
    {nombre:'TIERRA',id:'btn-tierra'},
    )

let escoberto = new Cutremon('Escoberto', './assets/escoberto.png',3)
escoberto.ataques.push(
    {nombre:'TIERRA',id:'btn-tierra'},
    {nombre:'TIERRA',id:'btn-tierra'},
    {nombre:'TIERRA',id:'btn-tierra'},
    {nombre:'AGUA',id:'btn-agua'},
    {nombre:'FUEGO',id:'btn-fuego'},
    )


cutremones.push(emputardo,retristre,escoberto)

function iniciarJuego(){
    

    cutremones.forEach(cutremon => {
        
        opcionCutremon = `
        <input type="radio" name="cutremon" id= ${cutremon.nombre} />
        <label class="tarjeta-mokepon" for=${cutremon.nombre}>
            <p>${cutremon.nombre}</p>
            <img src=${cutremon.foto} alt=${cutremon.nombre}>
        </label>
        `
        contTarjetas.innerHTML += opcionCutremon


    });

    inputEmputardo = document.getElementById('Emputardo')
    inputRetristre = document.getElementById('Retristre')
    inputEscoberto = document.getElementById('Escoberto')

    
    sectionSelectAtq.style.display = 'none'
    sectionReiniciar.style.display = 'none'   
    sectionVerMapa.style.display = 'none'

    btnCutremonPlayer.addEventListener('click', selectCutremon) 
    btnReiniciar.addEventListener('click',reiniciarJuego)
}

function reiniciarJuego(){
    location.reload()
}

function gameOver(msg){
    
    msgSection.innerHTML = msg
    sectionReiniciar.style.display = 'block'
}



function creaMensaje(result){
    msgSection.innerHTML = result

}

function compararAtaques(jugador,enemigo){
    if (jugador == enemigo){
        result = "Empate";

    }
    else if((jugador == "FUEGO" && enemigo == "TIERRA") || (jugador == "AGUA" && enemigo =="FUEGO") || (jugador =="TIERRA"& enemigo =="AGUA")){
        result = "Victoria";
    }
    else{
        result = "Derrota";        
    }

    return result

}

function comprobarResultados(){
    if (victoriasEnemigo == victoriasJugador){
        result = "Empate"
    }
    else if (victoriasJugador > victoriasEnemigo){
        result = "Jugador gana!"
    }
    else{
        result = "Enemigo gana!"
    }

    return result
}

function imprimirAtaques(ataqueJugador,ataqueEnemigo){
    
    let msgAtaqueJugador = document.createElement('p')
    let msgAtaqueEnemigo = document.createElement('p')

   
    msgAtaqueJugador.innerHTML = ataqueJugador
    msgAtaqueEnemigo.innerHTML = ataqueEnemigo

    ataquesJugador.appendChild(msgAtaqueJugador)
    ataquesEnemigo.appendChild(msgAtaqueEnemigo)

}

function combate(){
    let spanVidasJugador = document.getElementById("salud-jugador")
    let spanVidasEnemigo = document.getElementById("salud-enemigo")



    for (let i = 0; i<inputAtaqueJugador.length; i++){
        let comparador = compararAtaques(inputAtaqueJugador[i],ataqueEnemigo[i])

        if (comparador == "Victoria"){
            victoriasJugador++
        }
        else if(comparador == "Derrota"){
            victoriasEnemigo++
        }
        imprimirAtaques(inputAtaqueJugador[i],ataqueEnemigo[i])
    }


    spanVidasJugador.innerHTML = victoriasJugador
    spanVidasEnemigo.innerHTML = victoriasEnemigo

    let result = comprobarResultados()
    gameOver(result)

}


function ataqueAleatorioEnemigo(inputAtaqueEnemigo){
    let ataquesTemporal = inputAtaqueEnemigo
    let randIndex
    let randElement

    randIndex = aleatorio(0,ataquesTemporal.length-1)
    randElement = ataquesTemporal.pop(randIndex)
    console.log(randElement)
    ataqueEnemigo.push(randElement.nombre)

    if (ataqueEnemigo.length == 5){
        
        combate()
    }

}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}

function selectEnemyCutremon(){

    rng = aleatorio(0,cutremones.length)
    if (rng == cutremones.length){rng = cutremones.length-1}

    spanCutremonEnemigo.innerHTML = cutremones[rng].nombre
    inputAtaqueEnemigo = cutremones[rng].ataques

    secuenciaAtaque()
}

function selectCutremon(){

    if(inputEmputardo.checked){
        cutremonJugador = inputEmputardo.id
    }
    else if(inputRetristre.checked){
        cutremonJugador = inputRetristre.id
    }
    else if(inputEscoberto.checked){
        cutremonJugador = inputEscoberto.id
    }
    else{
        alert("No has elegido tu cutremon")
    }

    if(cutremonJugador != ''){

        
        //sectionSelectAtq.style.display = 'flex'
    
        
        sectionSelectCutremon.style.display = 'none'

        
        spanCutremonJugador.innerHTML = cutremonJugador

        selectAtaques(cutremonJugador)
        cutremonJugadorObj = searchCutremon(cutremonJugador)
        
        selectEnemyCutremon()
        iniciarMapa()
    }

}

function selectAtaques(cutremonJugador){
    let ataques

    cutremones.forEach(function (cutremon){
        if (cutremonJugador === cutremon.nombre){
            ataques = cutremon.ataques
        }

    })

    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) =>{
        ataquesCutremon = `
        <button id=${ataque.id} class="boton-ataque BATK">${ataque.nombre}</button>`
        contAtaques.innerHTML +=ataquesCutremon
    })

    btnAtqFuego = document.getElementById("btn-fuego")
    btnAtqAgua = document.getElementById("btn-agua")
    btnAtqTierra = document.getElementById("btn-tierra")

    botones = document.querySelectorAll('.BATK')

}

function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click',(e) =>{
            
            if (e.target.innerHTML === 'FUEGO'){
                inputAtaqueJugador.push('FUEGO')
                boton.style.background = '#354527'
            }
            else if (e.target.innerHTML === 'AGUA'){
                inputAtaqueJugador.push('AGUA')
                boton.style.background = '#354527'
            }
            else{
                inputAtaqueJugador.push('TIERRA')
                boton.style.background = '#354527' 
            }
            boton.disabled = true
            ataqueAleatorioEnemigo(inputAtaqueEnemigo)
            
        })
    }

    )
 
}

function drawCanvas(){
    
    cutremonJugadorObj.x = cutremonJugadorObj.x + cutremonJugadorObj.velocidadX
    cutremonJugadorObj.y = cutremonJugadorObj.y + cutremonJugadorObj.velocidadY
    lienzo.clearRect(0,0,mapa.width, mapa.height)
    lienzo.drawImage(
        canvasBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    lienzo.drawImage(
        cutremonJugadorObj.mapaFoto,
        cutremonJugadorObj.x,
        cutremonJugadorObj.y,
        cutremonJugadorObj.ancho,
        cutremonJugadorObj.alto
    )
}

function moverDerecha(){
    cutremonJugadorObj.velocidadX = velocidad
}

function moverIzquierda(){
    cutremonJugadorObj.velocidadX = -velocidad
}

function moverAbajo(){
    cutremonJugadorObj.velocidadY = velocidad
}

function moverArriba(){
    cutremonJugadorObj.velocidadY = -velocidad
}

function detenerMovimiento(){
    cutremonJugadorObj.velocidadX = 0
    cutremonJugadorObj.velocidadY = 0
}

function keyHeld(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
    
        case 'ArrowDown':
            moverAbajo()
            break
    
        case 'ArrowLeft':
            moverIzquierda()
            break
    
        case 'ArrowRight':
            moverDerecha()
            break
    
        default:
            break
    }
}

function iniciarMapa(){
    mapa.width = 320
    mapa.height = 240
    
    sectionVerMapa.style.display = 'flex'
    intervalo = setInterval(drawCanvas, 50)

    window.addEventListener('keydown', keyHeld)
    window.addEventListener('keyup', detenerMovimiento)
}

function searchCutremon(){
    let cutremonElegido
    cutremones.forEach(function (cutremon){
        
        if (cutremon.nombre === cutremonJugador ){
            cutremonElegido = cutremon
        }

    })
    console.log(cutremonElegido,cutremonJugador)
    return cutremonElegido
}

window.addEventListener('load', iniciarJuego)