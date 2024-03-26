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
 
  const cadastroCarrinho = http.post(`${BASE_URL}/carrinhos`, JSON.stringify(payload));
  check(cadastroCarrinho, {
    'Carrinho status code 400': (r) => r.status === 401,
    'Produto não encontrado': (r) => r.body.includes("Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"),
  });

}