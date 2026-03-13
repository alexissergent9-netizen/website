import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import googleSheetsService from '../services/googleSheetsService'
import Loading from '../components/Loading'
import './ContactSubpage.css'

const SECTIONS = [
  { slug: 'faqs', label: 'Frequently Asked Questions' },
  { slug: 'NFT_report', label: 'A Word of Warning Concerning NFTs' },
  { slug: 'information_request', label: 'Information Requests' },
  { slug: 'repro_request', label: 'Reproduction Requests' },
  { slug: 'privacy_notice', label: 'Privacy Notice' },
]

const STATIC_CONTENT = {
  faqs: {
    title: 'Frequently Asked Questions',
    items: [
      { type: 'faq', question: 'How can I purchase a work by David Hockney?', content: 'Works by David Hockney are available through his representing galleries. Please visit the Galleries section for contact details.' },
      { type: 'faq', question: 'Can I use images of David Hockney\'s work in my publication or project?', content: 'All works by David Hockney are protected by copyright. For reproduction requests, please use the Reproduction Requests form.' },
      { type: 'faq', question: 'Does David Hockney accept commissions?', content: 'David Hockney does not currently accept commissions. All enquiries should be directed through his galleries.' },
      { type: 'faq', question: 'Where can I see David Hockney\'s work in person?', content: 'David Hockney\'s works are held in museums and collections around the world. Please see the Works in Public Collections section for more information.' },
      { type: 'faq', question: 'How can I contact David Hockney\'s studio directly?', content: 'David Hockney\'s studio does not accept unsolicited correspondence. For press and media enquiries, please use the Information Requests form.' },
    ],
  },
  NFT_report: {
    title: 'A Word of Warning Concerning NFTs',
    items: [
      { type: 'paragraph', content: 'David Hockney has not authorised, endorsed, or participated in any NFT (Non-Fungible Token) sales of his artworks.' },
      { type: 'paragraph', content: 'Any NFTs purporting to represent David Hockney\'s works are unauthorised and may constitute fraud. Buyers should exercise extreme caution and be aware that the purchase of such NFTs does not confer any rights over the underlying artworks, which remain the property of David Hockney and/or their respective owners.' },
      { type: 'paragraph', content: 'David Hockney\'s studio is aware of multiple instances of fraudulent NFT sales using his name and images. We strongly advise the public not to purchase any NFTs claimed to be by or associated with David Hockney without first verifying their authenticity through official channels.' },
      { type: 'paragraph', content: 'If you encounter what you believe to be an unauthorised NFT using David Hockney\'s work, please contact us using the Information Requests form.' },
    ],
  },
  information_request: {
    title: 'Information Requests',
    items: [
      { type: 'paragraph', content: 'For general information requests, press enquiries, and media requests, please contact David Hockney\'s studio through the appropriate gallery.' },
      { type: 'paragraph', content: 'Please note that due to the volume of correspondence received, it may not be possible to respond to every enquiry. We will do our best to respond to all legitimate press and media requests in a timely manner.' },
      { type: 'paragraph', content: 'For press and media enquiries, please provide: your name and organisation, the nature of your enquiry, your deadline (if applicable), and your contact details.' },
      { type: 'paragraph', content: 'All requests are handled in accordance with our Privacy Notice.' },
    ],
  },
  repro_request: {
    title: 'Reproduction Requests',
    items: [
      { type: 'paragraph', content: 'All images of works by David Hockney are protected by copyright. Permission must be obtained before reproducing any image in any medium, including print, digital, and broadcast.' },
      { type: 'paragraph', content: 'To request permission to reproduce an image, please provide: the work(s) you wish to reproduce (title, date, medium), the purpose of reproduction (book, magazine, website, exhibition, etc.), the territory and language of publication, the edition size or expected audience reach, the proposed reproduction size, and your organisation and contact details.' },
      { type: 'paragraph', content: 'Please note that reproduction fees may apply. All requests are subject to approval and the granting of permission does not imply endorsement of the publication or project.' },
      { type: 'paragraph', content: 'Requests should be directed through the appropriate representing gallery. Please visit the Galleries section for contact details.' },
    ],
  },
  privacy_notice: {
    title: 'Privacy Notice',
    items: [
      { type: 'paragraph', content: 'This Privacy Notice explains how we collect, use, and protect your personal information when you use this website.' },
      { type: 'paragraph', content: 'Information We Collect: We may collect personal information that you provide to us directly, such as your name, email address, and any other information you provide when contacting us.' },
      { type: 'paragraph', content: 'How We Use Your Information: We use the information we collect to respond to your enquiries, process requests, and improve our website and services.' },
      { type: 'paragraph', content: 'Cookies: This website may use cookies to improve your browsing experience. You can control cookie settings through your browser preferences.' },
      { type: 'paragraph', content: 'Third Parties: We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except where required by law.' },
      { type: 'paragraph', content: 'Data Retention: We retain personal information only for as long as necessary to fulfil the purposes for which it was collected.' },
      { type: 'paragraph', content: 'Your Rights: You have the right to access, correct, or delete personal information we hold about you. To exercise these rights, please contact us through the Information Requests form.' },
      { type: 'paragraph', content: 'Changes to This Notice: We may update this Privacy Notice from time to time. Changes will be posted on this page.' },
    ],
  },
}

function ContactSubpage() {
  const { section } = useParams()
  const [items, setItems] = useState(null)
  const [loading, setLoading] = useState(true)
  const currentSection = SECTIONS.find(s => s.slug === section)
  const staticContent = STATIC_CONTENT[section]

  useEffect(() => {
    setLoading(true)
    googleSheetsService.getContactContent(section)
      .then(data => { if (data.length > 0) setItems(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [section])

  if (loading) return <Loading />

  // Resolver contenido: Sheets si hay datos, si no fallback estático
  const displayItems = items
    ? items.map(r => ({ type: r.type, question: r.question, content: r.content }))
    : (staticContent?.items || [])

  const title = staticContent?.title || currentSection?.label || section

  return (
    <div className="csub-container">

      {/* Breadcrumb */}
      <div className="csub-breadcrumb-row">
        <Link to="/contact" className="csub-breadcrumb-link">CONTACTS</Link>
        <span className="csub-breadcrumb-sep"> / </span>
        <span className="csub-breadcrumb-active">
          {currentSection?.label?.toUpperCase() || section.toUpperCase()}
        </span>
      </div>

      {/* Subnav */}
      <div className="csub-subnav-row">
        {SECTIONS.map((s, i) => (
          <span key={s.slug}>
            {i > 0 && <span className="csub-subnav-sep"> / </span>}
            <Link
              to={`/contact/${s.slug}`}
              className={`csub-subnav-link ${section === s.slug ? 'active' : ''}`}
            >
              {s.label.toLowerCase()}
            </Link>
          </span>
        ))}
      </div>

      <hr className="csub-divider" />

      <div className="csub-content">
        <h2 className="csub-title">{title}</h2>

        {displayItems.map((item, i) => (
          item.type === 'faq' ? (
            <div key={i} className="csub-faq-item">
              <p className="csub-faq-q">{item.question}</p>
              <p className="csub-faq-a">{item.content}</p>
            </div>
          ) : (
            <p key={i} className="csub-para">{item.content}</p>
          )
        ))}

        {displayItems.length === 0 && (
          <p className="csub-not-found">No content available for this section.</p>
        )}
      </div>

    </div>
  )
}

export default ContactSubpage
