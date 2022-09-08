// This component should only be displayed when the route matches employees/employeeIdNumber
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"



export const CustomerDetails = ({}) => {
    // React router dom takes anything that is inside of the url and puts it inside of an object, much like props from parent to child component. 
    // employeeId is the state we are getting from the Route.
    // We want to observe when that state changes so we will need a UseEffect.
    const {customerId} = useParams()
    // We can deconstruct employeeId variable that we defined in the route itself, and set it equal to useParams()
    const [customer, updateCustomer] = useState()



    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
            .then((res) => res.json())
            .then((customer) => {
                    const singleCustomer = customer[0]
                    updateCustomer(singleCustomer)
            })
        }, [customerId]
    )
    // Need to see information from users table, information from employees table, and see all tickets currently assigned to this employee. 
    // By using _expand query string, we can get access to users through employees, and by using _embed=employeeTickets, we can get the tickets that are assigned to that employee.
    // Then we need to filter down the list of all employees to show only those where the userId matches what is in the url. &userId={id}
    
    //we get employeeId from state array, that we get from the route parameters.
    // This/JSON will return an array.

    return <section className="employee" >
                        <header>{customer?.user?.fullName}</header>
                        <div>Email: {customer?.user?.email}</div>
                        <div>Address: {customer?.address}</div>
                        <div>Phone Number: {customer?.phoneNumber}</div>
                    </section>
}
// Here we are capturing the employeeId that is in the route.
// We are going to extract that in employee Details.
// The hook to do this is called UseParams.
// We will deconstruct it.

// We will deconsruct employeeId variable that I defined in the route itself, and set it equal to useParams()
// It pulls in the object that it created from route parameters, and you extract any variable that you defined there.
// I want to display all of the details about an employee, so I need a state variable.


// When property of property is reading as undefined.
// React doesn't like accessing properties of properties by just using a period(.)
// ?. means only go down this path if the properties exist.