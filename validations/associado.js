import { recuperarCEP } from "../service/cep_service.js"
import { usuarioService } from "../service/usuario_service.js"

export function validarCamposDeAssociado(input) {
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
    valueMissing: "O campo nome é obrigatório.",
    customError: "O nome deve conter, pelo menos, 3 caracteres."
  },
  email: {
    valueMissing: "O campo e-mail é obrigatório.",
    typeMismatch: "O e-mail informado não é válido. Tente o formato 'email@example.com'"
  },
  senha: {
    valueMissing: 'O campo de senha não pode estar vazio.',
    patternMismatch: 'A senha não contém uma das especificações informadas.'
  },
  dataNascimento: {
    valueMissing: 'O campo data de nascimento é obrigatório.',
    customError: 'A idade para cadastro deve ser maior que 18 anos.'
  },
  cpf: {
    valueMissing: 'O campo CPF é obrigatório.',
    patternMismatch: 'O CPF informado não é válido. Tente o formato "XXX.XXX.XXX-XX"',
    customError: 'O CPF digitado não é válido.'
  },
  cep: {
    valueMissing: 'O campo CEP é obrigatório.',
    patternMismatch: "O CEP informado não é válido. Tente o formato 'XXXXX-XXX'",
    customError: 'Não foi possível buscar o CEP.'
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
    customError: 'Nome de usuário já cadastrado.',
    valueMissing: 'O campo de usuário não pode estar vazio.'
  },
}

const validadores = {
  nome: input => validaNome(input),
  usuario: input => usuarioService.listarNomesDeUsuario(input),
  dataNascimento: input => validaDataNascimento(input),
  cpf: input => validaCPF(input),
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

  if (nome.length < 3) {
    mensagem = "O nome deve conter, pelo menos, 3 caracteres."
  }

  input.setCustomValidity(mensagem)
}

function validaDataNascimento(input) {
  const dataRecebida = new Date(input.value)
  let mensagem = ''

  if (!maiorQue18(dataRecebida)) {
    mensagem = 'Você deve ser maior que 18 anos para se cadastrar.'
  }

  input.setCustomValidity(mensagem)
}

function maiorQue18(data) {
  const dataAtual = new Date()
  const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

  return dataMais18 <= dataAtual
}

function validaCPF(input) {
  const cpfFormatado = input.value.replace(/\D/g, '')
  let mensagem = ''

  if (!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)) {
    mensagem = 'O CPF digitado não é válido.'
  }

  input.setCustomValidity(mensagem)
}

function checaCPFRepetido(cpf) {
  const valoresRepetidos = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
  ]
  let cpfValido = true

  valoresRepetidos.forEach(valor => {
    if (valor == cpf) {
      cpfValido = false
    }
  })

  return cpfValido
}

function checaEstruturaCPF(cpf) {
  const multiplicador = 10

  return checaDigitoVerificador(cpf, multiplicador)
}

function checaDigitoVerificador(cpf, multiplicador) {
  if (multiplicador >= 12) {
    return true
  }

  let multiplicadorInicial = multiplicador
  let soma = 0
  const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('')
  const digitoVerificador = cpf.charAt(multiplicador - 1)
  for (let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
    soma = soma + cpfSemDigitos[contador] * multiplicadorInicial
    contador++
  }

  if ((digitoVerificador == confirmaDigito(soma)) || (digitoVerificador == 0 && confirmaDigito(soma) == 10)) {
    return checaDigitoVerificador(cpf, multiplicador + 1)
  }

  return false
}

function confirmaDigito(soma) {
  return 11 - (soma % 11)
}