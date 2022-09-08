// This component should only be displayed when the route matches employees/employeeIdNumber
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"



export const EmployeeDetails = ({}) => {

    const {employeeId} = useParams()
    const [employee, updateEmployee] = useState()



    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
            .then((res) => res.json())
            .then((employee) => {
                    const singleEmployee = employee[0]
                    updateEmployee(singleEmployee)
            })
        }, [employeeId]
    )
    // Need to see information from users table, information from employees table, and see all tickets currently assigned to this employee. 
    // By using _expand query string, we can get access to users through employees, and by using _embed=employeeTickets, we can get the tickets that are assigned to that employee.
    // Then we need to filter down the list of all employees to show only those where the userId matches what is in the url. &userId={id}
    
    //we get employeeId from state array, that we get from the route parameters.
    // This/JSON will return an array.

    return <section className="employee" >
                        <header>{employee?.user?.fullName}</header>
                        <div>Email: {employee?.user?.email}</div>
                        <div>Specialty: {employee?.specialty}</div>
                        <div>Rate: {employee?.rate}</div>
                        <footer>Currently working on {employee?.employeeTickets?.length} tickets</footer>
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