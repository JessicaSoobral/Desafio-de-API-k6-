import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const BASE_URL = 'https://serverest.dev';

  const payload = {
    nome: 'Logitech',
    preco: 100,
    descricao: 'Descrição do Produto',
    quantidade: 10,
  };

  const Token = http.post(`${BASE_URL}/produtos`, JSON.stringify(payload));
  check(Token, {
    'Token ausente, inválido ou expirado': (r) => r.status === 401,
    'Token inválido': (r) => r.body.includes("Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"),

  });

}




