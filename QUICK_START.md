# 🚀 Quick Start - Testar Automação de Email

## ⚡ Início Rápido (3 passos)

### 1. Configurar Backend

```bash
cd server
cp env.example .env
# Edite o .env e adicione sua BREVO_API_KEY e BREVO_TEMPLATE_ID
npm install
npm start
```

### 2. Configurar Frontend (em outro terminal)

```bash
# Na raiz do projeto
npm run dev
```

### 3. Testar

1. Acesse `http://localhost:3000`
2. Clique em "Quero baixar o ebook agora"
3. Preencha o formulário
4. Envie!

## ✅ Verificação Rápida

**O servidor backend está rodando?**
```bash
curl http://localhost:3001/api/health
```
Deve retornar: `{"status":"ok","message":"API is running"}`

**O frontend está rodando?**
- Acesse `http://localhost:3000` no navegador

## 🔧 Se der erro 404

**Problema:** O frontend não consegue acessar o backend

**Solução:** 
1. Certifique-se de que o servidor backend está rodando na porta 3001
2. O Vite já está configurado com proxy para redirecionar `/api` para `http://localhost:3001`
3. Se ainda não funcionar, crie um arquivo `.env` na raiz com:
   ```
   VITE_API_URL=http://localhost:3001/api
   ```

## 📋 Checklist Mínimo

- [ ] Servidor backend rodando (`cd server && npm start`)
- [ ] Frontend rodando (`npm run dev`)
- [ ] Arquivo `server/.env` configurado com BREVO_API_KEY
- [ ] BREVO_TEMPLATE_ID configurado no `.env`
