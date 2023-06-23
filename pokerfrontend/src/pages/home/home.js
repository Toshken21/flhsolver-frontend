    import react, {useState, useEffect} from "react";
    import ReactGA from "react-ga";
    //import HomeCSS from "./Home.module.css";
    import HomeCSS from "./Home.module.css";

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

        

        // This section of code is responsible for animations when scrolling

        

        
        

        // This useEffect hook is responsible for animations of the li elements in the overview section

        useEffect(() => {
            const listItems = document.querySelectorAll(`.${HomeCSS["text-holder-overview-li"]}`);
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if(entry.isIntersecting) {
                        console.log("Entry overview-ul")
                        entry.target.classList.add(HomeCSS["animate-move-down"]);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5,
            });

            listItems.forEach((item) => {
                observer.observe(item);
            });

            return () => {
                listItems.forEach((item) => {
                    observer.unobserve(item)
                });
            };
        }, [] );


        // This useEffect hook is responsible for the animations of the odd subscription boxes

        useEffect(() => {
            const listItems = document.querySelectorAll(`div.${HomeCSS["odd-box"]}`);
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if(entry.isIntersecting) {
                        console.log("Entry is intersecting odd-box")
                        entry.target.classList.add(HomeCSS["animate-move-up-box"]);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.3,
            });

            listItems.forEach((item) => {
                observer.observe(item);
            });

            return () => {
                listItems.forEach((item) => {
                    observer.unobserve(item)
                });
            };
        }, [] );


         // This useEffect hook is responsible for animating the even subscription boxes

        useEffect(() => {
            const listItems = document.querySelectorAll(`div.${HomeCSS["even-box"]}`);
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if(entry.isIntersecting) {
                        console.log("Entry is intersecting even-box")
                        entry.target.classList.add(HomeCSS["animate-move-down-box"]);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.3,
            });

            listItems.forEach((item) => {
                observer.observe(item);
            });

            return () => {
                listItems.forEach((item) => {
                    observer.unobserve(item)
                });
            };
        }, [] );


        // This useEffect hook is for animating the affiliate-holder divs

        useEffect(() => {
            const listItems = document.querySelectorAll(`div.${HomeCSS["affiliate-holder"]}`);
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if(entry.isIntersecting) {
                        console.log("Entry is intersecting affiliate")
                        entry.target.classList.add(HomeCSS["animate-move-down-affiliate"]);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.3,
            });

            listItems.forEach((item) => {
                observer.observe(item);
            });

            return () => {
                listItems.forEach((item) => {
                    observer.unobserve(item)
                });
            };
        }, [] );       


       // This useEffect hook is used to animate odd-input

       useEffect(() => {
        const listItems = document.querySelectorAll(`input.${HomeCSS["odd-input"]}`);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    entry.target.classList.add(`${HomeCSS["animate-move-left-input"]}`);
                    console.log("Entry is intersecting odd-input ")
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
        });

        listItems.forEach((item) => {
            observer.observe(item);
        });

        return () => {
            listItems.forEach((item) => {
                observer.unobserve(item)
            });
        };
    }, [] );
    
    // This useEffect is used to animate even-input

       useEffect(() => {
        const listItems = document.querySelectorAll(`input.${HomeCSS["even-input"]}`);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    console.log("entry is intersecting even-input");
                    entry.target.classList.add(`${HomeCSS["animate-move-right-input"]}`);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
        });

        listItems.forEach((item) => {
            observer.observe(item);
        });

        return () => {
            listItems.forEach((item) => {
                observer.unobserve(item)
            });
        };
    }, [] );


    // This functions handles the data submitted in the beat signup form and sends a fetch call to the mongo database

    const handleSubmit = async(event) => {
        event.preventDefault();



        const isValidEmail = (email) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };
        // Checks if the age of the user is 18 or over
        if (parseInt(age) < 18) {
            alert("You must be over 18 to sign up.");
            return;
        }

        if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const response = await fetch('http://localhost:4000/beta/accounts/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, age, email}),
            
        });
        console.log(response.body);

        const result = await response.json();
        console.log(result);
        ReactGA.event({
            category: 'User',
            action: 'Created an Account'
          });
    }


        return (
            <div>


                <section className={HomeCSS["title-container"]}>
                    <nav className={HomeCSS["nav"]}>
                        <ul className={HomeCSS["nav-ul"]}>
                            <li>
                                <a href="#overview" className={HomeCSS["nav-link"]}>Overview</a>
                            </li>

                            <li>
                                <a href="#our-pricing" className={HomeCSS["nav-link"]}>Pricing</a>
                            </li>
                            <li>
                                <a href="#affiliate-program" className={HomeCSS["nav-link"]}>Affiliate</a>
                            </li>

                            <li>
                                <a href="#beta-signup-section" id="beta-signup-nav" className={HomeCSS["nav-link"]}>JOIN BETA</a>
                            </li>
                        </ul>
                    </nav>
                    
                    <h2 className={HomeCSS["title-h2"]}>Light up your game with</h2>
                    <h1 className={HomeCSS["title-h1"]}>FULL <span className={HomeCSS["title-h1-span"]}>LIGHT</span> HOUSE</h1>
                    <h3 className={HomeCSS["title-h3"]}>One Solver, One subscription</h3>
                    <h4 className={HomeCSS["title-h4"]}>Diving into poker software left us in murky waters. So we built our own.</h4>
                    <a className={HomeCSS["title-join-beta"]}>JOIN BETA</a>
                </section>
                <section className={HomeCSS.overview} id="overview">
                    <h2 className={HomeCSS["overview-h2"]}>Our main features</h2>
                    <div className="overview-content-holder">
                        <img src={require("./homeImages/pair-of-aces.png")} alt="pair-of-aces" id="pair-of-aces" width={500} height={500}/>
                        <div className={HomeCSS["text-holder-overview"]}>
                            
                            <ul className={HomeCSS["text-holder-overview-ul"]}>
                                <li className={HomeCSS["text-holder-overview-li"]}>A powerful solver giving you the possibility to calculate your equity in different positions and stack sizes...</li>
                                <li className={HomeCSS["text-holder-overview-li"]}>...That is easy to use, with GUI hover tooltips and extensive tutorials...</li>
                                <li className={HomeCSS["text-holder-overview-li"]}>...With a sleek modern design, not overloading you with excessive menus and unnecessary data.</li>
                            </ul>
                        </div>
                    </div>
                    
                    

                </section>

                <section className={HomeCSS["our-pricing"]} id={HomeCSS["our-pricing"]}>
                    <h2>Plans and pricing</h2>
                    <h3>All of our subscriptions include the Full LightHouse equity solver and any tools or content developed in the future. Cancellable any time. Taxes included.</h3>
                    <div className={HomeCSS["subscription-box-holder"]}>
                        <div className={`${HomeCSS["subscription-box"]} ${HomeCSS["odd-box"]}`}>
                            <div className={HomeCSS["top-box-banner"]} id={HomeCSS["one-week-banner"]}>
                                <p className={HomeCSS["top-banner-text"]}>Great to try out</p>
                            </div>
                            
                            <h4>14.99$</h4>
                            <p className={HomeCSS["subscription-box-p"]}>1 week subscription</p>
                            
                        </div>
                        <div className={`${HomeCSS["subscription-box"]} ${HomeCSS["even-box"]}`}>
                            <div className={HomeCSS["top-box-banner"]} id={HomeCSS["one-month-banner"]}>
                                <p className={HomeCSS["top-banner-text"]}>Standard subscription</p>
                            </div>
                            
                            <h4>49.99$</h4>
                            <p className={HomeCSS["subscription-box-p"]}>1 month subscription</p>
                            
                        </div>
                        <div className={`${HomeCSS["subscription-box"]} ${HomeCSS["odd-box"]}`}>
                            <div className={HomeCSS["top-box-banner"]} id={HomeCSS["three-months-banner"]}>
                                <p className={HomeCSS["top-banner-text"]}>Save 13%</p>
                            </div>
                            <h4>129.99$</h4>
                            <p className={HomeCSS["subscription-box-p"]}>3 months subscription</p>
                            
                        </div>
                        <div className={`${HomeCSS["subscription-box"]} ${HomeCSS["even-box"]}`}>
                            <div className={HomeCSS["top-box-banner"]} id={HomeCSS["six-months-banner"]}>
                                <p className={HomeCSS["top-banner-text"]}>Save 33%</p>
                            </div>
                            <h4>199.99$</h4>
                            <p className={HomeCSS["subscription-box-p"]}>6 months subscription</p>
                            
                        </div>
                        <div className={`${HomeCSS["subscription-box"]} ${HomeCSS["odd-box"]}`}>
                            <div className={HomeCSS["top-box-banner"]} id={HomeCSS["one-year-banner"]}>
                                <p className={HomeCSS["top-banner-text"]}>Save 42%</p>
                            </div>
                            <h4>349.99$</h4>

                            <p className={HomeCSS["subscription-box-p"]}>1 year subscription</p>
                            
                        </div>
                    </div>
                </section>

                <section className={HomeCSS["affiliate-program"]} id="affiliate-program">
                    
                    <h2>Join our great affiliate program</h2>
                    
                    
                        <div className={`${HomeCSS["thirty-percent-holder"]} ${HomeCSS["affiliate-holder"]}`} id="thirty-percent-id">
                            <h3>30<span>%</span></h3>
                            <p>Commission on <span id={HomeCSS["upfront-sale-span"]}>upfront sale</span> after a 25% VAT deduction.</p>
                        </div>
                        
                        <div className={`${HomeCSS["ten-percent-holder"]} ${HomeCSS["affiliate-holder"]}`} id="ten-percent-id">
                            <h3>10<span>%</span></h3>
                            <p>Commission on <span id={HomeCSS["recurring-sales-span"]}>recurring sales</span> after  a 25% VAT deduction.</p>
                        </div>
                    
                    

                        

                    

                </section>
                <section className={HomeCSS["beta-signup-section"]} id={HomeCSS["beta-signup-section"]}>
                    
                    
                    <h2 id={HomeCSS["first-signup-h2"]}>Join the <span>free</span> beta</h2>
                    
                    <div className={HomeCSS["signup-vertical-line"]}></div>
                    <form onSubmit={handleSubmit}>
                        <input name="name" type="text" id={HomeCSS["name-input"]} className={`${HomeCSS["odd-input"]}`} defaultValue="Name" onFocus={clearText} onChange={handleName}/>
                        <input name="age" type="text" id={HomeCSS["age-input"]} className={`${HomeCSS["even-input"]}`} defaultValue="Age" onFocus={clearText} onChange={handleAge}/>
                        <input name="email" type="text" id={HomeCSS["email-input"]} className={`${HomeCSS["odd-input"]}`} defaultValue="Email" onFocus={clearText} onChange={handleEmail} />
                        <input name="submit" type="submit" id={HomeCSS["signup-button"]} className={`${HomeCSS["home-submit-button"]}`} value="Sign up for beta"/>
                    </form>
                </section>
                    
                





                
            </div>
            
        )


    }
    

        
    


    export default HomePage;