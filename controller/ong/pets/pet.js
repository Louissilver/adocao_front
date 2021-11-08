import { ongService } from '../../../service/ong_service.js';
import { petService } from '../../../service/pet_service.js'

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

  const section = document.createElement('section')
  const conteudo = `
    <div class="modal-header">
    <div>
      <h5 class="display-6 mt-5">${elemento.nome}</h5>
      <div class="card">
        <div class="card-body">
          <p class="card-text">${elemento.observacoes}</p>
        </div>
      </div>
    </div>
    <img
      src="${elemento.urlFoto}"
      class="img-fluid img-thumbnail" alt="..."
      style="height: 25rem; object-fit: cover; object-position: center;">
  </div>
  <div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Espécie: ${elemento.especie}</li>
      <li class="list-group-item">Raça: ${elemento.raca}</li>
      <li class="list-group-item">Sexo: ${elemento.sexo}</li>
      <li class="list-group-item">Porte: ${elemento.porte}</li>
      <li class="list-group-item">Idade: ${idade_anos_string}${idade_meses_string}</li>
      <li class="list-group-item">Data de nascimento: ${new Date(elemento.dataNascimento).toLocaleDateString()}</li>
    </ul>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" onclick="window.history.back()">Voltar</button>
  </div>
                  `
  section.innerHTML = conteudo
  return section
}

const section = document.querySelector('[data-main-pet]');

const render = async () => {

  const pegaURL = new URL(window.location)

  const id = pegaURL.searchParams.get('id')

  const pet = await petService.detalhaPets(id)
  section.appendChild(criarElemento(pet))

  console.log(pet.id_ong)
  const ong = await ongService.detalharOngs(pet.id_ong)
}

render()