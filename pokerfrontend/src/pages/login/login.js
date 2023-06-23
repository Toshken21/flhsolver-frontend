import React, {useState} from "react";

function LoginPage() {

    //states for username and password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    // Functions to handle changes in the input¨

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("api/accounts/add")
            .then((response) => {
                if (response.ok) {
                console.log("Server is accepting requests");
                } else {
                console.log("Server is not accepting requests");
                }
        })
            .catch((error) => {
                console.error("Error connecting to server:", error);
  });

    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">username: </label>
                <input name="username" id="password" type="text" onChange={handleUsername}/>
                <br/>
                <label htmlFor="password">password: </label>
                <input name="password" id="password" type="text" onChange={handlePassword}/>
                <br/>
                <input type="submit" name="submit" value="login"  />

            </form>
        </div>
    )
}

export default LoginPage;