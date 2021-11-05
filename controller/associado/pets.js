import { petService } from '../../service/pet_service.js'

const criarCardPet = (elemento) => {

    var data = new Date(elemento.dataNascimento)
    var ano_atual = new Date().getFullYear();
    var mes_atual = new Date().getMonth();
    var idade_anos = ano_atual - data.getFullYear()
    var idade_meses = mes_atual - data.getMonth()
    var idade_anos_string = `${idade_anos} anos`
    var idade_meses_string = ` ${idade_meses} meses`
    if (idade_anos == 0) {
        idade_anos_string = ''
    }
    if (idade_meses == 0) {
        idade_meses_string = ''
    }
    if (idade_anos == 1) {
        idade_anos_string = `${idade_anos} ano`
    }
    if (idade_meses == 1) {
        idade_meses_string = ` ${idade_meses} mês`
    }

    const linhaNovoCliente = document.createElement('div')
    const conteudo = `
            <article class="col" id=${elemento.id}>
                <div class="card">
                    <img class="img-thumbnail" src="${elemento.urlFoto}"
                        class="card-img-top" style="height: 12rem; object-fit: cover; object-position: center;" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${elemento.nome}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Espécie: ${elemento.especie} <br/> Raça: ${elemento.raca}</li>
                        <li class="list-group-item">Sexo: ${elemento.sexo} <br/> Porte: ${elemento.porte}</li>
                        <li class="list-group-item">Idade: ${idade_anos_string}${idade_meses_string}</li>
                    </ul>
                    <div class="card-body">
                        <a href="../associado/pet.html?id=${elemento.id}" class="card-link">Ver mais</a>
                    </div>
                </div>
            </article>
                  `
    linhaNovoCliente.innerHTML = conteudo
    return linhaNovoCliente
}

const section = document.querySelector('[data-lista-pet]')

const render = async () => {

    const listaPets = await petService.listaPets()
    listaPets.forEach(elemento => {
        section.appendChild(criarCardPet(elemento))
    })


}

render()