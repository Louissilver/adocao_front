import { recuperarCEP } from "../service/cep_service.js"
import { usuarioService } from "../service/usuario_service.js"

export function validarCamposDeOng(input) {
  const tipoDeInput = input.dataset.tipo

  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input)
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove('is-invalid')
    input.classList.remove('is-invalid')
    input.parentElement.querySelector('.invalid-feedback').innerHTML = ''
  } else {
    input.parentElement.classList.add('is-invalid')
    input.classList.add('is-invalid')
    input.parentElement.querySelector('.invalid-feedback').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
  }
}

const tiposDeErro = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError'
]

const mensagensDeErro = {
  nome: {
    valueMissing: 'O campo de nome não pode estar vazio.',
    customError: 'O nome deve conter, pelo menos, três caracteres.'
  },
  email: {
    valueMissing: 'O campo de email não pode estar vazio.',
    typeMismatch: 'O email digitado não é válido.'
  },
  senha: {
    valueMissing: 'O campo de senha não pode estar vazio.',
    patternMismatch: 'A senha não contém uma das especificações informadas.'
  },
  cnpj: {
    valueMissing: 'O campo de CNPJ não pode estar vazio.',
    patternMismatch: 'O formato do CNPJ digitado não é válido.',
    customError: 'O CNPJ digitado não é válido.'
  },
  cep: {
    valueMissing: 'O campo de CEP não pode estar vazio.',
    patternMismatch: 'O formato do CEP digitado não é válido.',
    customError: 'Não foi possível buscar o CEP.'
  },
  logradouro: {
    valueMissing: 'O campo de logradouro não pode estar vazio.'
  },
  numero: {
    valueMissing: 'O campo de número não pode estar vazio.'
  },
  bairro: {
    valueMissing: 'O campo de bairro não pode estar vazio.'
  },
  cidade: {
    valueMissing: 'O campo de cidade não pode estar vazio.'
  },
  estado: {
    valueMissing: 'O campo de estado não pode estar vazio.'
  },
  telefone: {
    valueMissing: 'O campo de telefone não pode estar vazio.'
  },
  usuario: {
    customError: 'Nome de usuário já cadastrado.',
    valueMissing: 'O campo de usuário não pode estar vazio.'
  },
}

const validadores = {
  nome: input => validaNome(input),
  usuario: input => usuarioService.listarNomesDeUsuario(input),
  cnpj: input => validaCNPJ(input),
  cep: input => recuperarCEP(input)
}

function mostraMensagemDeErro(tipoDeInput, input) {
  let mensagem = ''
  tiposDeErro.forEach(erro => {
    if (input.validity[erro]) {
      mensagem = mensagensDeErro[tipoDeInput][erro]
    }
  })

  return mensagem
}

function validaNome(input) {
  const nome = input.value.trim()
  let mensagem = ''

  if (nome.length <= 3) {
    mensagem = 'O nome deve conter, pelo menos, três caracteres.'
  }

  input.setCustomValidity(mensagem)
}

function validaCNPJ(input) {

  const cnpj = input.value.replace(/[^\d]+/g, '');

  if (cnpj == '') return false;

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

  let tamanho = cnpj.length - 2
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