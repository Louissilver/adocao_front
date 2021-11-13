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
        preencheCamposComCEP(data)
        return
      }
    )
  }
}

const preencheCamposComCEP = (data) => {
  const logradouro = document.getElementById('logradouro');
  const bairro = document.getElementById('bairro');
  const estado = document.getElementById('estado');
  const cidade = document.getElementById('cidade');

  logradouro.value = data.logradouro;
  cidade.value = data.localidade;
  estado.value = data.uf;
  bairro.value = data.bairro;
}

