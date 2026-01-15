# ✅ Checklist: Automação de Email - Pronto para Testar?

Use esta checklist para verificar se tudo está configurado corretamente antes de testar a automação de email.

## 📋 Checklist de Configuração

### 1. ✅ Backend Configurado
- [x] Servidor Express criado (`server/server.js`)
- [x] Serviço Brevo implementado (`server/services/brevoService.js`)
- [x] Endpoint `/api/subscribe` configurado
- [x] Validação de dados implementada
- [x] Tratamento de erros implementado

### 2. ⚙️ Variáveis de Ambiente

Verifique se o arquivo `server/.env` existe e contém:

- [ ] `BREVO_API_KEY` - Sua API Key do Brevo
- [ ] `BREVO_TEMPLATE_ID` - ID do template criado no Brevo
- [ ] `FROM_EMAIL` - Email remetente (ex: contato@bethmirage.com)
- [ ] `FROM_NAME` - Nome do remetente (ex: Beth Mirage)
- [ ] `REPLY_TO_EMAIL` - Email para resposta
- [ ] `DOMAIN` - Domínio do site (ex: https://bethmirage.com.br)
- [ ] `PLATFORM_LINK` - Link da plataforma (opcional)

**Como verificar:**
```bash
cd server
cat .env
```

**Se não existir, crie:**
```bash
cd server
cp env.example .env
# Edite o .env com suas credenciais
```

### 3. 📧 Template no Brevo

- [ ] Template criado no Brevo Dashboard
- [ ] Template ID copiado e configurado no `.env`
- [ ] Variáveis configuradas no template:
  - `{{ params.LEAD_NAME }}`
  - `{{ params.EBOOK_NAME }}`
  - `{{ params.FILE_LINK }}`
  - `{{ params.PLATFORM_LINK }}`

**Como obter o Template ID:**
1. Acesse https://app.brevo.com/
2. Vá em **Campaigns** → **Email Templates**
3. Encontre seu template e copie o ID (número)

### 4. 📄 Arquivo PDF

- [ ] PDF do e-book existe em `media/ebook.pdf` ou `server/ebooks/`
- [ ] Arquivo acessível via `/media/ebook.pdf`

**Como verificar:**
```bash
# Verificar se existe
ls -la media/ebook.pdf
# ou
ls -la server/ebooks/nas-garras-de-beth-mirage.pdf
```

**Se não existir, copie:**
```bash
# Se o PDF está na raiz
cp ebook.pdf media/ebook.pdf
# ou
cp ebook.pdf server/ebooks/nas-garras-de-beth-mirage.pdf
```

### 5. 🔧 Dependências Instaladas

- [ ] Dependências do servidor instaladas

**Como verificar:**
```bash
cd server
npm list express cors dotenv
```

**Se não estiver instalado:**
```bash
cd server
npm install
```

### 6. 🌐 Domínio e DNS

- [ ] Domínio `bethmirage.com.br` configurado (se em produção)
- [ ] Domínio verificado no Brevo
- [ ] Registros DNS configurados (SPF, DKIM, DMARC)

## 🧪 Como Testar

### Passo 1: Iniciar o Servidor

```bash
cd server
npm start
# ou para desenvolvimento
npm run dev
```

Você deve ver:
```
🚀 Server running on port 3001
📧 Brevo email service configured
🌐 API available at http://localhost:3001/api
📄 E-book available at http://localhost:3001/media/ebook.pdf
```

### Passo 2: Testar o Endpoint

**Opção A: Via cURL**
```bash
curl -X POST http://localhost:3001/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "seu-email@exemplo.com",
    "phone": "(11) 99999-9999",
    "consent": true
  }'
```

**Opção B: Via Formulário da Landing Page**
1. Inicie o frontend: `npm run dev`
2. Acesse `http://localhost:3000`
3. Clique no botão "Quero baixar o ebook agora"
4. Preencha o formulário
5. Envie

### Passo 3: Verificar Resultado

1. **Verifique os logs do servidor:**
   - Deve aparecer: `✅ E-book email sent successfully: [messageId]`

2. **Verifique sua caixa de entrada:**
   - Email deve chegar em alguns segundos
   - Verifique se o template foi aplicado corretamente
   - Verifique se o PDF está anexado
   - Verifique se os links funcionam

3. **Verifique no Brevo Dashboard:**
   - Vá em **Statistics** → **Transactional Emails**
   - Veja se o email foi enviado
   - Verifique status (delivered, opened, etc.)

## ❌ Problemas Comuns

### Erro: "BREVO_API_KEY não configurada"
**Solução:** Verifique se o arquivo `server/.env` existe e contém `BREVO_API_KEY`

### Erro: "Template not found"
**Solução:** 
- Verifique se `BREVO_TEMPLATE_ID` está correto
- Certifique-se de que o template está ativo no Brevo

### Erro: "PDF file not found"
**Solução:**
- Verifique se o PDF existe no caminho configurado
- Verifique `EBOOK_PDF_PATH` no `.env`

### Email não chega
**Solução:**
- Verifique a pasta de spam
- Verifique se o domínio está verificado no Brevo
- Verifique os logs do servidor para erros
- Verifique se o email de destino está correto

### Variáveis não substituídas no template
**Solução:**
- Verifique se as variáveis no template estão escritas como `{{ params.LEAD_NAME }}`
- Certifique-se de usar `params.` antes do nome da variável

## ✅ Status Atual

Execute este comando para verificar o status:

```bash
cd server
echo "Checking configuration..."
test -f .env && echo "✅ .env exists" || echo "❌ .env missing"
test -f ../media/ebook.pdf && echo "✅ PDF in media/" || echo "⚠️ PDF not in media/"
test -d node_modules && echo "✅ Dependencies installed" || echo "❌ Run npm install"
```

## 🚀 Próximos Passos Após Teste Bem-Sucedido

1. ✅ Configurar domínio em produção
2. ✅ Configurar SSL/HTTPS
3. ✅ Testar em produção
4. ✅ Monitorar estatísticas no Brevo
5. ✅ Ajustar template se necessário
