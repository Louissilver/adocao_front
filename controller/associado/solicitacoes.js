import { solicitacao_adocaoService } from '../../service/solicitacao_adocao_service.js'
import { associadoService } from '../../service/associado_service.js'
import { usuarioService } from '../../service/usuario_service.js'

const criarCardSolicitacao = (elemento) => {

  const linhaNovoCliente = document.createElement('div')
  const conteudo = `
            <article class="col" id=${elemento.id}>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Solicitação ${elemento.id}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Pet: ${elemento.nome_pet}</li>
                        <li class="list-group-item">ONG: ${elemento.nome_ong}</li>
                        <li class="list-group-item">Aprovado: ${elemento.aprovado ? "Sim" : "Não"}</li>
                        <li class="list-group-item">Finalizado: ${elemento.finalizado ? "Sim" : "Não"}</li>
                        <li class="list-group-item">Data de solicitação: ${new Date(elemento.dataSolicitacao).toLocaleDateString()}</li>
                    </ul>
                    <div class="card-body">
                        <a href="./solicitacoes/solicitacao.html?id=${elemento.id}" class="card-link">Ver mais</a>
                    </div>
                </div>
            </article>
                  `
  linhaNovoCliente.innerHTML = conteudo
  return linhaNovoCliente
}

const section = document.querySelector('[data-lista-solicitacoes]')

const render = async () => {
  const token = sessionStorage.getItem('token');

  const usuarioAtual = await usuarioService.retornarUsuarioAtual(token)

  const associado = await associadoService.detalharAssociado(usuarioAtual.id_tipo_pessoa)
  const solicitacoes = await solicitacao_adocaoService.listarSolicitacoes()
  const solicitacoesFiltradas = solicitacoes.filter(solicitacao => {
    if (solicitacao.id_associado == associado.id) {
      return solicitacao
    }
  })

  solicitacoesFiltradas.forEach(elemento => {
    section.appendChild(criarCardSolicitacao(elemento))
  })
}

render()