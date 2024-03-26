import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const BASE_URL = 'https://serverest.dev';
  const res = http.get(`${BASE_URL}/carrinhos`);

  console.log('Produtos:', res.body);
  check(res, {

    'Status 200 OK': (r) => r.status === 200,
    'Quantidade de produtos': (r) => JSON.parse(r.body).quantidade === 1,
    'Id do primeiro produto': (r) => JSON.parse(r.body).carrinhos[0].produtos[0].idProduto === 'BeeJh5lz3k6kSIzA',
    'Quantidade do primeiro produto': (r) => JSON.parse(r.body).carrinhos[0].produtos[0].quantidade === 2,
    'Preço Unitario do primeiro produto': (r) => JSON.parse(r.body).carrinhos[0].produtos[0].precoUnitario === 470,

    'Id do segundo produto': (r) => JSON.parse(r.body).carrinhos[0].produtos[1].idProduto === 'K6leHdftCeOJj8BJ',
    'Quantidade do primeiro produto': (r) => JSON.parse(r.body).carrinhos[0].produtos[1].quantidade === 1,
    'Preço Unitario do primeiro produto': (r) => JSON.parse(r.body).carrinhos[0].produtos[1].precoUnitario === 5240,

    'Preço Total': (r) => JSON.parse(r.body).carrinhos[0].precoTotal === 6180,
    'Quantidade Total': (r) => JSON.parse(r.body).carrinhos[0].quantidadeTotal === 3,
    'Id Usuario Total': (r) => JSON.parse(r.body).carrinhos[0].idUsuario === 'oUb7aGkMtSEPf6BZ',
    'Id': (r) => JSON.parse(r.body).carrinhos[0]._id === 'qbMqntef4iTOwWfg',
  });
}



