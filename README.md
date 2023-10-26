# API RESTful
Esta é uma API RESTful para a realização das operações de CRUD (Create, Read, Update e Delete) em uma base de usuários.

## *Funcionalidades*
A API apresenta a seguinte estrutura:

### Usuários

| Ação                                   	   |  Operação (CRUD) 	| Mapeamento da URL        	      |
|--------------------------------------------|--------------------|-----------------------------------|
| Incluir um usuario             	         | **C**REATE       	| **POST**   /usuarios   	         |
| Obter dados de um usuario             	   | **R**EAD         	| **GET**    /usuarios/:id	         |
| Alterar dados de  um usuario               | **U**PDATE       	| **PUT**    /usuarios/:id   	      |
| Excluir um usuario                         | **D**ELETE       	| **DELETE** /usuarios/:id   	      |
|                                                                                                     |
| Realizar login na aplicação                | N/A                | **POST**   /login                 |

<!--
### Administradores
| Ação                                   	   |  Operação (CRUD) 	| Mapeamento da URL        	      |
|--------------------------------------------|--------------------|-----------------------------------|
| Incluir um administrador                   | **C**REATE       	| **POST**   /administradores       |
| Obter dados de um administrador        	   | **R**EAD         	| **GET**    /administradores/:id   |
| Alterar dados de  um administrador         | **U**PDATE       	| **PUT**    /administradores/:id	|
| Excluir administrador                      | **D**ELETE       	| **DELETE** /administradores/:id	|
|                                                                                                     |
| Realizar login na aplicação                | N/A                | **POST**   /login                 |
-->

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
   - ADMIN: Trata-se do administrador do sistema que, além dos acessos concedidos ao usuário comum, pode também inserir, alterar, ou excluir usuários da base de dados. **(Ainda não implantado)**

Por padrão, a aplicação é inicializada com dois usuários no banco de dados (*admin* e *user*) ambos com a mesma senha cadastrada ("1234").

## *Usuários*

**Criar**: Um usuário pode fazer o seu cadastro na aplicação, enviando uma requisição **POST** para a rota ***"/api/v1/usuarios"***. Ao criar um novo usuário, um evento é produzido para uma fila MQ. A mensagem enviada para a fila contém o id do novo usuário. Na criação, deverão ser enviadas as seguintes informações no body da requisição em um objeto json:

```
 {
   "nome":  "Nome do Usuário",
   "login": "login_do_usuário",
   "senha": "1234AbCd",
   "email": "email@provedor.com.br"
 }
```
<br>


**Recuperar**: Para buscar um usuário, deverá ser enviada uma requisição **GET** para a rota ***"/api/v1/usuarios/:id"***. O header da requisição deverá conter um token válido para o usuário, bem como seu id (que deverá ser enviado sob a tag "user-id"). **Usuários com papel USER somente estarão autorizados a buscar pelo seu própro usuário**.

**Alterar**: Para alterar dados de um usuário, deverá ser enviada uma requisição **PUT** para a rota ***"/api/v1/usuarios/:id"***. O body da requisição deverá conter um objeto json no mesmo formato utilizado na criação de um usuário (indicado acima). O header da requisição deverá conter um token válido para o usuário, bem como seu id (que deverá ser enviado sob a tag "user-id"). **Usuários com papel USER somente estarão autorizados a alterar dados do seu própro usuário**.

**Excluir**: Para excluir um usuário, deverá ser enviada uma requisição **DELETE** para a rota ***"/api/v1/usuarios/:id"***. O header da requisição deverá conter um token válido para o usuário, bem como seu id (que deverá ser enviado sob a tag "user-id"). Ao excluir um usuário, um evento é produzido para uma fila MQ. A mensagem enviada para a fila contém o id do usuário excluído. **Usuários com papel USER somente estarão autorizados a excluir o seu própro usuário**.




<!--
**Admin**: Apenas administradores podem cadastrar outros administradores. Para isso, deverá ser enviada uma requisição POST para a rota ***"/api/v1/administradores"***. As informações a serem enviadas são as mesmas listadas no item anterior.

**Exclusão de usuários/administradores**: Apenas administradores podem realizar a exclusão de usuários ou de outros administradores. Para isso, deverá ser enviada uma requisição DELETE para a rota ***"/api/v1/usuarios"***, a #requisição deverá conter em seu body o login do usuário/administrador a ser excluído.
-->



## *Rotas*
### Login
- POST      /api/seg/login             -> Obtem token de autenticação.

### Usuários
- POST      /api/v1/usuarios           -> Inclui um novo usuário.
- GET       /api/v1/usuarios/:id       -> Obtem dados de um usuário.
- PUT       /api/v1/usuarios/:id       -> Altera dados de um usuário.
- DELETE    /api/v1/usuarios/:id       -> Exclui um usuário.

<!--
### Administradores
- POST      /api/v3/administradores    -> Inclui um novo administrador.

-->
