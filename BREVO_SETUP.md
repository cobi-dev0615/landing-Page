# Configuração do Brevo para Automação de Email

Este guia explica como configurar a automação de email usando Brevo (anteriormente Sendinblue) para o projeto Beth Mirage.

## 📋 Pré-requisitos

- ✅ Conta Brevo criada
- ✅ Domínio `bethmirage.com.br` configurado
- ✅ API Key do Brevo

## 🔑 Passo 1: Obter API Key do Brevo

1. Acesse [Brevo Dashboard](https://app.brevo.com/)
2. Vá em **Settings** → **SMTP & API**
3. Na seção **API Keys**, clique em **Generate a new API key**
4. Dê um nome (ex: "Beth Mirage Landing Page")
5. Copie a API Key (você só verá ela uma vez!)

## 📧 Passo 2: Configurar Domínio no Brevo

1. No Brevo Dashboard, vá em **Settings** → **Senders & IP**
2. Clique em **Add a domain**
3. Adicione `bethmirage.com.br`
4. Siga as instruções para verificar o domínio:
   - Adicione o registro TXT no DNS do seu domínio
   - Adicione os registros SPF, DKIM e DMARC conforme instruções
5. Aguarde a verificação (pode levar algumas horas)

## ⚙️ Passo 3: Configurar o Backend

1. **Instale as dependências do servidor:**
```bash
cd server
npm install
```

2. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

3. **Edite o arquivo `.env` com suas credenciais:**
```env
BREVO_API_KEY=xkeysib-sua-api-key-aqui
PORT=3001
NODE_ENV=production

FROM_EMAIL=noreply@bethmirage.com.br
FROM_NAME=Beth Mirage
REPLY_TO_EMAIL=contato@bethmirage.com.br

EBOOK_PDF_PATH=./ebooks/nas-garras-de-beth-mirage.pdf

DOMAIN=https://bethmirage.com.br
FRONTEND_URL=https://bethmirage.com.br
```

4. **Coloque o PDF do e-book na pasta correta:**
```bash
mkdir -p server/ebooks
# Copie o arquivo PDF para server/ebooks/nas-garras-de-beth-mirage.pdf
```

## 🚀 Passo 4: Executar o Servidor

### Desenvolvimento:
```bash
cd server
npm run dev
```

### Produção:
```bash
cd server
npm start
```

O servidor estará rodando em `http://localhost:3001`

## 🔗 Passo 5: Configurar Frontend

No arquivo `.env` do frontend (raiz do projeto), configure:

```env
VITE_API_URL=http://localhost:3001/api
```

Para produção:
```env
VITE_API_URL=https://bethmirage.com.br/api
```

## 📦 Passo 6: Deploy do Backend

### Opção 1: Vercel (Serverless)
1. Instale Vercel CLI: `npm i -g vercel`
2. Na pasta `server`, execute: `vercel`
3. Configure as variáveis de ambiente no dashboard da Vercel

### Opção 2: Railway
1. Conecte seu repositório no Railway
2. Configure a pasta raiz como `server`
3. Adicione as variáveis de ambiente

### Opção 3: Servidor VPS
1. Use PM2 para gerenciar o processo: `pm2 start server.js`
2. Configure Nginx como reverse proxy
3. Configure SSL com Let's Encrypt

## 🧪 Teste a Integração

1. **Teste o endpoint de saúde:**
```bash
curl http://localhost:3001/api/health
```

2. **Teste o envio de email:**
```bash
curl -X POST http://localhost:3001/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "seu-email@exemplo.com",
    "consent": true
  }'
```

3. Verifique sua caixa de entrada para o e-book!

## 📊 Monitoramento

No Brevo Dashboard, você pode:
- Ver estatísticas de envio
- Verificar taxa de abertura
- Monitorar bounces e reclamações
- Gerenciar templates de email

## 🔒 Segurança

- ✅ Nunca commite o arquivo `.env`
- ✅ Use variáveis de ambiente no servidor de produção
- ✅ Configure rate limiting no servidor
- ✅ Valide todos os inputs
- ✅ Use HTTPS em produção

## 📝 Limites do Brevo

- **Plano Free**: 300 emails/dia
- **Plano Lite**: 10.000 emails/mês
- **Plano Premium**: Emails ilimitados

Verifique seu plano atual no dashboard do Brevo.

## 🆘 Troubleshooting

### Erro: "Invalid API key"
- Verifique se a API key está correta no `.env`
- Certifique-se de que não há espaços extras

### Erro: "Domain not verified"
- Verifique os registros DNS no seu provedor de domínio
- Aguarde até 48 horas para propagação DNS

### Email não chega
- Verifique a pasta de spam
- Verifique os logs do servidor
- Confirme que o domínio está verificado no Brevo

### PDF não anexa
- Verifique se o arquivo existe no caminho especificado
- Verifique permissões do arquivo
- Confirme que o caminho está correto no `.env`

## 📚 Recursos Adicionais

- [Documentação Brevo API](https://developers.brevo.com/)
- [Guia de Autenticação](https://developers.brevo.com/docs/send-emails-with-api)
- [Templates de Email](https://developers.brevo.com/docs/send-transactional-emails)
