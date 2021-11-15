import { petService } from '../../../service/pet_service.js'
import { validarCamposDePet } from "../../../validations/pet.js";

const nome = document.getElementById('nome');
const especie = document.getElementById('especie');
const porte = document.getElementById('porte');
const raca = document.getElementById('raca');
const dataNascimento = document.getElementById('dataNascimento');
const urlFoto = document.getElementById('urlFoto');
const sexom = document.getElementById('m');
const sexof = document.getElementById('f');
const observacoes = document.getElementById('observacoes');
const formulario = document.querySelector('[data-form]')
const inputs = document.querySelectorAll('input')
const textarea = document.getElementById('observacoes')

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault()
  const pegaURL = new URL(window.location)
  const id = pegaURL.searchParams.get('id')
  const sexo = sexof.checked ? "F" : "M"
  const id_ong = sessionStorage.getItem("id_tipo_pessoa")
  try {
    const dados = {
      nome: nome.value,
      especie: especie.value,
      porte: porte.value,
      raca: raca.value,
      dataNascimento: new Date(dataNascimento.value).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
      urlFoto: urlFoto.value,
      sexo: sexo,
      observacoes: observacoes.value,
      id_ong: id_ong
    }

    await petService.atualizarPet(id, dados)
    window.alert("Pet atualizado com sucesso!")
  }
  catch (erro) {
    console.log(erro)
    window.alert("Erro ao cadastrar Pet!")
  }
})


textarea.addEventListener('blur', (evento) => {
  validarCamposDePet(evento.target)
})

inputs.forEach(input => {
  input.addEventListener('blur', (evento) => {
    validarCamposDePet(evento.target)
  })
})



const detalharPet = async () => {
  const pegaURL = new URL(window.location)
  const id = pegaURL.searchParams.get('id')
  const pet = await petService.detalhaPets(id)

  const nome = document.getElementById('nome');
  const especie = document.getElementById('especie');
  const porte = document.getElementById('porte');
  const raca = document.getElementById('raca');
  const dataNascimento = document.getElementById('dataNascimento');
  const urlFoto = document.getElementById('urlFoto');
  const sexom = document.getElementById('m');
  const sexof = document.getElementById('f');
  const observacoes = document.getElementById('observacoes');

  nome.value = pet.nome
  especie.value = pet.especie
  porte.value = pet.porte
  raca.value = pet.raca
  dataNascimento.value = new Date(pet.dataNascimento).toISOString().split('T')[0]
  urlFoto.value = pet.urlFoto
  sexom.checked = pet.sexo == "M"
  sexof.checked = pet.sexo == "F"
  observacoes.value = pet.observacoes
}
const verificarPerfil = () => {
  const token = sessionStorage.getItem("token")

  if (token == null) {
    window.location.href = '../../../index.html';
  }

  const tipo_usuario = sessionStorage.getItem("tipo_usuario")

  if (tipo_usuario == "Associado") {
    window.location.href = "../../associado/home.html";
  }
}

verificarPerfil()
detalharPet()