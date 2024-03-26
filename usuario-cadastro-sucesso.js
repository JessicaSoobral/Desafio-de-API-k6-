import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const BASE_URL = 'https://serverest.dev';
  const EMAIL = `${Math.random()}@qa.com.br`;
  const res = http.post(`${BASE_URL}/usuarios`
    , {
      nome: 'Jessica',
      email: EMAIL,
      password: 'teste',
      administrador: true,
    });

  check(res, {
    'Cadastro com status code 201': (r) => r.status === 201,
    'Cadastro realizado com sucesso': (r) => r.body.includes("Cadastro realizado com sucesso"),
  });

  sleep(1);
}
