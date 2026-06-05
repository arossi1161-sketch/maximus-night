import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  phone?: string
  message?: string
}

const Email = ({ name, email, phone, message }: Props) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Nuovo messaggio dal sito MAXIMUS da {name || 'visitatore'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nuovo messaggio dal sito</Heading>
        <Text style={subtitle}>MAXIMUS Terni — Form contatti</Text>
        <Hr style={hr} />
        <Section>
          <Text style={label}>Nome</Text>
          <Text style={value}>{name || '—'}</Text>
          <Text style={label}>Email</Text>
          <Text style={value}>{email || '—'}</Text>
          <Text style={label}>Telefono</Text>
          <Text style={value}>{phone || '—'}</Text>
          <Text style={label}>Messaggio</Text>
          <Text style={messageBox}>{message || '—'}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>Rispondi direttamente a questa email per contattare il cliente.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Props) => `Nuovo contatto dal sito — ${d?.name || 'Sito MAXIMUS'}`,
  displayName: 'Notifica contatto sito',
  to: 'info@maximusterni.com',
  previewData: {
    name: 'Mario Rossi',
    email: 'mario@example.com',
    phone: '+39 333 1234567',
    message: 'Vorrei prenotare un tavolo per sabato sera.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '600px' }
const h1 = { color: '#0a0a0a', fontSize: '24px', margin: '0 0 4px' }
const subtitle = { color: '#b8945a', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0' }
const hr = { borderColor: '#e5e5e5', margin: '20px 0' }
const label = { color: '#888', fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '1px', margin: '12px 0 4px' }
const value = { color: '#111', fontSize: '15px', margin: '0' }
const messageBox = { color: '#111', fontSize: '15px', lineHeight: '1.6', padding: '12px', backgroundColor: '#f7f7f5', borderRadius: '6px', margin: '0', whiteSpace: 'pre-wrap' as const }
const footer = { color: '#888', fontSize: '12px' }
