import { Outlet, Route, Routes } from "react-router-dom"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"

import { Profile } from "../profile/Profile"
import { TicketEdit } from "../tickets/TicketEdit"

export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>
                
                <Route path="tickets" element={ <TicketList /> } />

                <Route path="tickets/:ticketId/edit" element={ <TicketEdit /> } />
                
                <Route path="profile" element={ <Profile />} />

                <Route path="ticket/create" element={ <TicketForm /> } />
            
            </Route>
        </Routes>
    )
}

// When the route is tickets, its should display the TicketList.js
// When the route is ticket/create, it should display the Ticketform.js
// We have a button in ticketList.js that will navigate to Ticketform.js
    // When we click on the button, we will be navigated to teh ticket/create route which will take us to the TicketForm. 
