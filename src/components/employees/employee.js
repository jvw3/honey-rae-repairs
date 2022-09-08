import { Link } from "react-router-dom"


export const Employee = ({ id, fullName, email}) => {
    return <section className="employee" >
                        <div>
                            <Link to={`/employees/${id}`}>Name: {fullName}</Link>
                            </div>
                        <div>Email: {email}</div>
                    </section>
}

// We're going to take the name of an employee and turn it into a hyperlink, that will change route to employees/primarykey of employee.