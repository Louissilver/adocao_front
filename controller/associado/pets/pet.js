import { ongService } from "../../../service/ong_service.js";
import { petService } from "../../../service/pet_service.js";
import { retornarIdadePet } from "../../../helpers/dataHelper.js";

const verificarPerfil = () => {
  const token = sessionStorage.getItem("token");

  if (token == null) {
    window.location.href = "../../../index.html";
  }

  const tipo_usuario = sessionStorage.getItem("tipo_usuario");

  if (tipo_usuario == "ONG") {
    window.location.href = "../../ong/home.html";
  }
};
verificarPerfil();

const section = document.querySelector("[data-main-pet]");
const title = document.querySelector("[data-nome-ong]");

const criarElemento = (elemento) => {
  const idadeCompleta = retornarIdadePet(elemento.dataNascimento);
  const section = document.createElement("section");
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
      <li class="list-group-item">Idade: ${idadeCompleta}</li>
      <li class="list-group-item">Data de nascimento: ${new Date(elemento.dataNascimento).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</li>
    </ul>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" onclick="window.history.back()">Voltar</button>
    <button type="button" class="btn btn-primary" onclick="location.href='../solicitacoes/cadastro.html?id_pet=${elemento.id}';">Solicitar adoção</button>
  </div>
                  `;
  section.innerHTML = conteudo;
  return section;
}

const detalhaPet = async () => {

  const pegaURL = new URL(window.location);

  const id = pegaURL.searchParams.get("id");

  const pet = await petService.detalhaPets(id);
  section.appendChild(criarElemento(pet));

  const ong = await ongService.detalharOngs(pet.id_ong);
  title.textContent = `ONG: ${ong.nome}`;
};

detalhaPet();