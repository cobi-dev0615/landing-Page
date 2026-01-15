# Configuração do Template de Email no Brevo

Este guia explica como configurar o template de email no Brevo e integrá-lo com o projeto.

## 📋 Passo 1: Criar o Template no Brevo

1. Acesse [Brevo Dashboard](https://app.brevo.com/)
2. Vá em **Campaigns** → **Email Templates**
3. Clique em **Create a new template**
4. Escolha **Blank Template** ou use um template existente

## 📝 Passo 2: Configurar as Variáveis no Template

No template do Brevo, use as seguintes variáveis que serão substituídas automaticamente:

### Variáveis Disponíveis:

- `{{ params.LEAD_NAME }}` - Nome do lead (ou como deseja ser chamado)
- `{{ params.EBOOK_NAME }}` - Nome do e-book: "Nas Garras de Beth Mirage"
- `{{ params.FILE_LINK }}` - Link para download do PDF: `https://bethmirage.com.br/media/ebook.pdf`
- `{{ params.PLATFORM_LINK }}` - Link para a plataforma (configurável no .env)

### Exemplo de Template:

```
Hello, {{ params.LEAD_NAME }}!

How are you?

As promised, here's your access to the guide: {{ params.EBOOK_NAME }}.

I know how valuable time is and how much a lack of organization can drain our energy. This material was created precisely to be direct and to the point, helping you regain control of your management in a simple and intelligent way.

To download now, just click the button below:
👉 [BUTTON: DOWNLOAD MY E-book IN PDF]
(Tip: If the button doesn't work, click this link: {{ params.FILE_LINK }})

The Next Step:
After reading the guide, you'll realize that theory is important, but the right tool does the hard work for you.
If you feel ready to automate these processes and gain more hours in your day, reply to this email or click the link below to learn how our software can accelerate this result:
🔗 {{ params.PLATFORM_LINK }}

I am available for anything you need.

Best regards,
```

## 🔑 Passo 3: Obter o Template ID

1. Após criar o template, salve-o
2. Na lista de templates, encontre o seu template
3. O **Template ID** estará visível (geralmente um número como `1`, `2`, `3`, etc.)
4. Copie este ID

## ⚙️ Passo 4: Configurar no Projeto

1. Edite o arquivo `.env` na pasta `server/`:

```env
BREVO_TEMPLATE_ID=1  # Substitua pelo ID do seu template
```

2. Configure o link da plataforma (opcional):

```env
PLATFORM_LINK=https://sua-plataforma.com.br
```

## 📎 Passo 5: Configurar o Botão de Download

No template do Brevo, você pode criar um botão HTML:

```html
<a href="{{ params.FILE_LINK }}" style="background-color: #d4af37; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
  DOWNLOAD MY E-BOOK IN PDF
</a>
```

Ou use o editor visual do Brevo para criar o botão e inserir a variável `{{ params.FILE_LINK }}` como link.

## ✅ Passo 6: Testar

1. Inicie o servidor:
```bash
cd server
npm start
```

2. Teste o envio de email através do formulário da landing page

3. Verifique se o email foi recebido com:
   - Nome personalizado
   - Link de download funcionando
   - PDF anexado
   - Todas as variáveis substituídas corretamente

## 🔍 Troubleshooting

### Template não encontrado
- Verifique se o `BREVO_TEMPLATE_ID` está correto no `.env`
- Certifique-se de que o template está ativo no Brevo

### Variáveis não substituídas
- Verifique se as variáveis estão escritas exatamente como: `{{ params.LEAD_NAME }}`
- Certifique-se de usar `params.` antes do nome da variável

### PDF não anexado
- Verifique se o arquivo PDF existe no caminho configurado
- Verifique o caminho `EBOOK_PDF_PATH` no `.env`

## 📚 Recursos

- [Documentação Brevo Templates](https://developers.brevo.com/docs/send-transactional-emails)
- [Variáveis de Template Brevo](https://help.brevo.com/hc/en-us/articles/209467485)
