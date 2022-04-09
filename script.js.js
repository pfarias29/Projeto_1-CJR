let users = [
    { id: 1, first_name: "Lauren ", last_name: "Shaxby", email: "lshaxby0@php.net", created_at: "16/10/2021" },
    { id: 2, first_name: "Ardenia ", last_name: "Paddingdon", email: "apaddingdon1@nsw.gov.au", created_at: "27/07/2021" },
    { id: 3, first_name: "Renaldo ", last_name: "Alenichev", email: "ralenichev2@ftc.gov", created_at: "10/06/2021" },
    { id: 4, first_name: "Nichole ", last_name: "OHeneghan", email: "noheneghan3@flavors.me", created_at: "28/06/2021" },
    { id: 5, first_name: "Haywood ", last_name: "Daintry", email: "hdaintry4@nhs.uk", created_at: "18/03/2021" },
    { id: 6, first_name: "Leslie ", last_name: "Daile", email: "ldaile5@vimeo.com", created_at: "23/05/2021" },
    { id: 7, first_name: "Byrann ", last_name: "Slorance", email: "bslorance6@kickstarter.com", created_at: "15/05/2021" },
    { id: 8, first_name: "My ", last_name: "Swendell", email: "mswendell7@moonfruit.com", created_at: "15/12/2021" },
    { id: 9, first_name: "Brier ", last_name: "Esson", email: "besson8@usa.gov", created_at: "14/03/2021" },
    { id: 10, first_name: "Seth ", last_name: "Piddle", email: "spiddle9@nationalgeographic.com", created_at: "20/10/2021" },
    { id: 11, first_name: "Fer ", last_name: "Piddle", email: "ferspiddle9@nationalgeographic.com", created_at: "20/10/2022" }
]

function criaTabela() {
    criaCabecalho()
    criaLinhas()
    pagination()
}
let tabela = document.createElement('table');

function criaCabecalho() {
    let divTabela = document.querySelector('.tabela')
    let head = document.createElement('thead');
    let row = document.createElement('tr');

    let coluna1 = document.createElement('th');
    coluna1.innerHTML = 'Nome'

    let coluna2 = document.createElement('th');
    coluna2.innerHTML = 'Email'

    let coluna3 = document.createElement('th');
    coluna3.innerHTML = 'Cadastrado em'

    let coluna4 = document.createElement('th')
    coluna4.innerHTML = ''

    divTabela.appendChild(tabela)
    tabela.appendChild(head)
    head.appendChild(row)
    row.appendChild(coluna1)
    row.appendChild(coluna2)
    row.appendChild(coluna3)
    row.appendChild(coluna4)
}

let currentPage = 1
const linhas = 5

function calculaPagina() {
    const inicio = (currentPage - 1) * linhas
    const fim = (inicio + linhas)
    return fim
}


function criaLinhas() {
    let fim = calculaPagina()
    let inicio = fim - linhas
    let index = inicio
    let body = document.createElement('tbody')
    let numLinhas = 0

    while (numLinhas < linhas) {
        if (!users[index]) {
            break
        }

        let linha = document.createElement('tr')
        linha.id = users[index].id

        let nome = document.createElement('td')
        nome.innerHTML = users[index].first_name + users[index].last_name

        let email = document.createElement('td')
        email.innerHTML = users[index].email

        let data = document.createElement('td')
        data.innerHTML = users[index].created_at

        let acoes = document.createElement('td')
        let editar = document.createElement('a')
        editar.classList.add('editar')
        editar.id = users[index].id
        editar.innerHTML = 'editar'
        editar.addEventListener('click', (event) => {
            const element = event.target
            const id = element.id 

            let linha = document.getElementById(id)
            linha.replaceChildren()

            let coluna1 = document.createElement('td')
            let label1 = document.createElement('label')
            let entrada1 = document.createElement('input')
            entrada1.value = users[id - 1].first_name + users[id - 1].last_name
            coluna1.appendChild(label1)
            coluna1.appendChild(entrada1)
            linha.appendChild(coluna1)

            let coluna2 = document.createElement('td')
            let label2 = document.createElement('label')
            let entrada2 = document.createElement('input')
            entrada2.value = users[id - 1].email
            coluna2.appendChild(label2)
            coluna2.appendChild(entrada2)
            linha.appendChild(coluna2)


            let coluna3 = document.createElement('td')
            let label3 = document.createElement('label')
            let entrada3 = document.createElement('input')
            entrada3.value = users[id - 1].created_at
            coluna3.appendChild(label3)
            coluna3.appendChild(entrada3)
            linha.appendChild(coluna3)

            let coluna4 = document.createElement('td')
            let botao = document.createElement('button')
            botao.textContent = 'Alterar'
            coluna4.appendChild(botao)
            linha.appendChild(coluna4)


            botao.addEventListener('click', (event) => {
                users[id - 1].first_name = entrada1.value
                users[id - 1].last_name = ''
                users[id - 1].email = entrada2.value
                users[id - 1].created_at = entrada3.value
            
                tabela.replaceChildren()
                criaTabela()
            })
        })

        let excluir = document.createElement('a')
        excluir.classList.add('excluir')
        excluir.id = users[index].id
        excluir.innerHTML = 'excluir'
        excluir.addEventListener('click', (event) => {
            const element = event.target
            const id = element.id

            users.splice(id - 1, 1)
            decrementaId(id)

            tabela.replaceChildren()
            index = inicio
            criaTabela()
        })


        acoes.appendChild(editar)
        acoes.appendChild(excluir)
        linha.appendChild(nome)
        linha.appendChild(email)
        linha.appendChild(data)
        linha.appendChild(acoes)
        body.appendChild(linha)
        
        index++
        numLinhas++
    }
    tabela.appendChild(body)
}

function decrementaId(id){
    while (id <= users.length) {
        users[id - 1].id--
        id++
    }
}

function pagination() {
    let pagination = document.querySelector('.pagination')
    let maxPaginas = Math.ceil(users.length / linhas)
    pagination.replaceChildren()

    if (maxPaginas) {
        setaEsquerda(pagination)

        for (let pagina = 1; pagina <= maxPaginas; pagina++) {
            let numPaginas = document.createElement('button')
            numPaginas.innerHTML = pagina

            numPaginas.addEventListener('click', () => {
                tabela.replaceChildren()
                currentPage = pagina
                criaTabela()
                
            })
            if (currentPage == pagina) {
                numPaginas.classList.add('active')
            }

            pagination.appendChild(numPaginas)
        }

        setaDireita(pagination, maxPaginas)
    }

}

function setaEsquerda(pagination) {
    let setaEsquerda = document.createElement('button')
    setaEsquerda.innerHTML = "<<"

    setaEsquerda.addEventListener('click', () => {
        if (currentPage > 1) {
            tabela.replaceChildren()
            currentPage--
            criaTabela()
        }
    })

    pagination.appendChild(setaEsquerda)
}

function setaDireita(pagination, maxPaginas) {
    let setaDireita = document.createElement('button')
    setaDireita.innerHTML = '>>'

    setaDireita.addEventListener('click', () => {
        if (currentPage < maxPaginas) {
            tabela.replaceChildren()
            currentPage++
            criaTabela()
        }
    })
    pagination.appendChild(setaDireita)
}

criaTabela()