import recuperarCEP from "../../../service/cep_service.js";
import { ongService } from '../../../service/ong_service.js'
import { usuarioService } from '../../../service/usuario_service.js'


const render = async () => {
  const token = sessionStorage.getItem('token');
  const usuarioAtual = await usuarioService.retornarUsuarioAtual(token)
  const ong = await ongService.detalharOngs(usuarioAtual.id_tipo_pessoa)


  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const telefone = document.getElementById('telefone');
  const cep = document.getElementById('cep');
  const logradouro = document.getElementById('logradouro');
  const bairro = document.getElementById('bairro');
  const numero = document.getElementById('numero');
  const cidade = document.getElementById('cidade');
  const estado = document.getElementById('estado');
  const cnpj = document.getElementById('cnpj');

  nome.value = ong.nome
  email.value = ong.email
  telefone.value = ong.telefone
  cep.value = ong.endereco.cep
  logradouro.value = ong.endereco.logradouro
  bairro.value = ong.endereco.bairro
  numero.value = ong.endereco.numero
  cidade.value = ong.endereco.cidade
  estado.value = ong.endereco.estado
  cnpj.value = ong.cnpj

}

render();

const preencheCamposComCEP = (data) => {
  const logradouro = document.getElementById('logradouro');
  const cidade = document.getElementById('cidade');
  const estado = document.getElementById('estado');
  const bairro = document.getElementById('bairro');

  logradouro.value = data.logradouro;
  cidade.value = data.localidade;
  estado.value = data.uf;
  bairro.value = data.bairro;
}


const renderCep = async (input) => {
  const data = await recuperarCEP(input);
  preencheCamposComCEP(data);
}

const cep = document.querySelector('#cep')

cep.addEventListener('blur', (evento) => {
  renderCep(evento.target)
})