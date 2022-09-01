import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

// useState manages state at component level.
// initial state of email is the string inside of useState. 
export const Login = () => {
    const [email, set] = useState("hpassfield7@netvibes.com")
    const navigate = useNavigate()
// This function handles the login of the user.
// When we click on login button, this is the function that is handling that functionality.
    const handleLogin = (e) => {
        e.preventDefault()
        //We're making a fetch call to the JSON server. It looks at the user collection to find any]one who matches the email input. 
        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                // If it is a valid log in and a valid email, in local storage I am setting the item of honey user.
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("honey_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff
                    }))

                    navigate("/")
                }
                else {
                    // If it's not a valid login/valid email, a window alert will appear that says "invalid login"
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Honey Rae Repairs</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

