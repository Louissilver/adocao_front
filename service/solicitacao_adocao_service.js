const listarSolicitacoes = () => {
  return fetch(`http://localhost:8000/adocao/solicitacoes`)
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json()
      }
      throw new Error('Não foi possível listar as solicitações')
    })
    .then(json => {
      return json
    })
}

const detalharSolicitacao = (id) => {
  return fetch(`http://localhost:8000/adocao/solicitacoes/${id}`)
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json()
      }
      throw new Error('Não foi possível listar a solicitação')
    })
    .then(json => {
      return json
    })
}

const cadastrarSolicitacao = (dados) => {
  return fetch(`http://localhost:8000/adocao/solicitacoes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_associado: dados.id_associado,
      id_ong: dados.id_ong,
      id_pet: dados.id_pet,
      nome_pet: dados.nome_pet,
      nome_ong: dados.nome_ong,
      cnpj_ong: dados.cnpj_ong,
      nome_associado: dados.nome_associado,
      cpf_associado: dados.cpf_associado,
      referencias: dados.referencias,
    })
  })
    .then(resposta => {
      if (resposta.ok) {
        return resposta.body
      }
      throw new Error(resposta.body)
    })
}

const aprovarSolicitacao = (id) => {
  return fetch(`http://localhost:8000/adocao/solicitacoes/aprovar/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(resposta => {
      if (resposta.ok) {
        return resposta.body
      }
      throw new Error(resposta.body)
    })
}

const finalizarSolicitacao = (id) => {
  return fetch(`http://localhost:8000/adocao/solicitacoes/finalizar/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(resposta => {
      if (resposta.ok) {
        return resposta.body
      }
      throw new Error(resposta.body)
    })
}


export const solicitacao_adocaoService = {
  listarSolicitacoes,
  detalharSolicitacao,
  cadastrarSolicitacao,
  aprovarSolicitacao,
  finalizarSolicitacao
}
