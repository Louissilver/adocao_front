const listarOngs = () => {
  return fetch(`http://localhost:8000/ongs`)
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json()
      }
      throw new Error('Não foi possível listar as ONGs')
    })
    .then(json => {
      return json
    })
}

const detalharOngs = (id) => {
  return fetch(`http://localhost:8000/ongs/${id}`)
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json()
      }
      throw new Error('Não foi possível listar a ONGs')
    })
    .then(json => {
      return json
    })
}


export const ongService = {
  listarOngs,
  detalharOngs
}
