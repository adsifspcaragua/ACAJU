## Primeiros passos depois de um Clone do projeto

Inicio configurar o arquivo .env

**Gere uma chave secreta para gerenciar uma session de user**
 ```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

abaixo um exemplo mas configure conforme os dados do database que vc criou

**arquivo .env:**
- **DATABASE_HOST=** `"localhost"`
- **DATABASE_USER=* `"root"`
- **DATABASE_PASSWORD=** `"SUA_SENHA_DO_MYSQL_AQUI"`
- **DATABASE_NAME=** `"acaju"`

- **DATABASE_URL=** `"mysql://root:SUA_SENHA_DO_MYSQL_AQUI@localhost:3306/acaju"`

- **SESSION_SECRET=** `"SUA_CHAVE_GERADA_AQUI"`

Após configurar o arquivo rode os comandas a baixo para configurar o prisma

```bash
npx prisma generate
npx prisma db push
```

## Credenciais de Teste & Setup Inicial (Painel Admin)

Para testar o login de administrador localmente, certifique-se de que o banco de dados contém um usuário cadastrado com a senha criptografada em bcrypt.

**Credenciais padrão de teste:**
- **E-mail:** `exemple@gmail.com`
- **Senha:** `sua_senha_aqui`

> **Nota para desenvolvedores:** Se criar novos usuários via SQL direto no Workbench, a coluna `pass` deve conter um hash gerado pelo `bcryptjs`. Para gerar um novo hash de senha via terminal, execute:
> ```bash
> node -e "console.log(require('bcryptjs').hashSync('SUA_SENHA_AQUI', 10))"
> ``` 

Para testar o acesso administrativo localmente, execute o script SQL abaixo no MySQL Workbench para popular a tabela `adm` com usuários de teste e senhas devidamente criptografadas com `bcryptjs` feito logo acima, não precisa fazer os 2 somente 1 para testes ta bom.

### Script de Inserção SQL
```sql
USE acaju;

-- 1. Inserção de Administrador Principal
INSERT INTO adm (id, name, email, pass, createdAt, updatedAt) 
VALUES (
  1,
  'Angelo Souza', 
  'angelo@gmail.com', 
  '$2b$10$5.rslgsUiqPQt29EdZPT0ent8rFp8OTqgznYIp207zE/tUIHMyZnC', 
  NOW(), 
  NOW()
);

-- 2. Inserção de Administrador Padrão ONG
INSERT INTO adm (name, email, pass, createdAt, updatedAt) 
VALUES (
  'Administrador ACAJU', 
  'admin@acaju.org', 
  '$2a$10$7vI6V20P1vQ1iV8Xw0Zq8e9eG.E7bB1fT.1XbY7w3b3kY1V6a8K8u', 
  NOW(), 
  NOW()
);


-- 3. Comando para visualizar a tabela admlog em ordem do mais novo-antigo
SELECT * FROM ADMLOG ORDER BY loginAt DESC; -- mais recentes primeiro