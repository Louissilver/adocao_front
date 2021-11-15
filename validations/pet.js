export function validarCamposDePet(input) {
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
    customError: "O nome deve conter, pelo menos, 2 caracteres."
  },
  especie: {
    valueMissing: "O campo espécie é obrigatório.",
    customError: "A espécie deve conter, pelo menos, 3 caracteres."
  },
  raca: {
    valueMissing: "O campo raça é obrigatório.",
    customError: "A raça deve conter, pelo menos, 3 caracteres."
  },
  dataNascimento: {
    valueMissing: "O campo data de nascimento é obrigatório.",
    customError: "A data informada não pode ser maior que a atual."
  },
  urlFoto: {
    valueMissing: "O campo url de imagem é obrigatório.",
    patternMismatch: "A URL informada não é válida. Tente um exemplo como 'https://www.google.com.br/'",
  },
}

const validadores = {
  nome: input => validaNome(input),
  especie: input => validaEspecie(input),
  raca: input => validaRaca(input),
  dataNascimento: input => validaDataNascimento(input),
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
    mensagem = 'O nome deve conter, pelo menos, três caracteres.'
  }

  input.setCustomValidity(mensagem)
}

function validaEspecie(input) {
  const especie = input.value.trim()
  let mensagem = ''

  if (especie.length < 2) {
    mensagem = 'O nome deve conter, pelo menos, 2 caracteres.'
  }

  input.setCustomValidity(mensagem)
}

function validaRaca(input) {
  const raca = input.value.trim()
  let mensagem = ''

  if (raca.length < 2) {
    mensagem = 'O nome deve conter, pelo menos, 2 caracteres.'
  }

  input.setCustomValidity(mensagem)
}

function validaDataNascimento(input) {
  const dataRecebida = new Date(input.value)
  let mensagem = ''

  if (!maiorQueAtual(dataRecebida)) {
    mensagem = 'A data informada não pode ser maior que a atual.'
  }

  input.setCustomValidity(mensagem)
}

function maiorQueAtual(data) {
  const dataAtual = new Date()
  const dataInformada = new Date(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate())

  return dataInformada <= dataAtual
}