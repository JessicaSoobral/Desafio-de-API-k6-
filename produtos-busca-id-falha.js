import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const BASE_URL = 'https://serverest.dev';
  const res = http.get(`${BASE_URL}/produtos/123456`);

  console.log('Produtos:', res.body);
  
  check(res, {

    'Status 200 OK': (r) => r.status === 400,
    'Produto não encontrado': (r) => r.body.includes("Produto não encontrado"),
  });
}
