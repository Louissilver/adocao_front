import { petService } from '../../../service/pet_service.js'

const render = async () => {
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

render()