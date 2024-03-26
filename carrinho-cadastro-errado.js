import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const BASE_URL = 'https://serverest.dev';
  const EMAIL = 'fulano@qa.com';
  const PASSWORD = 'teste';

  //Login e obter token de acesso
  const loginResponse = http.post(`${BASE_URL}/login`, {
    email: EMAIL,
    password: PASSWORD,
  });

  const token = loginResponse.json('authorization');

  //Cadastrar um novo produto

  const payload = {
    produtos: [
      {
        idProduto: 'Abc1',
        quantidade: 1
      },
      {
        idProduto: 'Abc2',
        quantidade: 3
      }
    ]
  };
  //token de autorização
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  const cadastroCarrinho = http.post(`${BASE_URL}/carrinhos`, JSON.stringify(payload), { headers });
  check(cadastroCarrinho, {
    'Carrinho status code 400': (r) => r.status === 400,
    'Produto não encontrado': (r) => r.body.includes("Produto não encontrado"),
  });

}