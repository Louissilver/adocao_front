import { ongService } from '../../../service/ong_service.js';

const criarElemento = (elemento) => {
  const section = document.createElement('section')
  const conteudo = `
  <div class="container-fluid">
  <div class="modal-header">
  <div>
  <p class="text-muted my-3">Contato</p>
  <ul class="list-group list-group-flush">
  <li class="list-group-item">E-mail: ${elemento.email}</li>
  <li class="list-group-item">Telefone: ${elemento.telefone}</li>
  </ul>
  <p class="text-muted my-3">Endereço</p>
  <ul class="list-group list-group-flush">
  <li class="list-group-item">${elemento.endereco.logradouro}, ${elemento.endereco.numero} - Bairro ${elemento.endereco.bairro}, ${elemento.endereco.cidade} - ${elemento.endereco.estado}, ${elemento.endereco.cep}</li>
  </ul>
  <div class="modal-footer">
  <button type="button" class="btn btn-secondary" onclick="window.history.back()">Voltar</button>
  </div>
  </div>
  <div>
  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13844.148064968642!2d-51.1689972!3d-29.834353299999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1636234685660!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
  </div>
  </div>
                `
  section.innerHTML = conteudo
  return section
}

const section = document.querySelector('[data-main-ong]');
const title = document.querySelector('[data-nome-ong]');

const render = async () => {

  const pegaURL = new URL(window.location)

  const id = pegaURL.searchParams.get('id')

  const ong = await ongService.detalharOngs(id)
  section.appendChild(criarElemento(ong))
  title.textContent = `ONG: ${ong.nome}`
}

render()