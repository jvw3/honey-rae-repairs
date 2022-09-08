import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

export const TicketEdit = ({}) => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, updateTicket] = useState({
        description: "",
        emergency: false

    })
    const {ticketId} = useParams()
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

const navigate = useNavigate()

// TODO: Get employee profile info from API and update state

// If you use /ticketId, we don't need to find 0 index, because we are targeting the object.
// If we use ?user=, we will need to find the zero index because we are filtering the array, so what we receive will still be an array.

    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
        .then((res) => res.json())
        .then(
            // TicketData will already be an object instead of an array so we don't need to get it at index 0.
            (ticketData) => {
                updateTicket(ticketData)
            })

    },[ticketId]
    )


    const handleUpdateButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, 
        {method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(ticket)
    })
        .then(res => res.json())
        //After Put request has been sent to API, and javascript has been parsed into JSON, the user will receive a feedback string. 
        .then(() => {
                navigate("/tickets")
            })

        /*
        
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
    }




    return (<>
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
                                updateTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        checked={ticket.emergency}
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                copy.emergency = evt.target.checked
                                updateTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleUpdateButtonClick(clickEvent)}
            className="btn btn-primary">
                Update Ticket
            </button>
        </form>
</> )}
// handleSaveButtonClick function wants a parameter of event, so we need to pass clickEvent to that function.

//For your checkbox value to be reflected in state, this has to be format: checked={statevariable}
