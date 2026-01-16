# 🚀 Guia de Deploy em Produção

## ❌ Problema Atual

O site está tentando acessar `https://www.bethmirage.com/api/subscribe` mas recebe 404 porque:
- O backend não está rodando no servidor de produção
- Ou o servidor web não está configurado para redirecionar `/api` para o backend

## ✅ Soluções Possíveis

### Opção 1: Proxy Reverso no Servidor Web (Recomendado)

Configure seu servidor web (Nginx/Apache) para fazer proxy reverso:

#### Nginx Configuration

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name www.bethmirage.com bethmirage.com;

    # Redirecionar HTTP para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.bethmirage.com bethmirage.com;

    # SSL Configuration
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;

    # Frontend (React build)
    root /var/www/bethmirage/dist;
    index index.html;

    # API Proxy - Redireciona /api para o backend
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Media files
    location /media {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
    }

    # Frontend routes
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Apache Configuration

```apache
<VirtualHost *:443>
    ServerName www.bethmirage.com
    ServerAlias bethmirage.com

    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /path/to/ssl/cert.pem
    SSLCertificateKeyFile /path/to/ssl/key.pem

    # Frontend
    DocumentRoot /var/www/bethmirage/dist
    <Directory /var/www/bethmirage/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # API Proxy
    ProxyPreserveHost On
    ProxyPass /api http://localhost:3001/api
    ProxyPassReverse /api http://localhost:3001/api

    # Media Proxy
    ProxyPass /media http://localhost:3001/media
    ProxyPassReverse /media http://localhost:3001/media

    # Frontend routes
    <Directory /var/www/bethmirage/dist>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

### Opção 2: Backend em Servidor Separado

Se o backend estiver em um servidor diferente, configure a URL no build:

1. **Crie arquivo `.env.production` na raiz:**
```env
VITE_API_URL=https://api.bethmirage.com/api
```

2. **Faça o build:**
```bash
npm run build
```

3. **O build usará a URL configurada**

### Opção 3: Backend Serverless (Vercel/Railway)

Se usar Vercel ou Railway para o backend:

1. **Deploy do backend** em Vercel/Railway
2. **Obtenha a URL** (ex: `https://bethmirage-api.vercel.app`)
3. **Configure no frontend:**
```env
VITE_API_URL=https://bethmirage-api.vercel.app/api
```

## 📋 Checklist de Deploy

### Backend
- [ ] Backend deployado e rodando
- [ ] Variáveis de ambiente configuradas no servidor
- [ ] Servidor acessível (porta 3001 ou configurada)
- [ ] Teste: `curl https://www.bethmirage.com/api/health`

### Frontend
- [ ] Build de produção criado: `npm run build`
- [ ] Arquivos em `dist/` deployados no servidor web
- [ ] `.env.production` configurado (se necessário)
- [ ] Teste: Acesse `https://www.bethmirage.com`

### Servidor Web
- [ ] Nginx/Apache configurado com proxy reverso
- [ ] SSL/HTTPS configurado
- [ ] Redirecionamento HTTP → HTTPS
- [ ] Teste: `curl https://www.bethmirage.com/api/health`

## 🔧 Configuração Rápida

### 1. Deploy do Backend no Mesmo Servidor

```bash
# No servidor de produção
cd /var/www/bethmirage/server
npm install
cp env.example .env
# Edite .env com credenciais de produção
pm2 start server.js --name bethmirage-api
pm2 save
```

### 2. Configurar Nginx

```bash
# Copie a configuração acima para:
sudo nano /etc/nginx/sites-available/bethmirage

# Crie link simbólico
sudo ln -s /etc/nginx/sites-available/bethmirage /etc/nginx/sites-enabled/

# Teste configuração
sudo nginx -t

# Reinicie Nginx
sudo systemctl restart nginx
```

### 3. Deploy do Frontend

```bash
# No servidor de produção
cd /var/www/bethmirage
npm run build
# Os arquivos em dist/ já estarão servidos pelo Nginx
```

## 🧪 Testar em Produção

```bash
# Teste health check
curl https://www.bethmirage.com/api/health

# Teste subscribe (substitua com dados reais)
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

- O proxy reverso é a solução mais comum e recomendada
- Mantenha o backend rodando (use PM2, systemd, ou similar)
- Configure SSL/HTTPS para segurança
- Monitore os logs do backend e do servidor web
