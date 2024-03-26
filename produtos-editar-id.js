import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const BASE_URL = 'https://serverest.dev';
  const ID_PRODUTO = '0uxuPY0cbmQhpEz1';
  const EMAIL = 'fulano@qa.com';
  const PASSWORD = 'teste';
  const NOVO_NOME = `${Math.random()}test`;

  // Login e obter token de acesso
  const loginResponse = http.post(`${BASE_URL}/login`, {
    email: EMAIL,
    password: PASSWORD,
  });
  
  const token = loginResponse.json('authorization');

  // Token de autorização
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  // Dados do produto atualizado
  const produtoAtualizado = {
    nome: NOVO_NOME,
    preco: 470,
    descricao: 'Mouse',
    quantidade: 381
  };

  // Enviar a requisição PUT para editar o produto existente
  const response = http.put(`${BASE_URL}/produtos/${ID_PRODUTO}`, JSON.stringify(produtoAtualizado), { headers });
  
  console.log('Resposta da requisição:', response.body);

  // Verificar se a requisição foi bem-sucedida
  check(response, {
    'Status code 200': (r) => r.status === 200,
    'Produto editado com sucesso': (r) => JSON.parse(r.body).message === 'Registro alterado com sucesso',
  });
}
