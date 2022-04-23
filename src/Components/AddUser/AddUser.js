import { useState } from "react";

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const handleAddUser = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const name = event.target.name.value;
        setName(name);
        setEmail(email)
        const user = { name, email };
        console.log(user);

        // POST method
        fetch('http://localhost:5000/user', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                event.target.reset()
            })
    }
    return (
        <div>
            <h2>Add User</h2>
            <form onSubmit={handleAddUser}>
                <input type="text" name='name' placeholder='Name' required />
                <input type="Email" name='email' placeholder='Email' required />
                <br />
                <input type="submit" value="Add User" />
            </form>
        </div>
    );
};

export default AddUser;