import { useEffect, useState } from "react"
import { Employee } from "./employee"

export const EmployeeList = () => {

        const [employees, setEmployees] = useState([])

        useEffect(
            () => {
                fetch(`http://localhost:8088/users?isStaff=true`)
                .then(res => res.json())
                .then(
                    (employeeArray) => {
                        setEmployees(employeeArray)
                })
            },
            []
            )


            return <article>
            {
                employees.map(employee => <Employee key={ `employee--${employee.id}`}
                    id={employee.id}
                    fullName={employee.fullName} 
                    email={employee.email} />)
            }
            </article>
}


// Props are useful when you have an iterator, and you want to render the individual details. just to plan for future growth or eliminate complexity.
// There could be many reasons why you would want the information for just displaying an employee.