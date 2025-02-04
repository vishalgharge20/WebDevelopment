import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';  // Make sure to import Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap styles
import './CreateUSer.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateUser = () => {
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false);
  
  // States to hold form data
  const [user, setUser] = useState({Name: '',email: '',Age: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setuser for every input field(input changes)
    setUser({...user,[name]: value
    });
  };

  const handleSubmit = async(event) => {
    const form = event.currentTarget;
    event.preventDefault(); // Prevent default form submission behavior
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    else {
      // If the form is valid, send a POST request
      try {
        // Send a POST request to the server using Axios
        const response = await axios.post('http://localhost:3000/createUser', user);
  
        // Check if the response is successful
        if (response.status === 201) {
          alert('User created successfully: ' + JSON.stringify(response.data));
          setUser({ Name: '', email: '', Age: '' }); // Reset the form fields
          navigate('/')
        }
      } catch (error) {
        console.error('Error creating user:', error);
        alert('An error occurred while creating the user.');
      }
    }

    setValidated(true);
  };

  return (
    <div className="create-user-container">
      <h2>Create New User</h2>

      <Form noValidate validated={validated} onSubmit={handleSubmit} className="form-container">
        
        {/* Name Field */}
        <Form.Group controlId="formName" className='input-fields'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="Name"
            value={user.Name}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid name.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email Field */}
        <Form.Group controlId="formEmail" className='input-fields'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Age Field */}
        <Form.Group controlId="formAge" className='input-fields'>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your age"
            name="Age"
            value={user.Age}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid age.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Create User
        </Button>
      </Form>
    </div>
  );
};

export default CreateUser;