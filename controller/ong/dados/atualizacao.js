import { validarCamposDeOng } from "../../../validations/ong.js";
import { ongService } from '../../../service/ong_service.js'

const cep = document.getElementById('cep')
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const telefone = document.getElementById('telefone');
const logradouro = document.getElementById('logradouro');
const bairro = document.getElementById('bairro');
const numero = document.getElementById('numero');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const cnpj = document.getElementById('cnpj');
const formulario = document.querySelector('[data-form]')
const inputs = document.querySelectorAll('input')

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault()
  const id_tipo_pessoa = sessionStorage.getItem('id_tipo_pessoa')
  try {
    const dados = {
      nome: nome.value,
      email: email.value,
      cnpj: cnpj.value,
      telefone: telefone.value,
      cep: cep.value,
      logradouro: logradouro.value,
      cidade: cidade.value,
      estado: estado.value,
      bairro: bairro.value,
      numero: numero.value,
    }

    await ongService.atualizarOng(id_tipo_pessoa, dados)
    window.alert("ONG alterada com sucesso!")
  }
  catch (erro) {
    console.log(erro)
    window.alert("Erro ao cadastrar ONG!")
  }
})

const detalharCampos = async () => {
  const id_ong = sessionStorage.getItem('id_tipo_pessoa')
  const ong = await ongService.detalharOngs(id_ong)

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

inputs.forEach(input => {
  input.addEventListener('blur', (evento) => {
    validarCamposDeOng(evento.target)
  })
})

detalharCampos();