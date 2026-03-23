import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "PrintPartner"

interface LeadNotificationProps {
  name?: string
  email?: string
  phone?: string
  message?: string
  products?: string
  contactType?: string
}

const LeadNotificationEmail = ({ name, email, phone, message, products, contactType }: LeadNotificationProps) => (
  <Html lang="pl" dir="ltr">
    <Head />
    <Preview>Nowe zgłoszenie od {name || 'klienta'} — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nowe zgłoszenie — {SITE_NAME}</Heading>
        <Hr style={hr} />
        <Section>
          <Text style={label}>Imię i nazwisko:</Text>
          <Text style={value}>{name || '—'}</Text>

          <Text style={label}>E-mail:</Text>
          <Text style={value}>{email || '—'}</Text>

          <Text style={label}>Telefon:</Text>
          <Text style={value}>{phone || '—'}</Text>

          <Text style={label}>Forma kontaktu:</Text>
          <Text style={value}>{contactType || '—'}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={label}>Wybrane produkty:</Text>
        <Text style={value}>{products || '—'}</Text>
        <Hr style={hr} />
        <Text style={label}>Wiadomość:</Text>
        <Text style={value}>{message || '—'}</Text>
        <Hr style={hr} />
        <Text style={footer}>Wiadomość wygenerowana automatycznie przez {SITE_NAME}.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: LeadNotificationEmail,
  subject: (data: Record<string, any>) => `Nowe zgłoszenie PrintPartner — ${data.name || 'Klient'}`,
  to: 'lead.drukpolska@gmail.com',
  displayName: 'Powiadomienie o leadzie',
  previewData: {
    name: 'Jan Kowalski',
    email: 'jan@example.com',
    phone: '123 456 789',
    message: 'Chciałbym poznać ofertę na kalendarze.',
    products: '• Kalendarz trójdzielny LUX wypukły: Mam dostawcę (ABC Druk)\n• Gra Re-Flex: Jeszcze nie kupuję — chcę wdrożyć',
    contactType: 'Kontakt z handlowcem',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '580px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1a365d', margin: '0 0 20px' }
const hr = { borderColor: '#e2e8f0', margin: '16px 0' }
const label = { fontSize: '12px', color: '#718096', margin: '0 0 2px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }
const value = { fontSize: '15px', color: '#1a202c', margin: '0 0 14px', lineHeight: '1.5', whiteSpace: 'pre-line' as const }
const footer = { fontSize: '11px', color: '#a0aec0', margin: '24px 0 0' }
