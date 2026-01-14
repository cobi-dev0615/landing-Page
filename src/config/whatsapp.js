/**
 * Configuração do WhatsApp
 * 
 * Para configurar o número do WhatsApp:
 * 1. Use o formato internacional SEM o sinal de +
 * 2. Exemplo: 5511999999999 (Brasil: 55 + DDD + número)
 * 3. Ou defina a variável de ambiente VITE_WHATSAPP_NUMBER
 */

export const WHATSAPP_CONFIG = {
  // Número do WhatsApp (formato internacional sem +)
  // Exemplo para Brasil: 5511999999999
  phoneNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '5511999999999',
  
  // Mensagem padrão que será enviada
  defaultMessage: 'Olá! Gostaria de saber mais sobre o projeto Beth Mirage.'
}
