import { solicitacao_adocaoService } from '../../../service/solicitacao_adocao_service.js';

const criarElemento = (elemento) => {
  console.log(elemento)
  const section = document.createElement('section')
  const conteudo = `
  <div class="container-fluid">
  <p class="text-muted my-3">Pet</p>
  <ul class="list-group list-group-flush">
  <li class="list-group-item">Nome do pet: ${elemento.nome_pet}</li>
  </ul>
  <p class="text-muted my-3">ONG</p>
  <ul class="list-group list-group-flush">
  <li class="list-group-item">Nome da ONG: ${elemento.nome_ong}</li>
  <li class="list-group-item">CNPJ da ONG: ${elemento.cnpj_ong}</li>
  </ul>
  <p class="text-muted my-3">Associado</p>
  <ul class="list-group list-group-flush">
  <li class="list-group-item">Nome do associado: ${elemento.nome_associado}</li>
  <li class="list-group-item">CPF do associado: ${elemento.cpf_associado}</li>
  <li class="list-group-item">Referências para adoção: ${elemento.referencias}</li>
  </ul>
  <p class="text-muted my-3">Situação</p>
  <ul class="list-group list-group-flush">
  <li class="list-group-item">Aprovado: ${elemento.aprovado ? "Sim" : "Não"}</li>
  <li class="list-group-item">Finalizado: ${elemento.finalizado ? "Sim" : "Não"}</li>
  <li class="list-group-item">Data da solicitação: ${new Date(elemento.dataSolicitacao).toLocaleDateString()}</li>
  </ul>
  <div class="modal-footer">
  <button type="button" class="btn btn-secondary" onclick="window.history.back()">Voltar</button>
  </div>
  </div>
  </div>
                `
  section.innerHTML = conteudo
  return section
}

const section = document.querySelector('[data-main-solicitacao]');

const render = async () => {

  const pegaURL = new URL(window.location)

  const id = pegaURL.searchParams.get('id')

  const solicitacao = await solicitacao_adocaoService.detalharSolicitacao(id)
  section.appendChild(criarElemento(solicitacao))
}

render()