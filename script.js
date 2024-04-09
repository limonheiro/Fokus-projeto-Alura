let timerInterval = null
let tempoRestante = null

const html = document.querySelector('html')

const botoes = document.querySelectorAll('.app__card-button')

const startPauseBt = document.querySelector('#start-pause')

const timer = document.querySelector('#timer')
const musicaSW = document.querySelector('#alternar-musica')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')

const musica = new Audio('/sons/luna-rise-part-one.mp3')

musica.loop = true

musicaSW.addEventListener('change', () => {
    musica.paused ? musica.play() : musica.pause()
})

const dataTime = {
    'foco': 1500,
    'curto': 300,
    'longo': 900,
}

const tipoTítulos = {
    'foco': `
    Otimize sua produtividade,<br>
    <strong class="app__title-strong">mergulhe no que importa.</strong>
    `,
    'curto': `
    Que tal dar uma respirada?<br>
    <strong class="app__title-strong">Faça uma pausa curta!.</strong>
    `,
    'longo': `
    Hora de voltar à superfície.<br>
    <strong class="app__title-strong">Faça uma pausa longa.</strong>
    `
}

function init() {
    botoes[0].classList.add('active')
    setTimer('foco')
    musicaSW.setAttribute('false', '')
}

function getMinutesSeconds(value) {

    const tempo = new Date(value * 1000) 
    const tempoFormato = tempo.toLocaleString('pt-Br', {minute:'2-digit', second:'2-digit'})
    return tempoFormato
}

function setTimer(value) {
    tempoRestante = dataTime[value]

    timer.textContent = getMinutesSeconds(tempoRestante)
}

function mudaTitulo(tipo) {
    titulo.innerHTML = tipoTítulos[tipo]
}

function activePageBt(bt) {
    botoes.forEach((element) => {
        element.classList.remove('active')
    })
    clearTimer()
    bt.classList ? bt.classList.add('active') : console.log('Botão não encontrado')
}


botoes.forEach(element => {
    const typeClass = element.classList[1].split('--')[1]
    element.addEventListener('click', () => {

        if (typeClass === 'foco') {
            html.setAttribute('data-contexto', typeClass)
            banner.setAttribute('src', '/imagens/foco.webp')
        } else {
            html.setAttribute('data-contexto', `descanso-${typeClass}`)
            banner.setAttribute('src', `/imagens/descanso-${typeClass}.webp`)
        }
        activePageBt(element)

        setTimer(typeClass)
        mudaTitulo(typeClass)
    })

})

function resetTimer() {
    const typeData = html.getAttribute('data-contexto').replace('descanso-', '')
    timer.textContent = dataTime[typeData]
}

function clearTimer() {
    clearTimeout(timerInterval)
    timerInterval = null

    if (timer.textContent == 0) {
        playAudio('/sons/beep.mp3')
        resetTimer()
    }
}

function playAudio(file) {
    const playFile = new Audio(file)
    playFile.play()
}

const contagem = () => {

    tempoRestante > 0 ?
        tempoRestante -= 1 :
        clearTimer()

    timer.textContent = getMinutesSeconds(tempoRestante)

}


startPauseBt.addEventListener('click', () => {
    if (typeof (timerInterval) === 'undefined' || timerInterval === null) {
        playAudio('/sons/play.wav')

        timerInterval = setInterval(() => {
            contagem()
        }, 1000)
    } else {
        playAudio('/sons/pause.mp3')
        clearTimer()
    }

})

init()