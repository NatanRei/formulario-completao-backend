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
- POST /sessions - Cria uma sessão e retorna um token
- POST /employees - Cria um funcionário
- GET /employees - Recupera todos os funcionários
- GET /employees/:uuid - Recupera um funcionário