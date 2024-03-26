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
    nome: 'Nome do Produto',
    preco: 100,
    descricao: 'Descrição do Produto',
    quantidade: 10,
  };
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const createProductResponse = http.post(`${BASE_URL}/produtos`, JSON.stringify(payload), { headers });

  const productId = createProductResponse.json('insertedId');


  //Deletar o produto

  const deleteProductResponse = http.del(`${BASE_URL}/produtos/${productId}`, null, { headers });

  // Validar se o produto foi deletado com sucesso
  check(deleteProductResponse, {
    'Produto deletado com sucesso': (r) => r.status === 200,
  });

}

