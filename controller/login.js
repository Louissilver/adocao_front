
const formulario = document.querySelector('[data-form]')


formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault()
  try {
    const usuario = evento.target.querySelector('[data-usuario]').value
    const senha = evento.target.querySelector('[data-senha]').value

    await clienteService.autenticarUsuario(usuario, senha)
    console.log('Usuário autenticado com sucesso')
  }
  catch (erro) {
    console.log(erro)
  }
})