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
  "taxid_number": "123.456.789-00",
  "type": "physical",
  "email": "planejamento.carino@geradornv.com.br",
  "organization_uuid": "uuid-da-organizacao",
  "salary": "1200.00",
  "start_date": "2025-03-12",
  "position": "dev",
  "sector": "IT",
  "address": {
    "zip_code": "82630100",
    "public_place": "Rua Cecília Marques da Luz",
    "number": "1234",
    "complement": "casa 1",
    "district": "Atuba",
    "city": "Curitiba",
    "federal_unit": "PR",
    "country_code": "BRA"
  },
  "phone": {
    "telephone_number": "11999999999",
    "country_code": "55"
  },
  "banks": [
    {
      "bank_ispb": "00416968",
      "agency": "0001",
      "account": "121545",
      "account_digit": "1",
      "account_type": "CC",
      "key_pix": null,
      "default": true
    }
  ],
  "files": [
    {
      "uuid": "1abd6e79-712c-4d77-9b1e-b971c24db2d4",
      "type": "DRIVERS_LICENSE",
      "path": "caminho/do/arquivo1.jpg",
      "mime_type": "image/jpeg",
      "file_name": "cnh.jpg"
    },
    {
      "uuid": "64f2c1a2-f657-4c52-b8f3-9a7e4607514e",
      "type": "PICTURE",
      "path": "caminho/do/arquivo2.jpg",
      "mime_type": "image/jpeg",
      "file_name": "foto.jpg",
      "is_persistent": true
    }
  ],
  "details": {
    "birth_date": "2000-01-01",
    "mother_name": "Nome Mãe Teste",
    "general_registration_type": "cnh",
    "general_registration_number": "1225454",
    "general_registration_organ": "SSP",
    "general_registration_federal_unit": "PR",
    "general_registration_emission": "2001-01-01",
    "nationality": "Brasileiro",
    "naturalness": "Curitiba"
  }
}
'
```
