import http from 'k6/http';
import { check, sleep } from 'k6';

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
 
  // Cadastrar um produto existente
  const payload = {
    nome: 'Logitech MX Vertical',
    preco: 470,
    descricao: 'Mouse',
    quantidade: 381,
  };

  // Obter o token de autorização
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  const produtoExistente = http.post(`${BASE_URL}/produtos`, JSON.stringify(payload), { headers });
  
  check(produtoExistente, {
    'Cadastro status code 400': (r) => r.status === 400,
    'Cadastro sucesso': (r) => r.body.includes("Já existe produto com esse nome"),
  });
  sleep(1);
}
