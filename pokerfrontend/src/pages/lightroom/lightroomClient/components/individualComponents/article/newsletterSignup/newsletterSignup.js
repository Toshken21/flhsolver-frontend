import React, { useState } from 'react';
import NewsletterCSS from "./newsletterSignup.module.css";

function NewsletterSignup() {
    const [email, setEmail] = useState('');
    
    const [isValid, setIsValid] = useState(true);
    const [signupMessage, setSignupMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email && !/\S+@\S+\.\S+/.test(email)) {
            setIsValid(false);
            alert("Please enter a valid email address.");
        } else {
            setIsValid(true);

        }

        if(isValid){
            const response = await fetch("https://api.flhsolver.com/newsletter/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            });
            console.log(response.body);
            event.target.value = "";
            setSignupMessage("Thank you for signing up!");
        }
    }



    const handleFocus = (event) => {
        if(event.target.value === "Your email."){
            event.target.value = "";
        }
    };

    const handleChange = e => {
        setEmail(e.target.value);
    };

    return (
        <div className={NewsletterCSS["newsletter-holder"]}>
            <h4 className={NewsletterCSS["newsletter-h4"]}>Don't fold!</h4>
            <p className={NewsletterCSS["newsletter-p"]}>Sign up to our free newsletter to get the latest SevenTwo content.</p>
            <form onSubmit={handleSubmit} className={NewsletterCSS["newsletter-form"]}>
                <input
                    type="text"
                    onFocus={handleFocus}
                    
                    onChange={handleChange}
                    defaultValue="Your email."
                    className={NewsletterCSS["newsletter-input"]}
                />
                <input type="submit" className={NewsletterCSS["newsletter-submit"]} value="submit"/>
            </form>
            <p className={NewsletterCSS["newsletter-p"]}></p>
            
        </div>
    );
}

export default NewsletterSignup;
