import { ongService } from "../../service/ong_service.js";
import { validarCamposDeOng } from "../../validations/ong.js";

const verificarPerfil = () => {
  const tipo_usuario = sessionStorage.getItem("tipo_usuario");
  if (tipo_usuario == "ONG" || tipo_usuario == "Associado") {
    sessionStorage.clear();
    window.alert("Sessão encerrada!");
  }
}

verificarPerfil();

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const cnpj = document.getElementById("cnpj");
const telefone = document.getElementById("telefone");
const cep = document.getElementById("cep");
const logradouro = document.getElementById("logradouro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");
const bairro = document.getElementById("bairro");
const numero = document.getElementById("numero");
const usuario = document.getElementById("usuario");
const senha = document.getElementById("senha");
const olho = document.getElementById("olho");
const formulario = document.querySelector("[data-form]");
const inputs = document.querySelectorAll("input");

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  try {
    const dados = {
      nome: nome.value,
      email: email.value,
      cnpj: cnpj.value,
      telefone: telefone.value,
      cep: cep.value,
      logradouro: logradouro.value,
      cidade: cidade.value,
      estado: estado.value,
      bairro: bairro.value,
      numero: numero.value,
      login: usuario.value,
      senha: senha.value,
    }

    await ongService.cadastrarONG(dados);
    window.alert("ONG cadastrado com sucesso!");
  }
  catch (erro) {
    console.log(erro);
    window.alert("Erro ao cadastrar ONG!");
  }
})

export const preencherCamposComCEP = (dados) => {
  logradouro.value = dados.logradouro;
  cidade.value = dados.localidade;
  estado.value = dados.uf;
  bairro.value = dados.bairro;
};

olho.addEventListener("mousedown", function () {
  senha.type = "text";
});

olho.addEventListener("mouseup", function () {
  senha.type = "password";
});

olho.addEventListener("mousemove", function () {
  senha.type = "password";
});

inputs.forEach(input => {
  input.addEventListener("blur", (evento) => {
    validarCamposDeOng(evento.target);
  })
})
