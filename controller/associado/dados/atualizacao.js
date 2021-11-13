import { validarCamposDeAssociado } from "../../../validations/associado.js";
import { associadoService } from '../../../service/associado_service.js'

const cep = document.getElementById('cep')
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const telefone = document.getElementById('telefone');
const logradouro = document.getElementById('logradouro');
const bairro = document.getElementById('bairro');
const numero = document.getElementById('numero');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const cpf = document.getElementById('cpf');
const dataNascimento = document.getElementById('dataNascimento');
const formulario = document.querySelector('[data-form]')
const inputs = document.querySelectorAll('input')

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault()
  try {
    const dados = {
      nome: nome.value,
      email: email.value,
      cpf: cpf.value,
      telefone: telefone.value,
      dataNascimento: new Date(dataNascimento.value).toLocaleDateString(),
      cep: cep.value,
      logradouro: logradouro.value,
      cidade: cidade.value,
      estado: estado.value,
      bairro: bairro.value,
      numero: numero.value,
    }

    await associadoService.atualizarAssociado(dados)
    window.alert("Associado cadastrado com sucesso!")
  }
  catch (erro) {
    console.log(erro)
    window.alert("Erro ao cadastrar associado!")
  }
})

const detalharCampos = async () => {
  const id_associado = sessionStorage.getItem('id_tipo_pessoa')
  const associado = await associadoService.detalharAssociado(id_associado)

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

inputs.forEach(input => {
  input.addEventListener('blur', (evento) => {
    validarCamposDeAssociado(evento.target)
  })
})

detalharCampos();