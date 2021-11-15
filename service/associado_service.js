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

const cadastrarAssociado = (dados) => {
  return fetch(`http://localhost:8000/associados`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      associado: {
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
        cpf: dados.cpf,
        dataNascimento: dados.dataNascimento,
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

const atualizarAssociado = (id, dados) => {
  return fetch(`http://localhost:8000/associados/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      animaisAdotados: [],
      endereco: {
        cep: dados.cep,
        logradouro: dados.logradouro,
        numero: dados.numero,
        bairro: dados.bairro,
        cidade: dados.cidade,
        estado: dados.estado,
      },
      cpf: dados.cpf,
      dataNascimento: dados.dataNascimento,
    })
  })
    .then(resposta => {
      if (resposta.ok) {
        return resposta.body
      }
      throw new Error(resposta.body)
    })
}


export const associadoService = {
  detalharAssociado,
  cadastrarAssociado,
  atualizarAssociado
}