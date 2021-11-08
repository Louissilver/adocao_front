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


export const solicitacao_adocaoService = {
  listarSolicitacoes,
  detalharSolicitacao
}
