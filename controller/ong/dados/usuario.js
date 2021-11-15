import { usuarioService } from '../../../service/usuario_service.js'
import { validarCamposDeAssociado } from "../../../validations/associado.js";

const usuario = document.getElementById('usuario')
const olho = document.getElementById('olho')
const senha = document.getElementById('senha')
const formulario = document.querySelector('[data-form]')
const inputs = document.querySelectorAll('input')

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault()
  const id_usuario = sessionStorage.getItem('id_usuario')

  try {
    const dados = {
      login: usuario.value,
      senha: senha.value,
    }

    await usuarioService.atualizarUsuario(id_usuario, dados)
    window.alert("Usuário atualizado com sucesso!")
  }
  catch (erro) {
    console.log(erro)
    window.alert("Erro ao atualizar usuários!")
  }
})

const detalharCampos = async () => {
  const usuario_atual = sessionStorage.getItem('usuario_atual')

  usuario.value = usuario_atual
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

detalharCampos();