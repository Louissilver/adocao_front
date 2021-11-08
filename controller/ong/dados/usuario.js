import { usuarioService } from '../../../service/usuario_service.js'

document.getElementById('olho').addEventListener('mousedown', function () {
  document.getElementById('senha').type = 'text';
});

document.getElementById('olho').addEventListener('mouseup', function () {
  document.getElementById('senha').type = 'password';
});

document.getElementById('olho').addEventListener('mousemove', function () {
  document.getElementById('senha').type = 'password';
});

const render = async () => {
  const token = sessionStorage.getItem('token');
  const usuarioAtual = await usuarioService.retornarUsuarioAtual(token)

  const usuario = document.getElementById('usuario');

  usuario.value = usuarioAtual.usuario_atual
}

render();