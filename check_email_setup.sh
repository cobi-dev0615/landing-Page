#!/bin/bash
echo "🔍 Verificando configuração da automação de email..."
echo ""

# Check .env file
if [ -f "server/.env" ]; then
  echo "✅ Arquivo .env existe"
else
  echo "❌ Arquivo .env NÃO existe"
  echo "   Execute: cd server && cp env.example .env"
fi

# Check dependencies
if [ -d "server/node_modules" ]; then
  echo "✅ Dependências instaladas"
else
  echo "❌ Dependências NÃO instaladas"
  echo "   Execute: cd server && npm install"
fi

# Check PDF
if [ -f "media/ebook.pdf" ]; then
  echo "✅ PDF existe em media/ebook.pdf"
else
  echo "⚠️ PDF não encontrado em media/"
  if [ -f "ebook.pdf" ]; then
    echo "   PDF encontrado na raiz - copie para media/"
  fi
fi

# Check API Key
if [ -f "server/.env" ]; then
  if grep -q "BREVO_API_KEY=xkeysib" server/.env 2>/dev/null; then
    echo "✅ BREVO_API_KEY configurada"
  else
    echo "⚠️ BREVO_API_KEY precisa ser configurada no .env"
  fi
  
  if grep -q "BREVO_TEMPLATE_ID=[0-9]" server/.env 2>/dev/null; then
    TEMPLATE_ID=$(grep "BREVO_TEMPLATE_ID" server/.env | cut -d'=' -f2)
    if [ "$TEMPLATE_ID" != "0" ]; then
      echo "✅ BREVO_TEMPLATE_ID configurado: $TEMPLATE_ID"
    else
      echo "⚠️ BREVO_TEMPLATE_ID precisa ser configurado (não pode ser 0)"
    fi
  else
    echo "⚠️ BREVO_TEMPLATE_ID precisa ser configurado no .env"
  fi
fi

echo ""
echo "📝 Próximos passos:"
echo "1. Configure o arquivo server/.env"
echo "2. Instale as dependências: cd server && npm install"
echo "3. Inicie o servidor: cd server && npm start"
echo "4. Teste o formulário na landing page"
