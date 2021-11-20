
export const retornarIdadePet = (dataNascimento) => {
  let data = new Date(dataNascimento);
  let ano_atual = new Date().getFullYear();
  let mes_atual = new Date().getMonth() + 1;
  let idade_anos = ano_atual - data.getFullYear();
  let idade_meses = mes_atual - data.getMonth();
  let idade_anos_string = `${idade_anos} anos`;
  let idade_meses_string = ` ${idade_meses} meses`;
  if (idade_anos == 0) {
    idade_anos_string = '';
  }
  if (idade_meses == 0) {
    idade_meses_string = '';
  }
  if (idade_anos == 1) {
    idade_anos_string = `${idade_anos} ano`;
  }
  if (idade_meses == 1) {
    idade_meses_string = ` ${idade_meses} mês`;
  }

  let idadeCompleta = `${idade_anos_string}${idade_meses_string}`;

  return idadeCompleta;
}