    import react, {useState} from "react";
    import "./home.css";

    const  clearText = (event) => {
        if(event.target.value === "Name" || event.target.value === "Age" || event.target.value === "Email"){
            event.target.value = '';
            }
    }

    

    function HomePage() {
        // This component is a static homepage component


        //State of Homepage

        const [name, setName] = useState("Name");
        const [age, setAge] = useState("Age");
        const [email, setEmail] = useState("Email");

        //state controllers
        const handleName = (event) => {
            setName(event.target.value);
        }
        const handleAge = (event) => {
            setAge(event.target.value);
        }
        const handleEmail = (event) => {
            setEmail(event.target.value);
        }

        


        return (
            <div>


                <section className="title-container title-container-height title-container-bg title-container-width">
                    <nav>
                        <ul className="nav-links">
                            <li>
                                <a href="#overview" className="nav-link">Overview</a>
                            </li>

                            <li>
                                <a href="#our-pricing" className="nav-link">Pricing</a>
                            </li>
                            <li>
                                <a href="#affiliate-program" className="nav-link">Affiliate</a>
                            </li>
                            <li>
                                <a href="#lightroom" className="nav-link">Lightroom</a>
                            </li>
                            <li>
                                <a href="#beta-signup-section" id="beta-signup-nav" className="nav-link">Sign up for beta-testing</a>
                            </li>
                        </ul>
                    </nav>
                    
                    <h1 className="title-lightup">Light up your <span id="title-span">Game</span> with <span id="title-span">Full-Lighthouse</span></h1>
                    
                    <br/>
                    <h2 className="title-sentence" id="first-title-sentence">We experienced that using poker solving software felt like navigating murky waters.</h2>
                    <h2 className="title-sentence" id="second-title-sentence">So we decided to make our own.</h2>
                    <br/>
                </section>
                <section className="overview" id="overview">
                <h2 className="overview-introduction-h2">Introducing Full LightHouse, a poker equity solver designed for new and experienced players alike</h2>
                    <img src={require("./homeImages/pair-of-aces.png")} alt="pair-of-aces" id="pair-of-aces"/>
                    <div className="text-holder-overview">
                        
                        <ul>
                            <li>A powerful solver giving you the possibility to calculate your equity in different positions and stack sizes...</li>
                            <li>...That is easy to use, with GUI hover tooltips and extensive tutorials...</li>
                            <li>...With a sleek modern design, not overloading you with excessive menus and unnecessary data.</li>
                        </ul>
                    </div>
                    
                    

                </section>

                <section className="our-pricing" id="our-pricing">
                    <h2>Plans and pricing</h2>
                    <h3>All of our subscriptions include the Full LightHouse equity solver and any tools or content developed in the future. Cancellable any time.</h3>
                    <div className="subscription-box-holder">
                        <div className="subscription-box">
                            
                            <h4>14.99$</h4>
                            <p>1 week subscription</p>
                            
                        </div>
                        <div className="subscription-box">
                            
                            <h4>49.99$</h4>
                            <p>1 month subscription</p>
                            
                        </div>
                        <div className="subscription-box">
                            <h4>109.99$</h4>
                            <p>3 months subscription</p>
                            
                        </div>
                        <div className="subscription-box">
                            <h4>199.99$</h4>
                            <p>6 months subscription</p>
                            
                        </div>
                        <div className="subscription-box">
                            <div className="most-value">
                                <p id="most-value-text">Most value</p>
                            </div>
                            <h4>349.99$</h4>

                            <p>1 year subscription</p>
                            
                        </div>
                    </div>
                </section>

                <section className="affiliate-program" id="affiliate-program">
                    
                    <h2>Join our great affiliate program</h2>
                    
                    
                    <div className="thirty-percent-holder">
                        <h3>30<span>%</span></h3>
                        <p>Commission on <span id="upfront-sale-span">upfront sale</span> after a 25% VAT deduction.</p>
                    </div>
                    <div className="ten-percent-holder">
                        <h3>10<span>%</span></h3>
                        <p>Commission on <span id="recurring-sales-span">recurring sales</span> after  a 25% VAT deduction.</p>
                    </div>
                    
                    <h4 className="example-h4">Example: As an affiliate you have managed to successfully generate 100 sales of monthly subscriptions</h4>
                    <div className="commission-sale-div">
                        <h3>1.124<span id="commission-sale-span">$</span></h3>
                        <p>Earned on sale</p>
                    </div>
                    <div className="commission-recurring-div">
                        <h3>374<span id="commission-recurring-span">$</span></h3>
                        <p>Earned every month</p>
                    </div>
                        
                    <p className="example-p" id="example-p-1">Commission on Sale = Sales x Price x 0.3 x 0.75 = 100 x 49.99 x 0.3 x 0.75 = 1124.78$  </p>
                    <p className="example-p" id="example-p-2">Recurring Comission = Sales x Price x 0.1 x 0.75 = 100 x 49.99 x 0.3 x 0.75 = 374.93$ </p>
                    

                </section>
                <section className="beta-signup-section">
                    
                    
                    <h2 id="first-signup-h2">Sign up for</h2>
                    <h2 id="second-signup-h2">the <span>free</span> beta</h2>
                    <div className="signup-vertical-line"></div>
                    <form>
                        <input name="name" type="text" id="name-input" defaultValue="Name" onFocus={clearText} onChange={handleName}/>
                        <input name="age" type="text" id="age-input" defaultValue="Age" onFocus={clearText} onChange={handleAge}/>
                        <input name="email" type="text" id="email-input" defaultValue="Email" onFocus={clearText} onChange={handleEmail} />
                        <input name="submit" type="submit" id="signup-button" value="Sign up for beta"/>
                    </form>
                </section>
                    
                





                
            </div>
            
        )


    }
    

        
    


    export default HomePage;