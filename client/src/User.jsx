import {useEffect, useState} from 'react'
import axios from "axios"
import {Link} from 'react-router-dom'
function User() {
    const [users,setUsers] = useState([])

    useEffect(() => {
        axios.get('https://crud-demo-daybatch.onrender.com/')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    },[])

    const handleDelete =((id) =>{
        axios.delete('https://crud-demo-daybatch.onrender.com/deleteUser/'+id)
        .then(res => {console.log(res)
            window.location.reload()})
        .catch(err => console.log(err))
    })
  return (
    <>
        <h1> Demo Crud App For Deployment </h1>
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-75 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">Add + </Link>
            <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
            </thead>
            
            <tbody>
            {
                users.map((user)=>{
                    return <tr key={Math.random()}>
                    <td> {user.name}</td>
                        <td> {user.email}</td>
                        <td> {user.age}</td>
                        <td> <button>  <Link to={`/update/${user._id}`} className="btn btn-warning">Edit </Link></button>
                            <button className='btn btn-danger' 
                            onClick={(e) => handleDelete(user._id)}>Delete</button>
                        </td>
                    </tr>

                })
            }
            
            </tbody>
            </table>
  
    </div>
    </div>
    </>
  )
}

export default User
