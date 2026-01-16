# 🔍 Debug do Erro 500

## Problema Identificado

O erro 500 `FUNCTION_INVOCATION_FAILED` na Vercel pode ter várias causas. Já corrigi algumas:

### ✅ Correções Aplicadas

1. **Validação da API Key**: Movida para dentro da função, não mais no import
2. **Melhor tratamento de erros**: Logs mais detalhados
3. **Caminhos do PDF**: Múltiplos caminhos testados

## 🔧 Próximos Passos para Debug

### 1. Verificar Logs da Vercel

1. Acesse o [Dashboard da Vercel](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Deployments** → Selecione o último deploy
4. Clique em **Functions** → Veja os logs de erro

### 2. Verificar Variáveis de Ambiente

Certifique-se de que TODAS as variáveis estão configuradas na Vercel:

```
BREVO_API_KEY=xkeysib-...
BREVO_TEMPLATE_ID=123
FROM_EMAIL=noreply@bethmirage.com.br
FROM_NAME=Beth Mirage
REPLY_TO_EMAIL=contato@bethmirage.com.br
DOMAIN=https://www.bethmirage.com
PLATFORM_LINK=https://www.bethmirage.com
EBOOK_PDF_PATH=./public/media/ebook.pdf
NODE_ENV=production
```

### 3. Possíveis Causas do Erro 500

#### A. PDF não encontrado
- **Sintoma**: Erro "PDF file not found"
- **Solução**: 
  - Certifique-se de que `public/media/ebook.pdf` existe
  - Ou configure `EBOOK_PDF_PATH` corretamente
  - Ou use um serviço de armazenamento (S3, Cloudinary)

#### B. BREVO_API_KEY não configurada
- **Sintoma**: Erro "BREVO_API_KEY não configurada"
- **Solução**: Adicione a variável no dashboard da Vercel

#### C. BREVO_TEMPLATE_ID inválido
- **Sintoma**: Erro da API do Brevo sobre template
- **Solução**: Verifique se o ID do template está correto

#### D. Timeout
- **Sintoma**: Função demora mais de 10s (plano Hobby)
- **Solução**: 
  - Otimize o código
  - Ou faça upload do PDF para um serviço externo
  - Ou use Vercel Pro (timeout maior)

### 4. Testar Localmente

Para testar localmente antes de fazer deploy:

```bash
# Instale as dependências
npm install

# Configure .env na raiz
cp server/env.example .env
# Edite .env com suas credenciais

# Teste a função localmente
node -e "
import('./api/subscribe.js').then(m => {
  const handler = m.default;
  handler({
    method: 'POST',
    body: {
      name: 'Teste',
      email: 'teste@exemplo.com',
      phone: '(11) 99999-9999',
      consent: true
    }
  }, {
    status: (code) => ({
      json: (data) => console.log('Status:', code, data)
    })
  });
});
"
```

### 5. Verificar Estrutura de Arquivos

Certifique-se de que a estrutura está assim:

```
landingPage/
├── api/
│   ├── subscribe.js
│   ├── stories.js
│   └── health.js
├── server/
│   └── services/
│       ├── brevoService.js
│       └── database.js
├── public/
│   └── media/
│       └── ebook.pdf  ← IMPORTANTE!
└── package.json
```

### 6. Testar Health Check Primeiro

Teste o endpoint mais simples primeiro:

```bash
curl https://www.bethmirage.com/api/health
```

Se isso funcionar, o problema está nas outras funções.

## 📝 Checklist de Debug

- [ ] Logs da Vercel verificados
- [ ] Todas as variáveis de ambiente configuradas
- [ ] PDF existe em `public/media/ebook.pdf`
- [ ] BREVO_API_KEY está correta
- [ ] BREVO_TEMPLATE_ID está correto
- [ ] Health check funciona
- [ ] Testado localmente (se possível)

## 🆘 Se Nada Funcionar

1. **Simplifique a função**: Remova temporariamente o envio de email e apenas retorne sucesso
2. **Teste passo a passo**: Adicione cada parte (validação, database, email) uma de cada vez
3. **Use logs detalhados**: Adicione `console.log` em cada etapa
4. **Verifique a documentação da Vercel**: [Vercel Functions Docs](https://vercel.com/docs/functions)
