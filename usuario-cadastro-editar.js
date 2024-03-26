import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const BASE_URL = 'https://serverest.dev';
  const ID_PRODUTO = '0uxuPY0cbmQhpEz1';

  // Dados do produto a serem atualizados
  const produtoAtualizado = {
    nome: 'Logitech MX Vertical',
    preco: 470,
    descricao: 'Mouse',
    quantidade: 381
  };

  // Token de autorização
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  // Enviar o pedido PUT para editar o produto
  const response = http.put(`${BASE_URL}/produtos/${ID_PRODUTO}`, JSON.stringify(produtoAtualizado), { headers });

  console.log('Resposta da requisição:', response.body);

  // Verificar se o pedido foi bem-sucedido
  check(response, {
    'Status code 200 ': (r) => r.status === 200,
    'Registro alterado com sucesso': (r) => JSON.parse(r.body).message === 'Registro alterado com sucesso',
  });
}

