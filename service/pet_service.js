const listarPets = () => {
  return fetch(`http://localhost:8000/pets`)
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json();
      }
      throw new Error("Não foi possível listar os pets");
    })
    .then(json => {
      return json;
    })
}

const detalhaPets = (id) => {
  return fetch(`http://localhost:8000/pets/${id}`)
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json();
      }
      throw new Error("Não foi possível listar os pets");
    })
    .then(json => {
      return json;
    })
}

const cadastrarPet = (dados) => {
  return fetch(`http://localhost:8000/pets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome: dados.nome,
      especie: dados.especie,
      porte: dados.porte,
      raca: dados.raca,
      dataNascimento: dados.dataNascimento,
      urlFoto: dados.urlFoto,
      sexo: dados.sexo,
      observacoes: dados.observacoes,
      id_ong: dados.id_ong,
      id_associado: "",
      adotado: false,
    })
  })
    .then(resposta => {
      if (resposta.ok) {
        return resposta.body;
      }
      throw new Error(resposta.body);
    })
};

const atualizarPet = (id, dados) => {
  return fetch(`http://localhost:8000/pets/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome: dados.nome,
      especie: dados.especie,
      porte: dados.porte,
      raca: dados.raca,
      dataNascimento: dados.dataNascimento,
      urlFoto: dados.urlFoto,
      sexo: dados.sexo,
      observacoes: dados.observacoes,
      id_ong: dados.id_ong,
      adotado: false
    })
  })
    .then(resposta => {
      if (resposta.ok) {
        return resposta.body;
      }
      throw new Error(resposta.body);
    })
};

const removerPet = (id) => {
  return fetch(`http://localhost:8000/pets/${id}`, {
    method: "DELETE"
  })
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error("Não foi possível deletar um pet");
      }
    })
};


export const petService = {
  listarPets,
  detalhaPets,
  cadastrarPet,
  atualizarPet,
  removerPet
};
