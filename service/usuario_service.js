const retornarUsuarioAtual = (token) => {
  return fetch(`http://localhost:8000/usuario/atual?token=${token}`)
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json()
      }
      throw new Error('Não foi possível retornar o usuário atual')
    })
    .then(json => {
      return json
    })
}

const listarNomesDeUsuario = (input) => {
  const nomeUsuario = input.value

  const url = `http://localhost:8000/usuarios/existe/${nomeUsuario}`
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json;charset=utf-8'
    }
  }

  if (!input.validity.patternMismatch && !input.validity.valueMissing) {

    return fetch(url, options)
      .then(resposta => resposta.json()
      )
      .then(data => {
        if (data == nomeUsuario) {
          input.setCustomValidity('O nome de usuário já está em uso.')
          return
        }
        input.setCustomValidity('')
        return
      })
  }
}

export const usuarioService = {
  retornarUsuarioAtual,
  listarNomesDeUsuario
}
