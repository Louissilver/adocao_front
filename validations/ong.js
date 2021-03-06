import { recuperarCEP } from "../service/cep_service.js";
import { usuarioService } from "../service/usuario_service.js";

export function validarCamposDeOng(input) {
  const tipoDeInput = input.dataset.tipo;

  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("is-invalid");
    input.classList.remove("is-invalid");
    input.parentElement.querySelector(".invalid-feedback").innerHTML = "";
  } else {
    input.parentElement.classList.add("is-invalid");
    input.classList.add("is-invalid");
    input.parentElement.querySelector(".invalid-feedback").innerHTML = mostraMensagemDeErro(tipoDeInput, input);
  }
}

const tiposDeErro = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError"
];

const mensagensDeErro = {
  cnpj: {
    valueMissing: "O campo CNPJ é obrigatório.",
    patternMismatch: "O CNPJ informado não é válido. Tente o formato 'XX.XXX.XXX/XXXX-XX'",
    customError: "O CNPJ digitado não é válido."
  },
  nome: {
    valueMissing: "O campo nome é obrigatório.",
    customError: "O nome deve conter, pelo menos, 3 caracteres."
  },
  email: {
    valueMissing: "O campo e-mail é obrigatório.",
    typeMismatch: "O e-mail informado não é válido. Tente o formato 'email@example.com'"
  },
  senha: {
    valueMissing: "O campo de senha não pode estar vazio.",
    patternMismatch: "A senha não contém uma das especificações informadas."
  },
  cep: {
    valueMissing: "O campo CEP é obrigatório.",
    patternMismatch: "O CEP informado não é válido. Tente o formato 'XXXXX-XXX'",
    customError: "Não foi possível buscar o CEP."
  },
  logradouro: {
    valueMissing: "O campo logradouro é obrigatório."
  },
  numero: {
    valueMissing: "O campo numero é obrigatório."
  },
  bairro: {
    valueMissing: "O campo bairro é obrigatório."
  },
  cidade: {
    valueMissing: "O campo cidade é obrigatório."
  },
  estado: {
    valueMissing: "O campo estado é obrigatório."
  },
  telefone: {
    valueMissing: "O campo telefone é obrigatório."
  },
  usuario: {
    customError: "Nome de usuário já cadastrado.",
    valueMissing: "O campo de usuário não pode estar vazio."
  },
};

const validadores = {
  nome: input => validaNome(input),
  usuario: input => usuarioService.listarNomesDeUsuario(input),
  cnpj: input => validaCNPJ(input),
  cep: input => recuperarCEP(input)
}

function mostraMensagemDeErro(tipoDeInput, input) {
  let mensagem = "";
  tiposDeErro.forEach(erro => {
    if (input.validity[erro]) {
      mensagem = mensagensDeErro[tipoDeInput][erro];
    }
  })

  return mensagem;
}

function validaNome(input) {
  const nome = input.value.trim();
  let mensagem = "";

  if (nome.length < 3) {
    mensagem = "O nome deve conter, pelo menos, três caracteres.";
  }

  input.setCustomValidity(mensagem);
}

function validaCNPJ(input) {

  const cnpj = input.value.replace(/[^\d]+/g, "");

  if (cnpj == "") return false;

  if (cnpj.length != 14)
    return false;

  if (cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999")
    return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0))
    return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1))
    return false;

  return true;

}