import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const BASE_URL = 'https://serverest.dev';

  const res = http.post(`${BASE_URL}/usuarios`, {
    nome: 'Jessica',
    email: 'fulano@qa.com',
    password: 'teste',
    administrador: true,
  });

  check(res, {
    'Cadastro com status code 400': (r) => r.status === 400,
    'Cadastro com E-mail já cadastrado': (r) => r.body.includes("Este email já está sendo usado"),
  });

  sleep(1);
}
