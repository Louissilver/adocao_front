export const retornarLatitudeLongitude = (endereco) => {
  return fetch(`http://api.positionstack.com/v1/forward?access_key=3f8a4a744295a5ce09a0aa197fb1ebc9&query=${endereco}`)
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json();
      }
      throw new Error("Não foi possível retornar os dados de geolocalização");
    })
    .then(json => {
      console.log(json);
      return json;
    })
};

