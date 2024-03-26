# Testes Automatizados com K6

Este projeto consiste em testes automatizados para a API disponível em [https://serverest.dev](https://serverest.dev).

## Pré-requisitos

- Node.js instalado
- K6 instalado (pode ser instalado usando npm ou baixando diretamente do site oficial do K6)

## Executando os Testes

1. **Crie os arquivos de teste:** Certifique-se de ter os arquivos de teste devidamente criados com os testes que deseja executar. Por exemplo, se você deseja testar o endpoint de produtos, crie um arquivo chamado `produtos.js` e adicione os testes relacionados a esse endpoint.

2. **Abra um terminal ou prompt de comando:** Navegue até o diretório onde estão os arquivos de teste.

3. **Execute os testes:** Use o comando `k6 run` seguido do nome do arquivo de teste para executar os testes. Por exemplo:

```bash
k6 run produtos.js

```
## Estrutura dos Arquivos

- `produtos.js`: Contém os testes relacionados aos endpoints de produtos.
- `usuarios.js`: Contém os testes relacionados aos endpoints de usuários.
- `carrinhos.js`: Contém os testes relacionados aos endpoints de carrinhos.

## Bibliotecas Utilizadas

- **k6/http**: Usado para fazer requisições HTTP durante os testes.
- **k6/check**: Usado para realizar verificações nos resultados das requisições HTTP.


Antes de executar os testes, é realizado o login de um usuário válido para obter o token de acesso.


## Documentação dos Testes

- **produtos.js**: Contém os testes para os endpoints relacionados a produtos, incluindo casos de teste para listar produtos, cadastrar novo produto, editar produto e excluir produto.
- **usuarios.js**: Contém os testes para os endpoints relacionados a usuários, incluindo casos de teste para cadastrar novo usuário, editar usuário.
- **carrinhos.js**: Contém os testes para os endpoints relacionados a carrinhos, incluindo casos de teste para listar carrinhos, adicionar produto ao carrinho.
- **login.js**: Contém os testes para os endpoints relacionados a login, incluindo casos de teste para login com sucesso e falha.


## Referências

- [Documentação Oficial do K6](https://k6.io/docs/)





