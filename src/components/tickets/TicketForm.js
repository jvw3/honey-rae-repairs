import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, update] = useState({
        description: "",
        emergency: false

    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
const navigate = useNavigate()
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const ticketToSendToAPI = {
            userId: honeyUserObject.id,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ""
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/serviceTickets`, {
            method: 'POST',
            // this is how we tell the server it is being passed JSON.
            headers: {
                "Content-Type": "application/json"
            }, 
            // information that we want the API to save.
            body: JSON.stringify(ticketToSendToAPI)
        })
        .then(res => res.json())
        // When above has been completed, the user will be navigated back to ticket list route.
        .then(() => {
            navigate("/tickets")
        })
    }
// as user is interacting with the description field or the textbox, everytime they type something in orthey click something: description and emergency properties will be updated.
// inside the onChange function, we will create a copy of the existing state and then modify the copy. new value of descirption property should be current value of input field. 
//We get that from the change event that is broadcast to the browser. 
// for callback fuction, we will capture the change event, and set description to the evt.target.value.
// For input fields, we can access target value. But for checkboxes, we have to access target.checked.
// now  that we have changed the value of our copy of state, now we need to update state.
// We will use update(copy) to do this.
    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                copy.emergency = evt.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}
// handleSaveButtonClick function wants a parameter of event, so we need to pass clickEvent to that function.