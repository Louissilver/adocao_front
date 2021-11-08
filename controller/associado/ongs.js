import { ongService } from '../../service/ong_service.js'

const criarElemento = (elemento) => {
  const div = document.createElement('div')
  const conteudo = `
            <article class="col" id=${elemento.id}>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">ONG ${elemento.nome}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">E-mail: ${elemento.email}</li>
                        <li class="list-group-item">Telefone: ${elemento.telefone}</li>
                        <li class="list-group-item">Localização: ${elemento.endereco.cidade} (${elemento.endereco.estado})</li>
                    </ul>
                    <div class="card-body">
                        <a href="./pets.html?id=${elemento.id}" class="card-link">Ver pets</a>
                        <a href="./ongs/ong.html?id=${elemento.id}" class="card-link">Ver mais</a>
                    </div>
                </div>
            </article>
                  `
  div.innerHTML = conteudo
  return div
}

const section = document.querySelector('[data-lista-ongs]')

const render = async () => {
  const ongs = await ongService.listarOngs();
  ongs.forEach(elemento => {
    section.appendChild(criarElemento(elemento));
  });
}

render();