# Express Auth API

Domingão, 14/06/2026.

Hoje me desafiei a fazer essa API de autenticação **100% sem IA**. 🤡

Apenas eu, meu teclado, alguns erros estranhos, com o autocomplete fazendo hora extra. 😂

O desafio era simples:

- Criar um cadastro de usuários
- Fazer login
- Gerar JWT
- Criar rota protegida `/me`
- Não pedir ajuda para IA

Resultado?

✅ Funcionou.
✅ O banco salva.
✅ O login autentica.
✅ O token gera.
✅ O `/me` retorna o usuário.

❓ O código está perfeito?
`Provavelmente não.`

❓ Eu sobrevivi?
`Sim.`

❓ Foi mais difícil do que eu imaginava?
`Com certeza.`

Mas tá aí... missão cumprida `(eu acho)` 😎

---

## Tecnologias

- Node.js
- Express
- SQLite
- JWT
- Bcrypt

---

## Como rodar

```bash
npm install
npm run dev