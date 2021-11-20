import { associadoService } from "../../service/associado_service.js";
import { petService } from "../../service/pet_service.js";
import { retornarIdadePet } from "../../helpers/dataHelper.js";

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
                        <a href="../associado/pets/pet.html?id=${elemento.id}" class="card-link">Ver mais</a>
                    </div>
                </div>
            </article>
                  `;
  div.innerHTML = conteudo;
  return div;
}

const section = document.querySelector("[data-lista-pets]");
const h2 = document.querySelector("[data-nome]");

const detalharHome = async () => {
  const id_associado = sessionStorage.getItem("id_tipo_pessoa");
  const associado = await associadoService.detalharAssociado(id_associado);

  const pets = await petService.listarPets();

  const petsFiltrados = pets.filter((pet) => {
    if (pet.id_associado == id_associado) {
      return pet;
    }
  })

  h2.textContent = `Seja bem vindo(a) ${associado.nome}`;

  petsFiltrados.forEach(elemento => {
    section.appendChild(criarElemento(elemento));
  });
}

detalharHome();