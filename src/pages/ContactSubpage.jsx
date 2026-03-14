import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import googleSheetsService from '../services/googleSheetsService'
import Loading from '../components/Loading'
import './ContactSubpage.css'

/* ─── Sidebar links (same as Contact page) ─── */
const SIDEBAR_LINKS = [
  { label: 'Frequently Asked Questions', href: '/contact/faqs', external: false },
  { label: 'A Word of Warning Concerning NFTs', href: '/contact/NFT_report', external: false },
  { label: 'Galleries', href: '/resources/galleries', external: false },
  { label: 'Information Requests', href: '/contact/information_request', external: false },
  { label: 'Reproduction Requests', href: '/contact/repro_request', external: false },
  { label: 'Privacy Notice', href: '/contact/privacy_notice', external: false },
]

/* ─── Static fallback content (matches real hockney.com) ─── */
const STATIC_CONTENT = {
  faqs: {
    title: 'Frequently Asked Questions',
    items: [
      { type: 'note', content: 'NOTE: Our mailboxes are actively monitored. However, high volume prevents us from acknowledging and responding to all messages.' },
      { type: 'section_header', content: 'Requests' },
      { type: 'label', content: 'Advice, Autographs, Mail' },
      { type: 'paragraph', content: 'David Hockney does not respond to requests for advice, critique on work by other artists, autographs or personalized messages.' },
      { type: 'paragraph', content: 'David Hockney is unable to respond to requests for his time and participation in collaborative projects or invitations for visits and public speaking engagements.' },
      { type: 'paragraph', content: 'We do not provide a mailing address. Mail, gifts, art and packages containing items for autograph sent to any address believed to be associated with the artist will not be acknowledged or returned.' },
      { type: 'label', content: 'Interview requests' },
      { type: 'paragraph', content: 'David Hockney only participates in a very small number of carefully managed interviews, generally in conjunction with the opening of an exhibition of his work.' },
      { type: 'label', content: 'Donations' },
      { type: 'paragraph', content: 'David Hockney does not donate works of art or other items for benefit auctions.' },
      { type: 'label', content: 'Restoration and Conservation of Artwork' },
      { type: 'paragraph', content: 'Questions regarding the conservation or restoration of artworks should be directed to the seller, qualified fine art handler or conservation professional.' },
      { type: 'section_header', content: 'Copyright and Merchandise' },
      { type: 'label', content: 'Copyright permissions' },
      { type: 'paragraph', content: 'David Hockney retains full copyright in all images of his work. Requests to license images of the artist or of works by the artist should be submitted via email to repro@hockneypictures.com. Failure to obtain permission to license images of copyrighted material will result in legal action.' },
      { type: 'label', content: 'Participation in retail ventures, merchandising, retail collaborations' },
      { type: 'paragraph', content: "David Hockney does not participate in, nor provide images of work for, retail or commercial projects; reproduction of images of work by the artist for merchandise is permitted under strict guidelines only in conjunction with exhibitions of the artist's work in public institutions." },
      { type: 'label', content: 'Merchandise (Posters, prints, and/or work by David Hockney for sale at on-line platforms such as Ebay, Amazon, etc.)' },
      { type: 'paragraph', content: 'See "Reproduction Prints" below. Merchandise approved by David Hockney and produced in conjunction with exhibitions is often offered for sale at the venues hosting those exhibitions.' },
      { type: 'paragraph', content: 'Please note that those museums who produce merchandise, including posters, postcards, prints or any other item for sale, can only do so with the approval of the artist. Please see our policy regarding reproduction of images of work by the artist.' },
      { type: 'paragraph', content: 'Unauthorized reproduction of images of work by the artist on materials for sale is monitored closely and will result in legal action, and prosecution to the fullest extent of the laws pertaining to copyright and trademark infringement.' },
      { type: 'label', content: 'NFT warning' },
      { type: 'paragraph', content: 'David Hockney does not participate in or collaborate in the creation of any NFTs (Non-Fungible Tokens). Any NFT of a Hockney work or derivative of his works or one purported to be by David Hockney is not authentic, is unauthorized, and is illegal.' },
      { type: 'paragraph', content: 'Do not create, post, sell or purchase any purported Hockney NFT or derivatives as it will subject you to legal action if you do. Upon identifying any such NFT we will have it taken down and have the transaction canceled or remove the NFT from the blockchain.' },
      { type: 'label', content: 'Reproduction prints' },
      { type: 'paragraph', content: "David Hockney retains copyright of all images of his work. Permission to use images of works by David Hockney in the production of posters, prints, postcards, or other merchandise is strictly limited to items created for sale in conjunction with exhibitions of the artist's work in public institutions." },
      { type: 'paragraph', content: 'David Hockney does NOT provide or permit "reproduction prints" for personal use, nor does David Hockney provide images of his work for retail or commercial projects, other than as noted above.' },
      { type: 'paragraph', content: 'Requests to purchase merchandise, including authorized postcards and posters, should be directed to the institutions associated with exhibitions of the work or those institutions owning the work in question.' },
      { type: 'section_header', content: 'Museum Exhibitions and Loans' },
      { type: 'label', content: 'Exhibitions and lending works' },
      { type: 'paragraph', content: 'David Hockney Inc. actively lends to international exhibitions that further scholarly research and ensure that Mr Hockney\'s work reaches a wide audience. Museum loan requests should be submitted via email to info@hockneypictures.com. All loans originate from and return to Los Angeles; Borrower is responsible for all costs related to packing, shipping, and insurance.' },
      { type: 'section_header', content: 'Purchasing Work' },
      { type: 'label', content: 'Commissioned Works' },
      { type: 'paragraph', content: 'David Hockney does not accept proposals for artwork commissions.' },
      { type: 'label', content: 'Identification of works' },
      { type: 'paragraph', content: 'We do not authenticate nor provide certificates of authenticity for works.' },
      { type: 'label', content: 'Purchasing works by the artist' },
      { type: 'paragraph', content: 'We do not sell works from our website. Any interest should be directed to the gallery representatives listed on our Galleries webpage.' },
      { type: 'section_header', content: 'Students, Scholars and Art Publications' },
      { type: 'label', content: 'Internship programs' },
      { type: 'paragraph', content: 'David Hockney does not offer an internship program.' },
      { type: 'label', content: 'Process and Policy for publications development' },
      { type: 'paragraph', content: 'David Hockney retains copyright for all images of his work. Requests to produce publications about David Hockney which include images of works by the artist should be submitted via email to repro@hockneypictures.com. Provide all pertinent information about the project, including publication date, print run, publisher, etc.' },
      { type: 'label', content: 'Requests from Schools and Teachers' },
      { type: 'paragraph', content: 'Please do NOT send or ask to send student materials or artwork to the artist for his critique or review or praise. David Hockney is unable to offer feedback or encouragement on either an individual or group basis.' },
      { type: 'label', content: 'Research questions' },
      { type: 'paragraph', content: 'An extensive bibliography of works by and about David Hockney can be found on this website. Please consult the works listed here before seeking additional information about the artist and his work.' },
    ],
  },
  NFT_report: {
    title: 'A Word of Warning About NFTs (Non-fungible Tokens)',
    items: [
      { type: 'paragraph', content: 'David Hockney does not participate in or collaborate in the creation of any NFTs (Non-Fungible Tokens). Any NFT of a Hockney work or derivative of his works or one purported to be by David Hockney is not authentic, is unauthorized, and is illegal.' },
      { type: 'paragraph', content: 'Do not create, post, sell or purchase any purported Hockney NFT or derivatives as it will subject you to legal action if you do. Upon identifying any such NFT we will have it taken down and have the transaction canceled or remove the NFT from the blockchain.' },
    ],
  },
  information_request: {
    title: 'Information Request',
    items: [
      { type: 'paragraph', content: 'Please submit your request for information via email to info@hockneypictures.com.' },
      { type: 'paragraph', content: 'Please note that responses for information may take up to 5 business days.' },
    ],
  },
  repro_request: {
    title: 'Reproduction Request',
    items: [
      { type: 'paragraph', content: 'If you wish to license an image of David Hockney or David Hockney\'s artwork, please submit your request via email to repro@hockneypictures.com.' },
      { type: 'paragraph', content: 'David Hockney Inc. will primarily clear the copyright for image use and, in some cases, provide a file. Please note that responses to requests may take up to 5 business days.' },
    ],
  },
  privacy_notice: {
    title: 'David Hockney Group of Commercial and Charitable Entities Privacy Notice',
    items: [
      { type: 'label', content: 'Last updated: 24 October 2023' },
      { type: 'paragraph', content: 'This privacy notice explains how we, the David Hockney Group, process your personal data if you use our websites, app, service, content or feature or otherwise engage with us online or offline.' },
      { type: 'paragraph', content: 'Our notice covers both commercial and not-for-profit activities which will apply to the relevant entities, depending on their commercial or charitable objectives.' },
      { type: 'paragraph', content: 'If you have any question about your data protection rights or if you do not understand anything explained in this notice, please contact us by email at privacy@hockneypictures.com or by writing to Privacy at PO Box 93519, Los Angeles, CA 90093, USA.' },
      { type: 'section_header', content: 'Who does this privacy notice apply to?' },
      { type: 'paragraph', content: 'This notice applies to visitors to museums and galleries which display our exhibits; our private purchasers and other customers; event participants; our partners and suppliers; job applicants; users of our websites, app, online content and features; and anyone else who interacts with us online or offline.' },
      { type: 'section_header', content: 'What personal data do we collect?' },
      { type: 'paragraph', content: 'We may collect personal information that you provide to us directly, such as your name, email address, and any other information you provide when contacting us or using our services.' },
      { type: 'section_header', content: 'How do we use your personal data?' },
      { type: 'paragraph', content: 'We use the information we collect to respond to your enquiries, process requests, improve our website and services, and comply with legal obligations.' },
      { type: 'section_header', content: 'Cookies' },
      { type: 'paragraph', content: 'This website uses cookies to analyze our traffic and improve your browsing experience. You can control cookie settings through your browser preferences.' },
      { type: 'section_header', content: 'Third parties' },
      { type: 'paragraph', content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except where required by law.' },
      { type: 'section_header', content: 'Your rights' },
      { type: 'paragraph', content: 'You have the right to access, correct, or delete personal information we hold about you. To exercise these rights, please contact us at privacy@hockneypictures.com.' },
    ],
  },
}

/* ─── Item renderer ─── */
function renderItem(item, i) {
  switch (item.type) {
    case 'section_header':
      return <h2 key={i} className="csub-section-header">{item.content}</h2>
    case 'label':
      return <p key={i}><strong>{item.content}</strong></p>
    case 'note':
      return <p key={i} className="csub-note" style={{ paddingTop: 15 }}>{item.content}</p>
    default:
      return <p key={i} className="csub-para">{item.content}</p>
  }
}

function ContactSubpage() {
  const { section } = useParams()
  const [items, setItems] = useState(null)
  const [loading, setLoading] = useState(true)
  const staticContent = STATIC_CONTENT[section]

  useEffect(() => {
    setLoading(true)
    googleSheetsService.getContactContent(section)
      .then(data => { if (data.length > 0) setItems(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [section])

  if (loading) return <Loading />

  const displayItems = items
    ? items.map(r => ({ type: r.type, content: r.content || r.question || '' }))
    : (staticContent?.items || [])

  const title = staticContent?.title || section

  return (
    <div className="csub-container">

      {/* Breadcrumb — just CONTACTS, top-right */}
      <div className="csub-breadcrumb-row">
        <Link to="/contact" className="csub-breadcrumb-link">CONTACTS</Link>
      </div>

      <hr className="csub-divider" />

      {/* Two-column layout */}
      <div className="csub-layout">

        {/* Main content (75%) */}
        <main className="csub-main">
          <h1 className="csub-title">{title}</h1>

          {displayItems.map((item, i) => renderItem(item, i))}

          {displayItems.length === 0 && (
            <p className="csub-empty">No content available for this section.</p>
          )}
        </main>

        {/* Sidebar (25%) */}
        <aside className="csub-sidebar">
          <ul className="csub-sidebar-list">
            {SIDEBAR_LINKS.map((link, i) => (
              <li key={i} className="csub-sidebar-item">
                <h3>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="csub-sidebar-link">
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href} className={`csub-sidebar-link${link.href === `/contact/${section}` ? ' active' : ''}`}>
                      {link.label}
                    </Link>
                  )}
                </h3>
              </li>
            ))}
          </ul>
        </aside>

      </div>
    </div>
  )
}

export default ContactSubpage
