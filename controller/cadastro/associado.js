import { associadoService } from "../../service/associado_service.js";
import { validarCamposDeAssociado } from "../../validations/associado.js";

const nome = document.getElementById('nome')
const email = document.getElementById('email')
const cpf = document.getElementById('cpf')
const telefone = document.getElementById('telefone')
const dataNascimento = document.getElementById('dataNascimento')
const cep = document.getElementById('cep')
const logradouro = document.getElementById('logradouro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const bairro = document.getElementById('bairro');
const numero = document.getElementById('numero');
const usuario = document.getElementById('usuario')
const senha = document.getElementById('senha')
const olho = document.getElementById('olho')
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
      dataNascimento: new Date(dataNascimento.value).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
      cep: cep.value,
      logradouro: logradouro.value,
      cidade: cidade.value,
      estado: estado.value,
      bairro: bairro.value,
      numero: numero.value,
      login: usuario.value,
      senha: senha.value,
    }

    await associadoService.cadastrarAssociado(dados)
    window.alert("Associado cadastrado com sucesso!")
  }
  catch (erro) {
    console.log(erro)
    window.alert("Erro ao cadastrar associado!")
  }
})

export const preencherCamposComCEP = (dados) => {
  logradouro.value = dados.logradouro;
  cidade.value = dados.localidade;
  estado.value = dados.uf;
  bairro.value = dados.bairro;
}

olho.addEventListener('mousedown', function () {
  senha.type = 'text';
});

olho.addEventListener('mouseup', function () {
  senha.type = 'password';
});

olho.addEventListener('mousemove', function () {
  senha.type = 'password';
});

inputs.forEach(input => {
  input.addEventListener('blur', (evento) => {
    validarCamposDeAssociado(evento.target)
  })
})

const verificarPerfil = () => {
  const tipo_usuario = sessionStorage.getItem("tipo_usuario")
  if (tipo_usuario == "ONG" || tipo_usuario == "Associado") {
    sessionStorage.clear()
    window.alert("Sessão encerrada!")
  }
}

verificarPerfil()