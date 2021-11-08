const autenticarUsuario = (usuario, senha) => {
  return fetch(`http://localhost:8000/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      login: usuario,
      senha: senha
    })
  })
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json()
      }
      throw new Error('Não foi possível realizar a autenticação')
    })
    .then(json => {
      return json
    })
}


export const autenticacaoService = {
  autenticarUsuario,
}
