import { ongService } from '../../service/ong_service.js';

const h2 = document.querySelector('[data-nome]');

const detalharCampos = async () => {
  const id_ong = sessionStorage.getItem('id_tipo_pessoa')
  const ong = await ongService.detalharOngs(id_ong)

  h2.textContent = `Seja bem vindo(a) ${ong.nome}`
}

const verificarPerfil = () => {
  const token = sessionStorage.getItem("token")

  if (token == null) {
    window.location.href = '../../index.html';
  }

  const tipo_usuario = sessionStorage.getItem("tipo_usuario")

  if (tipo_usuario == "Associado") {
    window.location.href = "../associado/home.html";
  }
}

verificarPerfil()
detalharCampos();