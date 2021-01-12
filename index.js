let apikey = {
  key: "colocar chave da api",
};
let html = "";
let coins = document.getElementById("coins");
const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?limit=10";
const options = { year: "numeric", month: "long", day: "numeric" };
fetch(url, {
  method: "GET",
  headers: {
    "X-CMC_PRO_API_KEY": apikey.key,
    "Content-Type": "application/json",
  },
  mode: "cors",
})
  .then((response) => {
    if (!response.ok)
      throw new Error("Erro: " + response.status + ", " + response.statusText);
    return response.json();
  })
  .then((json) => {
    let date;
    for (coin of json.data) {
      date = new Date(coin.first_historical_data);
      html += `
      <div class="media">
        <img src="/resources/img/coin.jpg" class="align-self-center mr-3" alt="coin" width="100" height="60">
        <div class="media-body">
          <h5 class="mt-2">${coin.name}</h5>
          <p>${coin.symbol} / ${date.toLocaleDateString("pt-BR", options)}</p>
        </div>
      </div>
      `;
    }

    coins.innerHTML = html;
  })
  .catch((err) => console.error(err.message));
