import { useNavigate } from "react-router-dom"

const Contact = () => {

  const navigate = useNavigate()

  return (
    <div>
        <h1>Contact Page</h1>
        <div className="contact-buttons">
          <button onClick={()=>navigate('Info')}>Contact Info</button>
          <button onClick={()=>navigate('Form')}>Contact Form</button>
        </div>
    </div>
  )
}

export default Contact