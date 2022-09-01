

// This component (the parent component) will maintain state.
import { useState } from "react"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"

// The child components (ticketSearch and Tickets) will access state via props.
export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    // The ticketContainer parent component will return two childe components. 
    return <>
        <TicketSearch setterFunction={setSearchTerms}/>
        <TicketList searchTermState={searchTerms}/>
    
    </>
}

// search terms are being entered into ticketSearch but parent contains the state of searchTerms and the function to change searchTerms itself. 
// So the search component needs the setter function. 
// We can set an onchange event to invoke that function as the user types in.
// We need to pass a reference to that function from the parent container, down to TicketSearch.
// TicketSearch needs a setter function that is equal to setSearchTerms.
// TicketList needs to know what the searchTerms are, so it can do the filtering for tickets that match the searchTerms.
// TicketSearch needs the function, and TicketList needs the state.

// To get access to setSearchTerms in ticket search, we need to access the key of setter function, which is on an object. Wer'er not passing the function itself, React takes any prop specified and puts it into an object. Object has a key of setter function and a value of setSearchTerms.
// setter function is the key, so that is what is passed in the child component, if were using object deconstruction.



//Props = passing a value down to a parent component.


//SO, entering into the input field of the child, TicketSearch, modified the state variable of ticket Container, the parent, by directly invoking the function that got passed to the child as a reference.

//In ticket list, we can deconstruct the searchTermState prop. 
// The keys (searchTermState) value is the actual state from the parent.
//We can observe searchTermState because we inherited it from parent. So we can use a useEffect.