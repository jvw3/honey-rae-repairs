
import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"

export const ApplicationViews = () => {
	
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.staff) {
        return <EmployeeViews />
    } else {
        return <CustomerViews />
    }
}

// When the route is tickets, its should display the TicketList.js
// When the route is ticket/create, it should display the Ticketform.js
// We have a button in ticketList.js that will navigate to Ticketform.js
    // When we click on the button, we will be navigated to teh ticket/create route which will take us to the TicketForm. 
