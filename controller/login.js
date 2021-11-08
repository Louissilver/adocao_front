import { autenticacaoService } from '../service/autenticacao_service.js'
import { usuarioService } from '../service/usuario_service.js'
import { ongService } from '../service/ong_service.js'
import { associadoService } from '../service/associado_service.js'
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
    sessionStorage.setItem('tipo_usuario', usuarioAtual.tipo_usuario);

    if (usuarioAtual.tipo_usuario == "ONG") {
      const ong = await ongService.detalharOngs(usuarioAtual.id_tipo_pessoa)
      window.location.href = `./ong/home.html?id=${ong.id}`
    }
    if (usuarioAtual.tipo_usuario == "Associado") {
      const associado = await associadoService.detalharAssociado(usuarioAtual.id_tipo_pessoa)
      window.location.href = `./associado/home.html?id=${associado.id}`
    }
  }
  catch (erro) {
    console.log(erro)
  }
})