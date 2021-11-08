import recuperarCEP from "../../../service/cep_service.js";
import { associadoService } from '../../../service/associado_service.js'
import { usuarioService } from '../../../service/usuario_service.js'


const render = async () => {
  const token = sessionStorage.getItem('token');
  const usuarioAtual = await usuarioService.retornarUsuarioAtual(token)
  const associado = await associadoService.detalharAssociado(usuarioAtual.id_tipo_pessoa)


  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const telefone = document.getElementById('telefone');
  const cep = document.getElementById('cep');
  const logradouro = document.getElementById('logradouro');
  const bairro = document.getElementById('bairro');
  const numero = document.getElementById('numero');
  const cidade = document.getElementById('cidade');
  const estado = document.getElementById('estado');
  const cpf = document.getElementById('cpf');
  const dataNascimento = document.getElementById('dataNascimento');

  nome.value = associado.nome
  email.value = associado.email
  telefone.value = associado.telefone
  cep.value = associado.endereco.cep
  logradouro.value = associado.endereco.logradouro
  bairro.value = associado.endereco.bairro
  numero.value = associado.endereco.numero
  cidade.value = associado.endereco.cidade
  estado.value = associado.endereco.estado
  cpf.value = associado.cpf
  dataNascimento.value = new Date(associado.dataNascimento).toISOString().split('T')[0]

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