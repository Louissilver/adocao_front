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


export const usuarioService = {
  retornarUsuarioAtual,
}
