import { useEffect, useState } from "react"

export const CustomerForm = () => {
    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: ""

    })

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
// This useState function stores the component state of feedback at index 0, and the setter function for the feedback state variable at index 1.
    const [feedback, setFeedback] = useState("")

// This useEffect function is observing the state of the feedback state variable. When feedback variable changes, and it feedback is not an empty string, the feedback element will disappear in 3 seconds.
useEffect(() => {
    if (feedback !== "") {
        // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
    }
}, [feedback])


    // TODO: Get employee profile info from API and update state

    useEffect(() => {
        fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
        .then((res) => res.json())
        .then(
            (customerData) => {
                const customerObject = customerData[0]
                updateProfile(customerObject)
            })

    },[]
    )

    // This function will update the profile info for an employee.
    // When the user clicks save profile, a put request will be sent to the API with the new data, that will replace the data specified in the fetch call.
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/customers/${profile.id}`, {method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(profile)
    })
        .then(res => res.json())
        //After Put request has been sent to API, and javascript has been parsed into JSON, the user will receive a feedback string. 
        .then(() => {
    setFeedback("Employee profile successfully saved")
})
        /*
        
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
    }

    return (<>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
    {feedback}
</div>
        <form className="profile">
            <h2 className="profile__title">My Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.phoneNumber = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset> 
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>
    )
}

