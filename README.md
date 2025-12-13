# Formulário Completão - Backend

Esse é o backend do projeto [Formulário completão](https://github.com/NatanRei/form-completao)

## Como executar o projeto?
```bash
git clone https://github.com/NatanRei/formulario-completao-backend.git
cd formulario-completao-backend
cp .env.example .env
npm i
npm run migrate
npm run dev
```

## Versões
A versão de NodeJs recomendada é a 22.12.0.

## Rotas
- POST /users - Cria um usuário
```bash
curl --location 'localhost:3333/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "test",
    "email": "test@test.com",
    "password": "123456"
}'
```

- POST /sessions - Cria uma sessão e retorna um token
```bash
curl --location 'localhost:3333/sessions' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@test.com",
    "password": "123456"
}'
```

- GET /employees - Recupera todos os funcionários
```bash
curl --location 'localhost:3333/employees' \
--header 'Authorization: Bearer {{token}}'
```

- GET /employees/:uuid - Recupera um funcionário
```bash
curl --location 'localhost:3333/employees/EMPLOYEE_UUID' \
--header 'Authorization: Bearer {{token}}'
```

- POST /employees - Cria um funcionário
```bash
curl --location 'localhost:3333/employees' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--data-raw '{Você poderá ver o schema em src/http/controllers/employees/register/schema.ts}'
```

- PUT /employees/:uuid - Atualiza um funcionário
```bash
curl --location 'localhost:3333/employees/EMPLOYEE_UUID' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--data-raw '{Você poderá ver o schema em src/http/controllers/employees/update/schema.ts}'
```