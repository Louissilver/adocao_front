import { solicitacao_adocaoService } from "../../service/solicitacao_adocao_service.js";

const verificarPerfil = () => {
  const token = sessionStorage.getItem("token");

  if (token == null) {
    window.location.href = "../../index.html";
  }

  const tipo_usuario = sessionStorage.getItem("tipo_usuario");

  if (tipo_usuario == "ONG") {
    window.location.href = "../ong/home.html";
  }
}

verificarPerfil();

const criarCardSolicitacao = (elemento) => {

  const linhaNovoCliente = document.createElement("div");
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
                        <li class="list-group-item">Data de solicitação: ${new Date(elemento.dataSolicitacao).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</li>
                    </ul>
                    <div class="card-body">
                        <a href="./solicitacoes/solicitacao.html?id=${elemento.id}" class="card-link">Ver mais</a>
                    </div>
                </div>
            </article>
                  `;
  linhaNovoCliente.innerHTML = conteudo;
  return linhaNovoCliente;
}

const section = document.querySelector("[data-lista-solicitacoes]");

const listarSolicitacoesDeAdocao = async () => {
  const id_associado = sessionStorage.getItem("id_tipo_pessoa");

  const solicitacoes = await solicitacao_adocaoService.listarSolicitacoes();

  const solicitacoesFiltradas = solicitacoes.filter(solicitacao => {
    if (solicitacao.id_associado == id_associado) {
      return solicitacao;
    }
  })

  solicitacoesFiltradas.forEach(elemento => {
    section.appendChild(criarCardSolicitacao(elemento));
  })
}

listarSolicitacoesDeAdocao()