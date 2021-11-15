import { autenticacaoService } from '../service/autenticacao_service.js'
import { usuarioService } from '../service/usuario_service.js'
const formulario = document.querySelector('[data-form]')

document.getElementById('olho').addEventListener('mousedown', function () {
  document.getElementById('senha').type = 'text';
});

document.getElementById('olho').addEventListener('mouseup', function () {
  document.getElementById('senha').type = 'password';
});

document.getElementById('olho').addEventListener('mousemove', function () {
  document.getElementById('senha').type = 'password';
});

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault()
  try {
    const usuario = evento.target.querySelector('#usuario').value
    const senha = evento.target.querySelector('#senha').value

    const token = await autenticacaoService.autenticarUsuario(usuario, senha)

    sessionStorage.setItem('token', token.access_token);

    const usuarioAtual = await usuarioService.retornarUsuarioAtual(token.access_token)
    sessionStorage.setItem('usuario_atual', usuarioAtual.usuario_atual);
    sessionStorage.setItem('tipo_usuario', usuarioAtual.tipo_usuario);
    sessionStorage.setItem('id_tipo_pessoa', usuarioAtual.id_tipo_pessoa);
    sessionStorage.setItem('id_usuario', usuarioAtual.id_usuario);

    if (usuarioAtual.tipo_usuario == "ONG") {
      window.location.href = `./ong/home.html`
    }
    if (usuarioAtual.tipo_usuario == "Associado") {
      window.location.href = `./associado/home.html`
    }
  }
  catch (erro) {
    console.log(erro)
  }
})