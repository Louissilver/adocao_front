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

const cadastrarOng = (dados) => {
  return fetch(`http://localhost:8000/ongs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ong: {
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        endereco: {
          cep: dados.cep,
          logradouro: dados.logradouro,
          numero: dados.numero,
          bairro: dados.bairro,
          cidade: dados.cidade,
          estado: dados.estado,
        },
        cnpj: dados.cnpj,
      },
      usuario: {
        login: dados.login,
        senha: dados.senha,
      },
    })
  })
    .then(resposta => {
      if (resposta.ok) {
        return resposta.body
      }
      throw new Error(resposta.body)
    })
}

export const ongService = {
  listarOngs,
  detalharOngs,
  cadastrarOng
}
