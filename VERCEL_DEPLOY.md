# 🚀 Deploy na Vercel - Guia Completo

## ✅ Solução para o Erro 404

O site está na Vercel e o backend precisa ser configurado como **Serverless Functions**. Já criei os arquivos necessários!

## 📁 Arquivos Criados

1. **`api/subscribe.js`** - Endpoint para download do e-book
2. **`api/stories.js`** - Endpoint para envio de relatos
3. **`api/health.js`** - Health check
4. **`vercel.json`** - Configuração do Vercel

## 🔧 Passos para Deploy

### 1. Instalar Dependências do Backend na Raiz

As dependências do backend precisam estar na raiz do projeto para as serverless functions funcionarem:

```bash
# Na raiz do projeto
npm install express cors dotenv
```

Ou adicione ao `package.json` da raiz:

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  }
}
```

### 2. Configurar Variáveis de Ambiente na Vercel

1. Acesse o [Dashboard da Vercel](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione as seguintes variáveis:

```
BREVO_API_KEY=xkeysib-sua-api-key-aqui
BREVO_TEMPLATE_ID=seu-template-id
BREVO_STORY_TEMPLATE_ID=seu-story-template-id (opcional)
FROM_EMAIL=noreply@bethmirage.com.br
FROM_NAME=Beth Mirage
REPLY_TO_EMAIL=contato@bethmirage.com.br
EBOOK_PDF_PATH=./media/ebook.pdf
DOMAIN=https://www.bethmirage.com
PLATFORM_LINK=https://www.bethmirage.com
NODE_ENV=production
```

### 3. Upload do PDF do E-book

O PDF precisa estar acessível para as serverless functions. Opções:

**Opção A: Colocar na pasta `public/media/`**
```bash
mkdir -p public/media
cp media/ebook.pdf public/media/ebook.pdf
```

**Opção B: Usar um serviço de armazenamento (S3, Cloudinary, etc.)**
- Atualize `EBOOK_PDF_PATH` para a URL do PDF

### 4. Fazer Deploy

```bash
# Se ainda não tem Vercel CLI instalado
npm i -g vercel

# Login na Vercel
vercel login

# Deploy
vercel --prod
```

Ou faça push para o repositório conectado à Vercel (deploy automático).

## 🧪 Testar Após Deploy

```bash
# Health check
curl https://www.bethmirage.com/api/health

# Teste subscribe
curl -X POST https://www.bethmirage.com/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@exemplo.com",
    "phone": "(11) 99999-9999",
    "consent": true
  }'
```

## ⚠️ Importante

1. **PDF do E-book**: Certifique-se de que o PDF está acessível. Se estiver em `public/media/ebook.pdf`, o caminho será `./public/media/ebook.pdf` ou use caminho absoluto.

2. **Tamanho do PDF**: A Vercel tem limite de 50MB para serverless functions. Se o PDF for maior, use um serviço de armazenamento externo.

3. **Timeout**: A Vercel tem timeout de 10s no plano Hobby. Se o envio de email demorar, considere usar uma fila (ex: Vercel Queue).

4. **Logs**: Monitore os logs no dashboard da Vercel para debug.

## 🔍 Troubleshooting

### Erro: "Cannot find module"
- Certifique-se de que as dependências estão instaladas na raiz
- Verifique se os imports estão corretos

### Erro: "PDF file not found"
- Verifique o caminho do PDF
- Use caminho absoluto ou relativo à raiz do projeto
- Considere usar um serviço de armazenamento

### Erro: "BREVO_API_KEY não configurada"
- Verifique se as variáveis de ambiente estão configuradas na Vercel
- Certifique-se de que estão no ambiente de produção

## 📝 Estrutura Final

```
landingPage/
├── api/                    # Serverless Functions (Vercel)
│   ├── subscribe.js
│   ├── stories.js
│   └── health.js
├── server/                 # Backend tradicional (para dev local)
│   ├── server.js
│   └── services/
├── public/
│   └── media/
│       └── ebook.pdf       # PDF do e-book
├── src/                    # Frontend React
├── vercel.json            # Configuração Vercel
└── package.json
```
