# API RESTful
Esta é uma API RESTful para a realização das operações de CRUD (Create, Read, Update e Delete) em uma base de usuários.

## *Funcionalidades*
A API apresenta a seguinte estrutura:
| Ação                        	   |  Operação (CRUD) 	| Mapeamento da URL        	|
|-----------------------------	   |------------------	|--------------------------	|
| Incluir um usuario             	| **C**REATE       	| **POST**   /usuarios   	   |
| Incluir um administrador          | **C**REATE       	| **POST**   /administradores |
| Excluir um usuario/administrador  | **D**ELETE       	| **DELETE** /usuarios      	|
|                                                                                      |
| Realizar login na aplicação       | N/A                 | **POST**   /login          |


## *Requisitos para Execução*
- Node.js 
- npm
- Docker

## *Execução*
1. Clone este repositório:
   git clone https://github.com/masassuncao/sistema-cadastro-usuarios

2. Instale as dependências:
   npm install

3. Configure o arquivo .env com os valores desejados. <br>
   Atenção: O arquivo .env encontra-se preenchido com valores default não devendo ser utilizado em produção.

3. Inicie o servidor:
   npm start

4. O servidor estará em execução, bastando acessar o seguinte endereço:
   http://localhost:3000

## *Segurança*
A aplicação implementa autenticação e autorização por meio de JSON Web Token (JWT), de forma que para acesso aos recursos de qualquer rota, o usuário deverá estar autenticado no sistema.

Encontram-se definidos dois perfis de usuários:
   - USER: Trata-se do usuário do sistema, tendo acessos limitados.
   - ADMIN: Trata-se do administrador do sistema que, além dos acessos concedidos ao usuário comum, pode também inserir, alterar, ou excluir usuários da base de dados.

Por padrão, a aplicação é inicializada com dois usuários no banco de dados (*admin* e *user*) ambos com a mesma senha cadastrada ("1234").

## *Usuários*
**User**: Um usuário pode fazer o seu cadastro na aplicação, enviando uma requisição POST para a rota ***"/api/v1/usuarios"***. Deverão ser enviadas as seguintes informações em um objeto json:
 - nome:  String
 - login: String
 - senha: String
 - email: String

**Admin**: Apenas administradores podem cadastrar outros administradores. Para isso, deverá ser enviada uma requisição POST para a rota ***"/api/v1/administradores"***. As informações a serem enviadas são as mesmas listadas no item anterior.

**Exclusão de usuários/administradores**: Apenas administradores podem realizar a exclusão de usuários ou de outros administradores. Para isso, deverá ser enviada uma requisição DELETE para a rota ***"/api/v1/usuarios"***, a requisição deverá conter em seu body o login do usuário/administrador a ser excluído.


## *Rotas*
### Login
- POST      /api/seg/login             -> Obtem token de autenticação.

### Usuários
- POST      /api/v3/usuarios           -> Inclui um novo usuário.
- POST      /api/v3/administradores    -> Inclui um novo administrador.
- DELETE    /api/v3/usuarios           -> Exclui um usuário/administrador.