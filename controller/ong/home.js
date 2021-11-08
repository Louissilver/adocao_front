import { ongService } from '../../service/ong_service.js';
import { usuarioService } from '../../service/usuario_service.js'

const h2 = document.querySelector('[data-nome]');

const render = async () => {
  const token = sessionStorage.getItem('token');
  const usuarioAtual = await usuarioService.retornarUsuarioAtual(token)
  const ong = await ongService.detalharOngs(usuarioAtual.id_tipo_pessoa)

  h2.textContent = `Seja bem vindo(a) ${ong.nome}`
}

render();