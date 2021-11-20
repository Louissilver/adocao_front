import { petService } from "../../service/pet_service.js";
import { retornarIdadePet } from "../../helpers/dataHelper.js";

const verificarPerfil = () => {
  const token = sessionStorage.getItem("token");

  if (token == null) {
    window.location.href = "../../index.html";
  }

  const tipo_usuario = sessionStorage.getItem("tipo_usuario");

  if (tipo_usuario == "Associado") {
    window.location.href = "../associado/home.html";
  }
}

verificarPerfil();

const criarElemento = (elemento) => {
  const idadeCompleta = retornarIdadePet(elemento.dataNascimento);
  const div = document.createElement("div");
  const conteudo = `
            <article class="col" id=${elemento.id}>
                <div class="card">
                    <img class="img-thumbnail" src="${elemento.urlFoto}"
                        class="card-img-top" style="height: 12rem; object-fit: cover; object-position: center;" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${elemento.nome}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Espécie: ${elemento.especie} <br/> Raça: ${elemento.raca}</li>
                        <li class="list-group-item">Sexo: ${elemento.sexo} <br/> Porte: ${elemento.porte}</li>
                        <li class="list-group-item">Idade: ${idadeCompleta}</li>
                    </ul>
                    <div class="card-body">
                        <a href="./pets/pet.html?id=${elemento.id}" class="card-link">Ver mais</a>
                    </div>
                </div>
            </article>
                  `;
  div.innerHTML = conteudo;
  return div;
}

const section = document.querySelector("[data-lista-pet]");

const listarPets = async () => {
  const id_ong = sessionStorage.getItem("id_tipo_pessoa");

  const pets = await petService.listarPets();

  const petsFiltrados = pets.filter((pet) => {
    if (pet.id_ong == id_ong && !pet.adotado) {
      return pet;
    }
  })

  if (petsFiltrados.length != 0) {
    petsFiltrados.forEach(elemento => {
      section.appendChild(criarElemento(elemento));
    });
  } else {
    section.textContent = "Você não possui nenhum pet cadastrado.";
  }
}

listarPets();