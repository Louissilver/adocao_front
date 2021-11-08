const detalharAssociado = (id) => {
  return fetch(`http://localhost:8000/associados/${id}`)
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json()
      }
      throw new Error('Não foi possível listar o associado')
    })
    .then(json => {
      return json
    })
}


export const associadoService = {
  detalharAssociado
}