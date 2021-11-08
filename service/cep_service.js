function recuperarCEP(input) {
  const cep = input.value.replace(/\D/g, '')
  const url = `https://viacep.com.br/ws/${cep}/json/`
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json;charset=utf-8'
    }
  }

  return fetch(url, options)
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json()
      }
      throw new Error('Não foi possível listar os pets')
    })
    .then(json => {
      return json
    }
    )

}

export default recuperarCEP;
