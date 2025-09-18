# Formulário Completão - Backend

Esse é o backend do projeto [Formulário completão](https://github.com/NatanRei/formulario-completao.git)

## Como executar o projeto?
```bash
git clone https://github.com/NatanRei/formulario-completao-backend.git
cd formulario-completao-backend
cp .env.example .env
npm i
npm run migrate
npm run dev
```

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
--data-raw '{
  "name": "Teste",
  "document": "123.456.789-00",
  "type": "physical",
  "email": "planejamento.carino@geradornv.com.br",
  "salary": "1200.00",
  "startDate": "2025-03-12",
  "position": "dev",
  "sector": "IT",
  "address": {
    "zipCode": "82630100",
    "publicPlace": "Rua Cecília Marques da Luz",
    "number": "1234",
    "complement": "casa 1",
    "district": "Atuba",
    "city": "Curitiba",
    "state": "PR",
    "countryCode": "BRA"
  },
  "contact": {
    "email": "planejamento.carino@geradornv.com.br",
    "telephoneNumber": "11999999999",
    "countryCode": "55"
  },
  "banks": [
    {
      "bankCode": "00416968",
      "agency": "0001",
      "account": "121545",
      "accountDigit": "1",
      "accountType": "CC",
      "keyPix": null,
      "default": true
    }
  ],
  "files": [
    {
      "uuid": "1abd6e79-712c-4d77-9b1e-b971c24db2d4",
      "type": "DRIVERS_LICENSE",
      "path": "caminho/do/arquivo1.jpg",
      "mimeType": "image/jpeg",
      "fileName": "cnh.jpg"
    },
    {
      "uuid": "64f2c1a2-f657-4c52-b8f3-9a7e4607514e",
      "type": "PICTURE",
      "path": "caminho/do/arquivo2.jpg",
      "mimeType": "image/jpeg",
      "fileName": "foto.jpg",
      "is_persistent": true
    }
  ]
}
'
```
