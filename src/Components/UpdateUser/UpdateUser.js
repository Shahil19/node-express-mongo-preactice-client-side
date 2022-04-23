import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const params = useParams();
    const id = params.id;
    const [user, setUser] = useState({});

    // get which user need to update
    useEffect(() => {
        const url = `http://localhost:5000/user/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
    }, [])

    const handleUpdateUser = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const name = event.target.name.value;
        const updatedUser = { name, email };
        // console.log(updatedUser);

        //! update user
        // PUT method: works like > if user exist then update and if does not(user does not exist) then POSTs(create)
        const url = `http://localhost:5000/user/${id}`
        fetch(`http://localhost:5000/user/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                event.target.reset()
            })

    }
    return (
        <div>
            <h3>Update {user.name}</h3>
            <div style={{ border: '1px solid grey', marginBottom: '25px' }}>
                <p style={{ margin: '5px 0' }}>Name: <small>{user.name}</small></p>
                <p style={{ margin: '5px 0' }}>Email: <small>{user.email}</small></p>
            </div>
            <form onSubmit={handleUpdateUser}>
                <input type="text" name='name' placeholder='Name' required />
                <input type="Email" name='email' placeholder='Email' required />
                <br />
                <input type="submit" value="Update User" />
            </form>
        </div>
    );
};

export default UpdateUser;