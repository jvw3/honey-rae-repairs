import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./tickets.css"

//The React library provides you with a function named useState() to store the state in a component. The function returns an array. The array contains the intial state value at index 0 and a function that modifies the state at index 1.
// You deconstruct those values into two variables.
// After this line of code runs, you have two variables with the following values.
// tickets has a value of an empty array.
// setTickets has a value of a function.
// This is the initial change of state in a component.
export const TicketList = ({searchTermState}) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    //By default we're gonna show all tickets (not just emergency), so its set to false. 
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()


// get honey_user from local storage
    const localHoneyUser = localStorage.getItem("honey_user")
// honey user is currently a string, so we need to convert it to an object, so we can use it in our code. honeyUserObject will be an object.
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())})
            setFiltered(searchedTickets)
        },
        [ searchTermState]
    )

    // React provides you with another function named useEffect() to observe state. It allows you to observe state and run some instructions when state changes.
    useEffect(
        () => {
            // We don't need a return call in front of the fetch.
            // Fetching data from the API. 
            fetch(`http://localhost:8088/serviceTickets`)
            // parsing data from JSON to JS
            .then(res => res.json())
            // inside ticketArray, we are storing data from the API.
            .then((ticketArray) => {
                // We're using the setter Function to update from tickets (initialState) to the ticket data that we get from the API. 
                setTickets(ticketArray)
            })
        },
        [] // When this array is empty, you are observing initial component state. Our goal is to fill this array with data from our API. 
    )

    // This useEffect is used to observe state for emergencies. Default for emergency state variable is false, I want to run code when emergency state changes. SOOO we will need another use effect. 
    // If emergency is true, we are going to filter throught the tickets and find the one that are an eemergency. 
    // We are currently displaying filteredTickets so that is the state variable that I need to update.
    useEffect(
        ()=> {
            if (emergency) {
                // we're gonna filter throught all tickets, and if ticket 
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            } else {
                setFiltered(tickets)
            }
        }, [emergency] // This is telling us which state we want to observe.
    )

    // This useEffect is used to observe state for tickets. I want to run code when ticket State changes. 
    // When ticket state changes, if user is a staff member, we're going to set the filteredTickets variable to all tickets.
    // otherwise, we're going to filter through tickets and find tickets for the user (customer). If the ticket.userId matches the honeyUserObject.id, then that ticket will be displayed.
    // Then the filtered tickets will be stored in myTickets. and the state variable of "filteredTickets" will be sent to myTickets.
    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setFiltered(tickets)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }

        },
        [tickets] // This is telling us whch state we want to observe.
    )

// This useEffect will used to observe state for the openOnly state variable. 
// The logic inside the UseEffect hook will run when the state of openOnly changes.
// if openOnly is true, we're going to filter through tickets and find tickets where user.Id and honeyUserObject.id match AND the ticket has not been completed. then we will set the filteredTicket state to these tickets. 
// If openOnly is false, the we will display myTickets just like we did for the useEffect above.
    useEffect(
        () => {
            if (openOnly) {
            const openTicketArray = tickets.filter(ticket => {
                return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
            })
            setFiltered(openTicketArray)
        } else {
            const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
        }
        },
        [ openOnly]
    )

    // This is JSX. Its how we create elements in React.
    // The opening and closing brackets are used to create fragments.
    //For the button, when we click on the button, we are going to set the emergency state variable to true.
    // for ternary statement, we are saying that if honeyUserObject.staff === true, then we will render the emergency button with the onClick property. if its false aka if user is not a staff member, then nothing will be rendered.
    return <>
    
{  honeyUserObject.staff
    ?  <>
    <button onClick={ () => {setEmergency(true)}}>Emergency Only</button>
    <button onClick={ () => {setEmergency(false)}}>Show All</button>
    </> 
    // as soon as user clicks on this they will be routed to a new route in the browser.
    : <>
    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
    <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
    <button onClick={() => updateOpenOnly(false)}>All Tickets</button>

    </>
}


    <h2>List of Tickets</h2>

    <article className="tickets">
        {
            // HAVE TO ADD THE STATE VARIABLE OF THE NEW TICKETS.
            filteredTickets.map(ticket => {
                return <section className="ticket">
                        <header>${ticket.description}</header>
                        <footer>Emergency: {ticket.emergency ? "yes" : "no"}</footer>
                </section>
            })
        }
    </article>
    </>
}

