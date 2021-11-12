import { preencherCamposComCEP } from '../controller/cadastro/associado.js'

export function recuperarCEP(input) {
  const cep = input.value.replace(/\D/g, '')
  const url = `https://viacep.com.br/ws/${cep}/json/`
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json;charset=utf-8'
    }
  }

  if (!input.validity.patternMismatch && !input.validity.valueMissing) {
    fetch(url, options).then(
      response => response.json()
    ).then(
      data => {
        if (data.erro) {
          input.setCustomValidity('Não foi possível buscar o CEP.')
          return
        }
        input.setCustomValidity('')
        preencherCamposComCEP(data)
        return
      }
    )
  }
}


