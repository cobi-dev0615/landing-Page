# Beth Mirage Landing Page

A high-impact, responsive landing page to raise awareness about gambling addiction, distribute an e-book, and collect anonymous testimonials.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## 📁 Project Structure

```
landingPage/
├── src/
│   ├── components/
│   │   ├── Hero/          # Hero section with CTA
│   │   ├── About/         # About section
│   │   ├── Book/          # Book section with chapters
│   │   └── StoryForm/     # Story submission form
│   ├── services/          # API service functions
│   ├── styles/            # Global styles
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── public/                # Static assets
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Features

- **Responsive Design**: Mobile-first approach, fully responsive
- **Dark Theme**: Elegant black/graphite color scheme
- **Email Automation**: E-book delivery via email (requires backend setup)
- **Anonymous Submissions**: Story form with anonymity options
- **Modern Stack**: React.js with Vite

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:3001/api
VITE_WHATSAPP_NUMBER=5511999999999
```

**Note**: In Vite, environment variables must be prefixed with `VITE_` to be exposed to the client.

**WhatsApp Configuration:**
- `VITE_WHATSAPP_NUMBER`: Número do WhatsApp no formato internacional sem o sinal de +
  - Exemplo para Brasil: `5511999999999` (55 = código do país, 11 = DDD, 999999999 = número)

### Backend Integration

The landing page expects the following API endpoints:

1. **POST /api/subscribe**
   - Body: `{ email: string }`
   - Response: `{ success: boolean, message: string }`
   - Triggers automatic e-book PDF delivery

2. **POST /api/stories**
   - Body: `{ identificationType: string, story: string, ... }`
   - Response: `{ success: boolean, message: string }`
   - Stores story submissions

## 📝 Content

- Book content is available in `doc.txt`
- Book cover images should be placed in `public/images/`
- E-book PDF should be configured in the backend email service

## 🎯 Next Steps

1. **Backend Setup**: Configure email service (SendGrid, AWS SES, etc.)
2. **Book Cover**: Replace placeholder with actual book cover image
3. **Domain**: Configure domain `bethmirage.com.br` with SSL
4. **Testing**: Test email delivery and form submissions
5. **SEO**: Add meta tags and optimize for search engines

## 📦 Dependencies

- **react**: ^18.2.0
- **react-dom**: ^18.2.0
- **react-hook-form**: ^7.48.2 (form handling)
- **axios**: ^1.6.2 (HTTP requests)
- **vite**: ^5.0.8 (build tool)

## 🔒 Privacy & Security

- Anonymous submissions are handled securely
- Email addresses are optional for story submissions
- SSL certificate required for production (mentioned in requirements)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is for the Beth Mirage awareness campaign.
