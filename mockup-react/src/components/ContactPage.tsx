import { useState } from 'react'

interface ContactPageProps {
  active: boolean
  loaded: boolean
  onPageChange: (pageId: string) => void
}

const ContactPage = ({ loaded }: ContactPageProps) => {
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
          <h1 data-value="联系我">联系我</h1>
          <hr className={loaded ? 'enabled' : ''} />
        </div>

        <div className="row">
          <div className="c6">
            <h2>给我留言</h2>
            <p>
              一个热爱舞蹈和运动的设计女孩，现居苏州。希望能与来自世界各地的创作者相遇，互相交流学习。
            </p>
          </div>

          <div className="c6">
            <h2>联系方式</h2>
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
                <span>中国苏州</span>
              </li>
              <li>
                <div className="icon-holder">
                  <i className="fas fa-clock"></i>
                </div>
                <span>周一至周五 9:00 - 17:00</span>
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
                  placeholder="您的姓名"
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
                  placeholder="您的邮箱"
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
                  placeholder="主题"
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
                  placeholder="您的留言"
                  rows={5}
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                ></textarea>
                <span id="content-info" className="info"></span>
              </div>

              <div>
                <button type="submit" id="send">
                  发送消息 <i className="fas fa-paper-plane"></i>
                </button>
              </div>

              <div id="mail-status"></div>
            </form>
          </div>
        </div>

        {/* <div className="row">
          <div className="c12">
            <div id="map"></div>
          </div>
        </div> */}
    </>
  )
}

export default ContactPage
