import { ongService } from "../../../service/ong_service.js";
import { retornarLatitudeLongitude } from "../../../service/position_service.js";

const verificarPerfil = () => {
  const token = sessionStorage.getItem("token");

  if (token == null) {
    window.location.href = "../../../index.html";
  }

  const tipo_usuario = sessionStorage.getItem("tipo_usuario");

  if (tipo_usuario == "ONG") {
    window.location.href = "../../ong/home.html";
  }
}

verificarPerfil();

const criarElemento = (elemento, geolocalizacao) => {
  const section = document.createElement("section");
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
  <iframe src="https://maps.google.com/maps?q=${geolocalizacao.data[0].latitude},${geolocalizacao.data[0].longitude}&hl=es;z=14&amp;output=embed" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
  </div>
  </div>
                `;
  section.innerHTML = conteudo;
  return section;
}

const section = document.querySelector("[data-main-ong]");
const title = document.querySelector("[data-nome-ong]");

const detalhaOng = async () => {
  const pegaURL = new URL(window.location);
  const id = pegaURL.searchParams.get("id");
  const ong = await ongService.detalharOngs(id);
  const endereco = `${ong.endereco.numero} ${ong.endereco.logradouro}, ${ong.endereco.cidade}`;
  const geolocalizacao = await retornarLatitudeLongitude(endereco);
  section.appendChild(criarElemento(ong, geolocalizacao));
  title.textContent = `ONG: ${ong.nome}`;
}

detalhaOng()