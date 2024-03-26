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

  //Cadastrar um novo carrinho

  const payload = {
    produtos: [
      {
        idProduto: 'BeeJh5lz3k6kSIzA',
        quantidade: 1
      },
      
    ]
  };

  // Obter o token de autorização
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  const cadastrosucesso = http.post(`${BASE_URL}/carrinhos`, JSON.stringify(payload), { headers });
  console.log('Resposta da requisição de cadastro:', cadastrosucesso.body);


  check(cadastrosucesso, {
    'Cadastro status code 201': (r) => r.status === 201,
    'Cadastro carrinho': (r) => r.body.includes("Cadastro realizado com sucesso"),
    'Erro de criação do carrinho': (r) => r.status === 400 && r.body.includes("Não é permitido ter mais de 1 carrinho")
  });

}

// O carrinho é vinculado ao usuário do token enviado no header Authorization, sendo possível cadastrar apenas 1 carrinho por usuário
// Ainda não sei fazer uma solução que funcione para sempre utilizar um novo usuario logado.