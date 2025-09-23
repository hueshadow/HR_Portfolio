import { useState } from 'react'

interface ContactPageProps {
  active: boolean
  loaded: boolean
  onPageChange: (pageId: string) => void
}

const ContactPage = ({ active, loaded, onPageChange }: ContactPageProps) => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    subject: '',
    content: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 表单提交逻辑
    console.log('Form submitted:', formData)
  }

  return (
    <>
        <div className="page-header c12">
          <h1 data-value="Get It Touch">Get It Touch</h1>
          <hr className={loaded ? 'enabled' : ''} />
        </div>

        <div className="row">
          <div className="c6">
            <h2>Message Me</h2>
            <p>
              A design girl who loves dancing and sports and lives in Suzhou. She hopes to meet creators from all over the world and communicate with each other.
            </p>
          </div>
          
          <div className="c6">
            <h2>My Details</h2>
            <ul className="contact-details">
              <li>
                <div className="icon-holder">
                  <i className="fas fa-envelope"></i>
                </div>
                <span>hueshadow989@gmail.com</span>
              </li>
              <li>
                <div className="icon-holder">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <span>Eton Town, Suzhou, China</span>
              </li>
              <li>
                <div className="icon-holder">
                  <i className="fas fa-clock"></i>
                </div>
                <span>Mon - Fri 9AM to 5PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="c6"></div>
          
          <div className="c6">
            <form id="frmContact" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Your Name"
                  value={formData.userName}
                  onChange={handleInputChange}
                  required
                />
                <span id="userName-info" className="info"></span>
              </div>
              
              <div>
                <input
                  type="email"
                  name="userEmail"
                  id="userEmail"
                  placeholder="Your Email"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  required
                />
                <span id="userEmail-info" className="info"></span>
              </div>
              
              <div>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
                <span id="subject-info" className="info"></span>
              </div>
              
              <div>
                <textarea
                  name="content"
                  id="content"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                ></textarea>
                <span id="content-info" className="info"></span>
              </div>
              
              <div>
                <button type="submit" id="send">
                  Send Message <i className="fas fa-paper-plane"></i>
                </button>
              </div>
              
              <div id="mail-status"></div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="c12">
            <div id="map"></div>
          </div>
        </div>

        <footer>
          <div className="footer-inner clearfix">
            <div className="copyright">© 2025 Content update by Ronn Huang. All Rights Reserved.</div>
          </div>
        </footer>
    </>
  )
}

export default ContactPage
