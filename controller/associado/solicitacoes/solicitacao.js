import { solicitacao_adocaoService } from '../../../service/solicitacao_adocao_service.js';

const criarElemento = (elemento) => {
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
  <li class="list-group-item">E-mail da ONG: ${elemento.email_ong}</li>
  <li class="list-group-item">Telefone da ONG: ${elemento.telefone_ong}</li>
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
  <li class="list-group-item">Data da solicitação: ${new Date(elemento.dataSolicitacao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</li>
  </ul>
  <div class="modal-footer">
  <button type="button" class="btn btn-secondary" onclick="window.history.back()">Voltar</button>
  <button type="button" id="excluir" class="btn btn-danger">Excluir solicitação</button>
  </div>
  </div>
  </div>
                `
  section.innerHTML = conteudo
  return section
}

const section = document.querySelector('[data-main-solicitacao]');

section.addEventListener('click', async (evento) => {
  let ehBotaoDeExcluir = evento.target.id === 'excluir'
  if (ehBotaoDeExcluir) {

    let resultado = window.confirm("Deseja mesmo excluir essa solicitação?")
    if (resultado) {
      const pegaURL = new URL(window.location)
      const id = pegaURL.searchParams.get('id')
      await solicitacao_adocaoService.removerSolicitacao(id)
      window.location.href = '../solicitacoes.html'
    } else {
      return
    }
  }
})

const detalhaSolicitacao = async () => {

  const pegaURL = new URL(window.location)

  const id = pegaURL.searchParams.get('id')

  const solicitacao = await solicitacao_adocaoService.detalharSolicitacao(id)
  section.appendChild(criarElemento(solicitacao))
}
const verificarPerfil = () => {
  const token = sessionStorage.getItem("token")

  if (token == null) {
    window.location.href = '../../../index.html';
  }

  const tipo_usuario = sessionStorage.getItem("tipo_usuario")

  if (tipo_usuario == "ONG") {
    window.location.href = "../../ong/home.html";
  }
}

verificarPerfil()
detalhaSolicitacao()