import './Contact.css'

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>CONTACT</h1>
      </div>

      <div className="contact-content">
        <div className="contact-section">
          <h2>General Inquiries</h2>
          <p>
            For general inquiries about David Hockney's work, please contact:
          </p>
          <div className="contact-info">
            <p>Email: info@hockney.com</p>
          </div>
        </div>

        <div className="contact-section">
          <h2>Press & Media</h2>
          <p>
            For press and media inquiries:
          </p>
          <div className="contact-info">
            <p>Email: press@hockney.com</p>
          </div>
        </div>

        <div className="contact-section">
          <h2>Gallery Representation</h2>
          <p>
            For information about gallery representation and exhibitions, please visit
            the Resources section.
          </p>
        </div>

        <div className="contact-note">
          <p>
            <strong>Note:</strong> This is a demo website. The contact information above 
            is for illustrative purposes only. For actual inquiries, please visit the 
            official David Hockney website.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact
