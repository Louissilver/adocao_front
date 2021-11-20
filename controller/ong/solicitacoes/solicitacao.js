import { petService } from "../../../service/pet_service.js";
import { solicitacao_adocaoService } from "../../../service/solicitacao_adocao_service.js";

const verificarPerfil = () => {
  const token = sessionStorage.getItem("token");

  if (token == null) {
    window.location.href = "../../../index.html";
  }

  const tipo_usuario = sessionStorage.getItem("tipo_usuario");

  if (tipo_usuario == "Associado") {
    window.location.href = "../../associado/home.html";
  }
}

verificarPerfil();

const criarElemento = (elemento, pet) => {
  const section = document.createElement("section");
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
  <li class="list-group-item">E-mail do associado: ${elemento.email_associado}</li>
  <li class="list-group-item">Telefone do associado: ${elemento.telefone_associado}</li>
  <li class="list-group-item">Referências para adoção: ${elemento.referencias}</li>
  </ul>
  <p class="text-muted my-3">Situação</p>
  <ul class="list-group list-group-flush">
  <li class="list-group-item">Aprovado: ${elemento.aprovado ? "Sim" : "Não"}</li>
  <li class="list-group-item">Finalizado: ${elemento.finalizado ? "Sim" : "Não"}</li>
  <li class="list-group-item">Data da solicitação: ${new Date(elemento.dataSolicitacao).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</li>
  <li class="${pet.adotado && (!elemento.aprovado && !elemento.finalizado) ? "list-group-item list-group-item-danger" : ""}"> ${pet.adotado && (!elemento.aprovado && !elemento.finalizado) ? "O Pet já foi adotado através de outra solicitação" : ""}</li>  
  </ul >
  <div class="modal-footer">
    <button ${elemento.aprovado || pet.adotado ? "disabled" : "enabled"} id="aprovar" type="button" class="btn btn-primary">Aprovar</button>
    <button ${elemento.finalizado || pet.adotado ? "disabled" : "enabled"} id="finalizar" type="button" class="btn btn-primary">Finalizar</button>
    <button type="button" class="btn btn-secondary" onclick="window.history.back()">Voltar</button>
  </div>
  </div >
  </div >
  `;
  section.innerHTML = conteudo;
  return section;
}

const section = document.querySelector("[data-main-solicitacao]");

section.addEventListener("click", async (evento) => {
  let ehBotaoDeAprovar = evento.target.id === "aprovar";
  let ehBotaoDeFinalizar = evento.target.id === "finalizar";
  if (ehBotaoDeAprovar) {
    const pegaURL = new URL(window.location);
    const id = pegaURL.searchParams.get("id");
    await solicitacao_adocaoService.aprovarSolicitacao(id);
    window.alert("Solicitação aprovada com sucesso!");
    location.reload();
  }
  if (ehBotaoDeFinalizar) {
    const pegaURL = new URL(window.location);
    const id = pegaURL.searchParams.get("id");
    await solicitacao_adocaoService.finalizarSolicitacao(id);
    window.alert("Solicitação finalizada com sucesso!");
    location.reload();
  }
})

const detalharSolicitacao = async () => {

  const pegaURL = new URL(window.location);

  const id = pegaURL.searchParams.get("id");

  const solicitacao = await solicitacao_adocaoService.detalharSolicitacao(id);
  const pet = await petService.detalhaPets(solicitacao.id_pet);
  section.appendChild(criarElemento(solicitacao, pet));
}

detalharSolicitacao();