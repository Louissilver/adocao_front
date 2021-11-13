const listarPets = () => {
  return fetch(`http://localhost:8000/pets`)
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json()
      }
      throw new Error('Não foi possível listar os pets')
    })
    .then(json => {
      return json
    })
}

const detalhaPets = (id) => {
  return fetch(`http://localhost:8000/pets/${id}`)
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json()
      }
      throw new Error('Não foi possível listar os pets')
    })
    .then(json => {
      return json
    })
}


export const petService = {
  listarPets,
  detalhaPets
}
