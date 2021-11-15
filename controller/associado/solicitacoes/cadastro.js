import { petService } from '../../../service/pet_service.js'
import { ongService } from '../../../service/ong_service.js'
import { associadoService } from '../../../service/associado_service.js'
import { solicitacao_adocaoService } from '../../../service/solicitacao_adocao_service.js'
import { validarCamposDeSolicitacao } from "../../../validations/solicitacao.js";

const nomePet = document.getElementById('nomePet')
const nomeOng = document.getElementById('nomeOng')
const cnpjOng = document.getElementById('cnpjOng')
const emailOng = document.getElementById('emailOng')
const telefoneOng = document.getElementById('telefoneOng')
const nomeAssociado = document.getElementById('nomeAssociado')
const cpf = document.getElementById('cpf')
const emailAssociado = document.getElementById('emailAssociado')
const telefoneAssociado = document.getElementById('telefoneAssociado')
const referencias = document.getElementById('referencias')
const formulario = document.querySelector('[data-form]')

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault()
  const pegaURL = new URL(window.location)

  const id_pet = pegaURL.searchParams.get('id_pet')
  const id_associado = sessionStorage.getItem('id_tipo_pessoa');
  const pet = await petService.detalhaPets(id_pet)

  try {
    const dados = {
      nome_pet: nomePet.value,
      nome_ong: nomeOng.value,
      cnpj_ong: cnpjOng.value,
      email_ong: emailOng.value,
      telefone_ong: telefoneOng.value,
      nome_associado: nomeAssociado.value,
      cpf_associado: cpf.value,
      email_associado: emailAssociado.value,
      telefone_associado: telefoneAssociado.value,
      referencias: referencias.value,
      id_pet: id_pet,
      id_associado: id_associado,
      id_ong: pet.id_ong,
    }

    await solicitacao_adocaoService.cadastrarSolicitacao(dados)
    window.alert("Solicitação cadastrada com sucesso!")
  }
  catch (erro) {
    console.log(erro)
    window.alert("Erro ao cadastrar solicitação!")
  }
})


const detalharCampos = async () => {
  const pegaURL = new URL(window.location)

  const id_pet = pegaURL.searchParams.get('id_pet')
  const id_associado = sessionStorage.getItem('id_tipo_pessoa');
  const pet = await petService.detalhaPets(id_pet)
  const associado = await associadoService.detalharAssociado(id_associado)
  const ong = await ongService.detalharOngs(pet.id_ong)

  nomePet.value = pet.nome
  nomeOng.value = ong.nome
  cnpjOng.value = ong.cnpj
  emailOng.value = ong.email
  telefoneOng.value = ong.telefone
  nomeAssociado.value = associado.nome
  cpf.value = associado.cpf
  emailAssociado.value = associado.email
  telefoneAssociado.value = associado.telefone
}

referencias.addEventListener('blur', (evento) => {
  validarCamposDeSolicitacao(evento.target)
})
const verificarPerfil = () => {
  const token = sessionStorage.getItem("token")

  if (token == null) {
    window.location.href = '../../../index.html';
  }

  const tipo_usuario = sessionStorage.getItem("tipo_usuario")

  if (tipo_usuario == "ONG") {
    window.location.href = "../../ong/home.html";
  }
}

verificarPerfil()
detalharCampos();