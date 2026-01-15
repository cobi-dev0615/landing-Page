# 🧪 Status: Automação de Email - Pronto para Testar?

## ✅ O que JÁ está implementado:

1. ✅ **Backend completo** - Servidor Express com endpoint `/api/subscribe`
2. ✅ **Integração Brevo** - Serviço configurado para usar template do Brevo
3. ✅ **Frontend** - Formulário com campos: Nome, Email, Telefone, Consentimento
4. ✅ **PDF configurado** - Arquivo em `media/ebook.pdf` e rota `/media/ebook.pdf`
5. ✅ **Validação** - Validação de dados no frontend e backend
6. ✅ **Tratamento de erros** - Mensagens de erro e sucesso

## ⚠️ O que PRECISA ser configurado ANTES de testar:

### 1. Criar arquivo `.env` no servidor

```bash
cd server
cp env.example .env
```

### 2. Editar o arquivo `server/.env` com suas credenciais:

```env
# OBRIGATÓRIO: Sua API Key do Brevo
BREVO_API_KEY=xkeysib-sua-chave-aqui

# OBRIGATÓRIO: ID do template criado no Brevo
BREVO_TEMPLATE_ID=1

# Configurações de email
FROM_EMAIL=contato@bethmirage.com
FROM_NAME=Beth Mirage
REPLY_TO_EMAIL=contato@bethmirage.com.br

# Domínio
DOMAIN=https://bethmirage.com.br
PLATFORM_LINK=https://bethmirage.com.br
```

### 3. Instalar dependências do servidor

```bash
cd server
npm install
```

### 4. Obter Template ID do Brevo

1. Acesse https://app.brevo.com/
2. Vá em **Campaigns** → **Email Templates**
3. Encontre seu template
4. Copie o ID (número)
5. Cole no `BREVO_TEMPLATE_ID` do `.env`

### 5. Verificar se o PDF existe

```bash
# Verificar
ls -la media/ebook.pdf

# Se não existir, copiar
cp ebook.pdf media/ebook.pdf
```

## 🚀 Como Testar

### Passo 1: Iniciar o Servidor Backend

```bash
cd server
npm start
```

Você deve ver:
```
🚀 Server running on port 3001
📧 Brevo email service configured
🌐 API available at http://localhost:3001/api
📄 E-book available at http://localhost:3001/media/ebook.pdf
```

### Passo 2: Iniciar o Frontend (em outro terminal)

```bash
npm run dev
```

### Passo 3: Testar o Formulário

1. Acesse `http://localhost:3000`
2. Clique em "Quero baixar o ebook agora"
3. Preencha:
   - Nome
   - Email (use um email real para receber)
   - Telefone
   - Marque o checkbox de consentimento
4. Clique em "Enviar E-book"

### Passo 4: Verificar Resultado

✅ **Sucesso se:**
- Mensagem de sucesso aparece no modal
- Email chega na sua caixa de entrada
- PDF está anexado
- Template do Brevo foi aplicado
- Links funcionam

❌ **Se der erro:**
- Verifique os logs do servidor
- Verifique se o `.env` está configurado
- Verifique se o Template ID está correto
- Verifique se a API Key está correta

## 📋 Checklist Rápido

Execute estes comandos para verificar:

```bash
# 1. Verificar se .env existe
cd server && test -f .env && echo "✅ .env exists" || echo "❌ Create .env from env.example"

# 2. Verificar se dependências estão instaladas
cd server && test -d node_modules && echo "✅ Dependencies installed" || echo "❌ Run: npm install"

# 3. Verificar se PDF existe
test -f media/ebook.pdf && echo "✅ PDF exists" || echo "❌ Copy ebook.pdf to media/"

# 4. Verificar se API Key está configurada
cd server && grep -q "BREVO_API_KEY=xkeysib" .env 2>/dev/null && echo "✅ API Key configured" || echo "⚠️ Configure BREVO_API_KEY in .env"

# 5. Verificar se Template ID está configurado
cd server && grep -q "BREVO_TEMPLATE_ID=[0-9]" .env 2>/dev/null && echo "✅ Template ID configured" || echo "⚠️ Configure BREVO_TEMPLATE_ID in .env"
```

## 🎯 Resumo: Pronto para Testar?

**Status Atual:**
- ✅ Código: 100% implementado
- ⚠️ Configuração: Precisa criar `.env` e instalar dependências
- ⚠️ Brevo: Precisa configurar Template ID

**Ações Necessárias:**
1. `cd server && cp env.example .env` - Criar arquivo de configuração
2. Editar `.env` com suas credenciais do Brevo
3. `cd server && npm install` - Instalar dependências
4. Obter Template ID do Brevo e adicionar no `.env`
5. `cd server && npm start` - Iniciar servidor
6. Testar!

**Tempo estimado:** 5-10 minutos para configurar e testar
