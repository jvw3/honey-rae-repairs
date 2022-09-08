import { useEffect, useState } from "react"
import { Customer } from "./Customer"

export const CustomerList = () => {

        const [customers, setCustomers] = useState([])

        useEffect(
            () => {
                fetch(`http://localhost:8088/users?isStaff=false`)
                .then(res => res.json())
                .then(
                    (customerArray) => {
                        setCustomers(customerArray)
                })
            },
            []
            )


            return <article>
            {
                customers.map(customer => <Customer key={ `customer--${customer.id}`}
                    id={customer.id}
                    fullName={customer.fullName} 
                    email={customer.email} />)
            }
            </article>
}
// We're mapping through all customers, and for each customer we are taking the value from customer and passing it as a prop to the customer component. 