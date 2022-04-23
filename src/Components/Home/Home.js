import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])


    const handleDeleteUser = id => {
        const proceed = window.confirm('are you sure you want to delete?')

        if (proceed) {
            // console.log(id);
            fetch(`http://localhost:5000/user/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        // console.log('deleted');
                    }
                })

            const remainingUsers = users.filter(user => user._id !== id);
            setUsers(remainingUsers)
            console.log(remainingUsers);
        }
    }

    return (
        <div>
            <h1>Welcome to HOME:{users.length}  CRD</h1>
            {
                users.map(user => (
                    <p key={user._id}>
                        <span>name:{user.name} </span>
                        <span>email:{user.email}</span>
                        <Link to={`/user/${user._id}`}><button>Update user</button></Link>
                        <button onClick={() => { handleDeleteUser(user._id) }}>X</button>
                    </p>
                )
                )
            }
        </div>
    );
};

export default Home;