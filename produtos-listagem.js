import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const BASE_URL = 'https://serverest.dev';
  const res = http.get(`${BASE_URL}/produtos`);


  console.log('Produtos:', res.body);
  check(res, {

    'Status 200 OK': (r) => r.status === 200,
    'Quantidade de produtos': (r) => JSON.parse(r.body).quantidade === 7,
    'Nome do primeiro produto': (r) => JSON.parse(r.body).produtos[0].nome === 'Soundcore Life Q20',
    'Preço do primeiro produto': (r) => JSON.parse(r.body).produtos[0].preco === 270,
    'Descrição do primeiro produto': (r) => JSON.parse(r.body).produtos[0].descricao === 'Bluetooth phone',
    'Quantidade do primeiro produto': (r) => JSON.parse(r.body).produtos[0].quantidade === 100,
    'ID do primeiro produto presente': (r) => JSON.parse(r.body).produtos[0]._id === '56j0vpdvH9xTjec9',

  });
}



