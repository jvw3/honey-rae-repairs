export const TicketSearch = ({setterFunction}) => {
    return (
        <div>
            <input 
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Enter Search Term" />
        </div>

    )
}

// This component has access to setSearchTerms via the property of setterFunction.
// So now, the value of setterFunction is now the setter function for the state variable in the parent.