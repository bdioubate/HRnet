//data
import React, { useState } from 'react'
import statesList from '../../data/states.json'

//DatePicker
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

//Import Redux
import { useDispatch, useSelector } from "react-redux";
import { createEmployee } from "../../redux";

const CreateEmployee = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [startDate, setStartDate] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [addressState, setAddressState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [department, setDepartment] = useState('')

    //Redux
    const employee = useSelector((state) => state.employee)
    const dispatch = useDispatch()

        //L'object de l'employé créé 
        const objectEmployee = employee[0]

        

    const handleSubmit = (e) => {
        e.preventDefault()
        const newDateOfBirth = Date.parse(dateOfBirth)
        const newStartDate = Date.parse(startDate)

        const payloadEmployee = `${firstName}-${lastName}-${newDateOfBirth}-${newStartDate}-${street}-${city}-${addressState}-${zipCode}-${department}`

        //Ajout de l'employé
        dispatch(createEmployee(payloadEmployee))
        
        //LocalStorage
        const employeeInStorage = localStorage.getItem('employees')
            //Si le localStorage et vide rentrer le state redux dans le localStorage sinon copier l'object du localStorage en ajoutant le nouveau employé
        if(employeeInStorage === null) {
            const tab = [...employee]
            localStorage.setItem('employees', JSON.stringify(tab))
        } else {
            const objectTab = JSON.parse(employeeInStorage)
            objectTab.push(objectEmployee)
            localStorage.setItem('employees', JSON.stringify(objectTab))
        }
    }

  return (
    <main className="main">
        <div className="title">
            <h1>HRnet</h1>
        </div>
        <div className="container">
            <h2>Create Employee</h2>
            <form action="#" id="create-employee">
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" onChange={(e) => setFirstName(e.target.value)}/>
                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" onChange={(e) => setLastName(e.target.value)}></input>

                <label htmlFor="date-of-birth">Date of Birth</label>
                <DatePicker dateFormat="dd/MM/yyyy" id="date-of-birth" type="text" selected={dateOfBirth} onChange={(date) => setDateOfBirth(date)}/>

                <label htmlFor="start-date">Start Date</label>
                <DatePicker dateFormat="dd/MM/yyyy" id="start-date" type="text" selected={startDate} onChange={(date) => setStartDate(date)}/>

                <fieldset className="address">
                    <legend>Address</legend>

                    <label htmlFor="street">Street</label>
                    <input id="street" type="text" onChange={(e) => setStreet(e.target.value)}></input>

                    <label htmlFor="city">City</label>
                    <input id="city" type="text" onChange={(e) => setCity(e.target.value)}></input>

                    <label htmlFor="state">State</label>
                    <select name="state" id="state" onChange={(e) => setAddressState(e.target.value)}>
                        {statesList.map((state, key) => (
                            <option key={key} value={state.abbreviation}>{state.name}</option>
                        ))}
                    </select>

                    <label htmlFor="zip-code">Zip Code</label>
                    <input id="zip-code" type="number" onChange={(e) => setZipCode(e.target.value)}></input>
                </fieldset>

                <label htmlFor="department">Department</label>
                <select name="department" id="department" onChange={(e) => setDepartment(e.target.value)}>
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>Engineering</option>
                    <option>Human Resources</option>
                    <option>Legal</option>
                </select>
            </form>

            <button onClick={handleSubmit} >Save</button>
        </div>
    </main>
  )
}

export default CreateEmployee 
