import React from 'react'

const ContactForm = () => {
  return (
    <div>
        <form>
        <input type="text" name="Name" id="Name" placeholder='Name' />
        <input type="text" name="email" id="email" placeholder='email' />
        <br />
        <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default ContactForm