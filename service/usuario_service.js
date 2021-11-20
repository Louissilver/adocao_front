const retornarUsuarioAtual = (token) => {
  return fetch(`http://localhost:8000/usuario/atual?token=${token}`)
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json();
      }
      throw new Error("Não foi possível retornar o usuário atual");
    })
    .then(json => {
      return json;
    })
};

const listarNomesDeUsuario = (input) => {
  const nomeUsuario = input.value;
  const usuario_atual = sessionStorage.getItem("usuario_atual");

  const url = `http://localhost:8000/usuarios/existe/${nomeUsuario}`;
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8"
    }
  };

  if (!input.validity.patternMismatch && !input.validity.valueMissing) {

    return fetch(url, options)
      .then(resposta => resposta.json()
      )
      .then(data => {
        if (data == nomeUsuario && !(data == usuario_atual)) {
          input.setCustomValidity("O nome de usuário já está em uso.");
          return
        }
        input.setCustomValidity("");
        return;
      })
  }
};

const atualizarUsuario = (id, dados) => {
  return fetch(`http://localhost:8000/usuarios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      login: dados.login,
      senha: dados.senha,
    })
  })
    .then(resposta => {
      if (resposta.ok) {
        return resposta.body;
      }
      throw new Error(resposta.body);
    })
};

export const usuarioService = {
  retornarUsuarioAtual,
  listarNomesDeUsuario,
  atualizarUsuario
};
