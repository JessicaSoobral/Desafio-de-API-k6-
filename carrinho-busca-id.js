import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const BASE_URL = 'https://serverest.dev';
  const CARRINHO_ID = 'qbMqntef4iTOwWfg';


  const response = http.get(`${BASE_URL}/carrinhos/${CARRINHO_ID}`);

  console.log('body:', response.body);


  check(response, {
    'Status 200 OK': (r) => r.status === 200,
    'Id do primeiro produto': (r) => JSON.parse(r.body).produtos[0].idProduto === 'BeeJh5lz3k6kSIzA',
    'Quantidade do primeiro produto': (r) => JSON.parse(r.body).produtos[0].quantidade === 2,
    'Preço Unitario do primeiro produto': (r) => JSON.parse(r.body).produtos[0].precoUnitario === 470,

    'Id do segundo produto': (r) => JSON.parse(r.body).produtos[1].idProduto === 'K6leHdftCeOJj8BJ',
    'Quantidade do primeiro produto': (r) => JSON.parse(r.body).produtos[1].quantidade === 1,
    'Preço Unitario do primeiro produto': (r) => JSON.parse(r.body).produtos[1].precoUnitario === 5240,

    'Preço Total': (r) => JSON.parse(r.body).precoTotal === 6180,
    'Quantidade Total': (r) => JSON.parse(r.body).quantidadeTotal === 3,
    'Id Usuario Total': (r) => JSON.parse(r.body).idUsuario === 'oUb7aGkMtSEPf6BZ',
    'Id': (r) => JSON.parse(r.body)._id === 'qbMqntef4iTOwWfg',
  });


}
