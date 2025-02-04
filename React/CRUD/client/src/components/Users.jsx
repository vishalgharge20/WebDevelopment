import { useEffect, useState } from 'react'
import './Users.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Users = () => {

    const [users,setUsers] = useState([{Name:'Vishal',email:'vishal@test.com',Age:'25'
    }])


    // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/'); // Update with your actual API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Failed to load users.');
      }
    };

    fetchUsers();  // Runs only once
  }, []);   // [] ensures no re-runs


  // delete user
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/deleteUser/${id}`);
      if (response.status === 200) {
        alert('User deleted successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting the user.');
    }
  };

  return (
    <div className='full-screen-container'>
        <div className='table-container'>
            <Link to = "/create" className='btn btn-success mb-3'> Add Users </Link>
            <table className='table table-primary'>   {/* Bootstap table */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(({_id,Name,email,Age})=>{
                            return <tr key={_id}>
                                <td>{Name}</td>
                                <td>{email}</td>
                                <td>{Age}</td>
                                <td > 
                                    <div className="d-flex align-items-center justify-content-start">
                                      {/* Edit button */}
                                        <Link to = {`/updateUser/${_id}`} className='btn btn-warning'> Edit </Link>
                                        <button onClick={()=>deleteUser(_id)} className='del-button btn btn-danger'>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>  
    </div>
  )
}

export default Users
