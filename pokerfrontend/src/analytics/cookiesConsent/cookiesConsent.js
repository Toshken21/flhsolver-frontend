import React, { useState } from 'react';
import './cookiesConsent.css';

const CookieConsent = () => {
    const [accepted, setAccepted] = useState(() => {
        return document.cookie.split('; ').includes('cookie_consent=true');
    });

    const acceptCookies = () => {
        document.cookie = 'cookie_consent=true; max-age=31536000; path=/'; // Expires in 1 year
        setAccepted(true);
    };

    if (accepted) {
        return null;
    }

    return (
        <div className="cookie-banner">
            <p>This website uses cookies to enhance the user experience. By using our website, you consent to all cookies in accordance with our Cookie Policy.</p>
            <button className="cookie-banner-button" onClick={acceptCookies}>I understand</button>
        </div>
    );
};

export default CookieConsent;
