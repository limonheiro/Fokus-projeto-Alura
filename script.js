const html = document.querySelector('html')

const botoes = document.querySelectorAll('.app__card-button')

const startPauseBt = document.querySelector('.start-pause')

const timer = document.querySelector('#timer')
const musica = document.querySelector('.toggle-switch')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')

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
    'curto':`
    Que tal dar uma respirada?<br>
    <strong class="app__title-strong">Faça uma pausa curta!.</strong>
    `,
    'longo':`
    Hora de voltar à superfície.<br>
    <strong class="app__title-strong">Faça uma pausa longa.</strong>
    `
}

function init() {
    activePageBt(botoes[0])
    timer.textContent = dataTime['foco']
}

function mudaTitulo(tipo){
    titulo.innerHTML = tipoTítulos[tipo]
}

function activePageBt(bt) {
    botoes.forEach((element) => {
        element.classList.remove('active')
    })

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
        timer.textContent = dataTime[typeClass]
        mudaTitulo(typeClass)
    })

})

init()
