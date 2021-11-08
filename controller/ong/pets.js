import { petService } from '../../service/pet_service.js'
import { usuarioService } from '../../service/usuario_service.js'
import { ongService } from '../../service/ong_service.js'

const criarElemento = (elemento) => {

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

  const div = document.createElement('div')
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
                        <a href="./pets/pet.html?id=${elemento.id}" class="card-link">Ver mais</a>
                    </div>
                </div>
            </article>
                  `
  div.innerHTML = conteudo
  return div
}

const section = document.querySelector('[data-lista-pet]')

const render = async () => {
  const token = sessionStorage.getItem('token');

  const usuarioAtual = await usuarioService.retornarUsuarioAtual(token)

  const ong = await ongService.detalharOngs(usuarioAtual.id_tipo_pessoa)

  const pets = await petService.listarPets();

  const petsFiltrados = pets.filter((pet) => {
    if (pet.id_ong == ong.id && !pet.adotado) {
      return pet
    }
  })

  if (petsFiltrados.length != 0) {
    petsFiltrados.forEach(elemento => {
      section.appendChild(criarElemento(elemento));
    });
  } else {
    section.textContent = "Você não possui nenhum pet cadastrado."
  }
}

render();