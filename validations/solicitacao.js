export function validarCamposDeSolicitacao(input) {
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
  referencias: {
    valueMissing: "O campo referencias é obrigatório.",
    customError: "As referências informadas devem conter, pelo menos, 30 caracteres e espaços, formando um texto."
  }
}

const validadores = {
  referencias: input => validaReferencias(input),
}

function validaReferencias(input) {
  const referencias = input.value.trim()
  let mensagem = ''
  if (!input.validity.valueMissing) {

    if (referencias.length < 30 || !(referencias.indexOf(' ') >= 0)) {
      mensagem = "As referências informadas devem conter, pelo menos, 30 caracteres e espaços, formando um texto."
    }
  }

  input.setCustomValidity(mensagem)
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