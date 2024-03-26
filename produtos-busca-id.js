import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const BASE_URL = 'https://serverest.dev';
  const PRODUTO_ID = 'oYUezXWmh3zktI0V'; 

  const res = http.get(`${BASE_URL}/produtos/${PRODUTO_ID}`);

  console.log('Produtos:', res.body);
  
  check(res, {

    'Status 200 OK': (r) => r.status === 200,
    'Nome do produto': (r) => JSON.parse(r.body).nome === 'Logitech MX Vertical',
    'Preço do primeiro produto': (r) => JSON.parse(r.body).preco === 470,
    'Descrição do primeiro produto': (r) => JSON.parse(r.body).descricao === 'Mouse',
    'Quantidade do primeiro produto': (r) => JSON.parse(r.body).quantidade === 379,
    'ID do primeiro produto presente': (r) => JSON.parse(r.body)._id === 'BeeJh5lz3k6kSIzA',

  });
}
