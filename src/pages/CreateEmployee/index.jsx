//data
import React, { useEffect, useState, useCallback } from 'react'
import statesList from '../../data/states.json'

//DatePicker
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

//Package Modal
//import { Modal } from 'react-module-regular'
import { Modal } from 'react-modal-regular'



const CreateEmployee = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [startDate, setStartDate] = useState(new Date())
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [addressState, setAddressState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [department, setDepartment] = useState('')
    const [send, setSend] = useState(false)

    const registerLocalStorage = (objectEmployee) => {
        //LocalStorage
        const employeeInStorage = localStorage.getItem('employees')
        //Si le localStorage et vide rentrer l'objectEmployee dans le localStorage sinon copier l'object du localStorage en ajoutant le nouveau employé
        if(employeeInStorage === null) {
            const tab = [objectEmployee]
            localStorage.setItem('employees', JSON.stringify(tab))
        } else {
            const objectTab = JSON.parse(employeeInStorage)
            objectTab.push(objectEmployee)
            localStorage.setItem('employees', JSON.stringify(objectTab))
        }

    }

    const checkFormInputs = useCallback((e) => {
            const newDateOfBirth = Date.parse(dateOfBirth)
            const newStartDate = Date.parse(startDate)
            //Valeurs interdite par l'utilisateur risque d'injection
            const prohibitedValues = ["<", ">"]
            const messageErrorForm = document.querySelector('#messageErrorForm')
            let message = ''

            if( firstName === '' || lastName === '' || dateOfBirth === '' || startDate === '' || street === '' || city === '' || addressState === '' || zipCode === '' || department === ''){
                message = 'Veuillez remplir tous les champs ! '
                messageErrorForm.textContent = message
                throw new Error(message)
            } else if ( newDateOfBirth === newStartDate){
                message = 'La date de naissance et la date de démarrage sont identiques ! '
                messageErrorForm.textContent = message
                throw new Error(message)
            } else if ( ((new Date().getFullYear()) - (dateOfBirth.getFullYear())) < 16 ){
                message = "L'employé doit avoir au moins 16 ans ! "
                messageErrorForm.textContent = message
                throw new Error(message) 
            } else if (prohibitedValues.some(i => firstName.includes(i)) || prohibitedValues.some(i => lastName.includes(i))
                || prohibitedValues.some(i => street.includes(i)) || prohibitedValues.some(i => city.includes(i)) 
                || prohibitedValues.some(i => addressState.includes(i)) || prohibitedValues.some(i => zipCode.includes(i)) 
                || prohibitedValues.some(i => department.includes(i)) 
            ) {
                message = 'Valeurs entrées < et > interdites !'
                messageErrorForm.textContent = message
                throw new Error(message) 
            } else {
                messageErrorForm.textContent = ''
            }

                return { newDateOfBirth, newStartDate }

    }, [addressState,city,department,firstName,lastName,street,zipCode, dateOfBirth, startDate])

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        try {
           const {newDateOfBirth, newStartDate } = checkFormInputs()

            //Creation de l'objet employé
            const objectEmployee = {
                firstName: firstName, 
                lastName: lastName, 
                dateOfBirth: newDateOfBirth, 
                startDate: newStartDate, 
                street: street, 
                city: city, 
                addressState: addressState, 
                zipCode: zipCode, 
                department: department
            } 
            registerLocalStorage(objectEmployee)

            setSend(true)
            
            
        } catch (error) {
            // Gérer les erreurs
            console.error("Erreur lors de l'envoie du formulaire :", error.message)
        }
    }, [addressState,city,department,firstName,lastName,street,zipCode, checkFormInputs])

    useEffect(() => {
        const btnForm = document.querySelector('#BtnSubmit')
        btnForm.addEventListener('click', () => {if(handleSubmit) setSend(false)})
    }, [handleSubmit])

  return (
    <main className="main">
        {
            send === true ?
                <Modal />
            :
                null
        }
        <div className="title">
            <h1>HRnet</h1>
        </div>
        <div className="formContainer">
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
            <span id='messageErrorForm'></span>
            <button id="BtnSubmit" onClick={handleSubmit}>Save</button>
        </div>
    </main>
  )
}

export default CreateEmployee 
