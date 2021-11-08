import recuperarCEP from "../../service/cep_service.js";

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


const render = async (input) => {
  const data = await recuperarCEP(input);
  preencheCamposComCEP(data);
}

const cep = document.querySelector('#cep')

cep.addEventListener('blur', (evento) => {
  render(evento.target)
})

document.getElementById('olho').addEventListener('mousedown', function () {
  document.getElementById('senha').type = 'text';
});

document.getElementById('olho').addEventListener('mouseup', function () {
  document.getElementById('senha').type = 'password';
});

document.getElementById('olho').addEventListener('mousemove', function () {
  document.getElementById('senha').type = 'password';
});