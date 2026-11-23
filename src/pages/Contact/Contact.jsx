import ContactForm from '../../components/ContactForm/Contactform'
import { usePageTitle } from '../../hooks/usePageTitle'

export default function Contact() {
  usePageTitle('Contato')

  return (
    <div className="page-glow">
      <ContactForm />
    </div>
  )
}