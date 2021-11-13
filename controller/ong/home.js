import { ongService } from '../../service/ong_service.js';

const h2 = document.querySelector('[data-nome]');

const detalharCampos = async () => {
  const id_ong = sessionStorage.getItem('id_tipo_pessoa')
  const ong = await ongService.detalharOngs(id_ong)

  h2.textContent = `Seja bem vindo(a) ${ong.nome}`
}

detalharCampos();