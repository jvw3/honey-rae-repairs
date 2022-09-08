import { Outlet, Route, Routes } from "react-router-dom"
import { TicketContainer } from "../tickets/TicketContainer"
import { EmployeeList } from "../employees/employees"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { CustomerList } from "../customers/Customers"
import { CustomerDetails } from "../customers/CustomerDetails"
import { Profile } from "../profile/Profile"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>
                
                <Route path="tickets" element={ <TicketContainer /> } />

                <Route path="customers" element={ <CustomerList /> } />

                <Route path="profile" element={ <Profile />} />

                <Route path="customers/:customerId" element={ <CustomerDetails /> } />

                <Route path="employees" element={ <EmployeeList /> } />
                <Route path="employees/:employeeId" element={ <EmployeeDetails /> } />

            </Route>
        </Routes>
    )
}

// When the route is tickets, its should display the TicketList.js
// When the route is ticket/create, it should display the Ticketform.js
// We have a button in ticketList.js that will navigate to Ticketform.js
    // When we click on the button, we will be navigated to teh ticket/create route which will take us to the TicketForm. 
