//data
import statesList from '../../data/states.json'

const CreateEmployee = () => {
  return (
    <main className="main">
        <div className="title">
            <h1>HRnet</h1>
        </div>
        <div className="container">
            <h2>Create Employee</h2>
            <form action="#" id="create-employee">
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" />

                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name"></input>

                <label htmlFor="date-of-birth">Date of Birth</label>
                <input id="date-of-birth" type="text"></input>

                <label htmlFor="start-date">Start Date</label>
                <input id="start-date" type="text" ></input>

                <fieldset className="address">
                    <legend>Address</legend>

                    <label htmlFor="street">Street</label>
                    <input id="street" type="text"></input>

                    <label htmlFor="city">City</label>
                    <input id="city" type="text"></input>

                    <label htmlFor="state">State</label>
                    <select name="state" id="state">
                        {statesList.map((state, key) => (
                            <option key={key} value={state.abbreviation}>{state.name}</option>
                        ))}
                    </select>

                    <label htmlFor="zip-code">Zip Code</label>
                    <input id="zip-code" type="number"></input>
                </fieldset>

                <label htmlFor="department">Department</label>
                <select name="department" id="department">
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>Engineering</option>
                    <option>Human Resources</option>
                    <option>Legal</option>
                </select>
            </form>

            <button>Save</button>
        </div>
    </main>
  )
}

export default CreateEmployee 