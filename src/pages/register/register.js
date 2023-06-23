import React, {useState} from "react";



function RegisterPage() {

    // create states to be managed

    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    // create routes to handle changes in form

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleUsername = (event) => {
        setUserName(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/accounts/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, userName, password}),
            
        });
        console.log(response.body);

        const result = await response.json();
        console.log(result);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">email:</label>
                <input name="email" id="email" type="text" onChange={handleEmail}/>
                <label htmlFor="username">username: </label>
                <input name="username" id="password" type="text" onChange={handleUsername} />
                <br/>
                <label htmlFor="password">password: </label>
                <input name="password" id="password" type="text" onChange={handlePassword}/>
                <br/>
                <input type="submit" name="submit" value="register" />

            </form>
        </div>
    )
}

export default RegisterPage;