let ataqueJugador
let inputAtaqueJugador = []
let ataqueEnemigo = []
let inputAtaqueEnemigo = []
let banderaAtaqueJugador = 0
let saludJugador = 3
let saludEnemigo = 3
let cutremonJugador = ''
let cutremonEnemigo = ''
let cutremones = []
let ataquesCutremon
let btnAtqFuego
let btnAtqAgua
let btnAtqTierra
let botones = []

let victoriasJugador = 0
let victoriasEnemigo = 0

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
const msgAtaqueJugador = document.createElement('p')
const msgAtaqueEnemigo = document.createElement('p')
const sectionSelectCutremon = document.getElementById('seleccionar-cutremon')
const contAtaques = document.getElementById('contAtaques')


class Cutremon{
    constructor(nombre,foto,vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let emputardo = new Cutremon('Emputardo', './assets/emputardo.png',3)
emputardo.ataques.push(
    {nombre:'🔥',id:'btn-fuego'},
    {nombre:'🔥',id:'btn-fuego'},
    {nombre:'🔥',id:'btn-fuego'},
    {nombre:'💧',id:'btn-agua'},
    {nombre:'🌱',id:'btn-tierra'},
    )

let retristre = new Cutremon('Retristre', './assets/retristre.png',3)
retristre.ataques.push(
    {nombre:'💧',id:'btn-agua'},
    {nombre:'💧',id:'btn-agua'},
    {nombre:'💧',id:'btn-agua'},
    {nombre:'🔥',id:'btn-fuego'},
    {nombre:'🌱',id:'btn-tierra'},
    )

let escoberto = new Cutremon('Escoberto', './assets/escoberto.png',3)
escoberto.ataques.push(
    {nombre:'🌱',id:'btn-tierra'},
    {nombre:'🌱',id:'btn-tierra'},
    {nombre:'🌱',id:'btn-tierra'},
    {nombre:'💧',id:'btn-agua'},
    {nombre:'🔥',id:'btn-fuego'},
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

        console.log(document.getElementById(cutremon.nombre).checked)
    });

    inputEmputardo = document.getElementById('Emputardo')
    inputRetristre = document.getElementById('Retristre')
    inputEscoberto = document.getElementById('Escoberto')

    
    sectionSelectAtq.style.display = 'none'
    sectionReiniciar.style.display = 'none'   
    btnCutremonPlayer.addEventListener('click', selectCutremon) 
    btnReiniciar.addEventListener('click',reiniciarJuego)
}

function reiniciarJuego(){
    location.reload()
}

function gameOver(msg){
    
    msgSection.innerHTML = msg
    btnAtqFuego.disabled = true
    btnAtqAgua.disabled = true
    btnAtqTierra.disabled = true
    sectionReiniciar.style.display = 'block'
}

function checkStatus(){
    let restultadoFinal = ''

    if(saludEnemigo == 0){
        restultadoFinal = '- El enemigo se quedó sin vidas, ganaste la partida! 🎉'
    }
    else if(saludJugador == 0){
        restultadoFinal = 'Te has quedado sin vidas, perdiste la partida... 😞'
    }

    if(restultadoFinal != ''){
        gameOver(restultadoFinal)
    }


}

function creaMensaje(result){


    msgSection.innerHTML = result
    msgAtaqueJugador.innerHTML = ataqueJugador
    msgAtaqueEnemigo.innerHTML = ataqueEnemigo

    ataquesJugador.appendChild(msgAtaqueJugador)
    ataquesEnemigo.appendChild(msgAtaqueEnemigo)
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

function combate(){
    let spanVidasJugador = document.getElementById("salud-jugador")
    let spanVidasEnemigo = document.getElementById("salud-enemigo")

    console.log(inputAtaqueJugador)
    console.log(ataqueEnemigo)

    for (let i = 0; i<inputAtaqueJugador.length; i++){
        let comparador = compararAtaques(inputAtaqueJugador[i],ataqueEnemigo[i])

        if (comparador == "Victoria"){
            victoriasJugador++
        }
        else if(comparador == "Derrota"){
            victoriasEnemigo++
        }

        

    }


    spanVidasJugador.innerHTML = victoriasJugador
    spanVidasEnemigo.innerHTML = victoriasEnemigo

    creaMensaje(result)

    checkStatus()
}


function ataqueAleatorioEnemigo(){
    rng = aleatorio(0,inputAtaqueEnemigo.length)
    
    if(rng<=1){
        ataqueEnemigo.push('FUEGO')
    }
    else if (rng<=3){
        ataqueEnemigo.push('AGUA')
    }
    else{
        ataqueEnemigo.push('TIERRA')
    }
    
    if (ataqueEnemigo.length == 5){
        
        combate()
    }

}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}

function selectEnemyCutremon(){

    rng = aleatorio(0,cutremones.length-1)
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

        
        sectionSelectAtq.style.display = 'flex'
    
        
        sectionSelectCutremon.style.display = 'none'

        spanCutremonJugador.innerHTML = cutremonJugador

        selectAtaques(cutremonJugador)
        selectEnemyCutremon()
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
            
            if (e.target.textcontent === '🔥'){
                inputAtaqueJugador.push('FUEGO')
                boton.style.background = '#354527'
            }
            else if (e.target.textcontent === '💧'){
                inputAtaqueJugador.push('AGUA')
                boton.style.background = '#354527'
            }
            else{
                inputAtaqueJugador.push('TIERRA')
                boton.style.background = '#354527' 
            }
            console.log(e.target.textcontent)
            console.log(inputAtaqueJugador)

            ataqueAleatorioEnemigo()
        })
    }

    )
}

window.addEventListener('load', iniciarJuego)