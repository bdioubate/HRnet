import { configureStore, createSlice } from '@reduxjs/toolkit'

const employeeSlice = createSlice({
    name: "employee",
    initialState: [
        {firstname: "", lastname: "", dateOfBirth: ""/*new Date.now()*/, startDate: ""/*new Date.now()*/, street: "", city: "", addressState: "", zipCode: "", department: ""}
    ],
    reducers: {
        createEmployee: (state, action) => {
            const payloadSplit = String(action.payload).split('-')
            const firstname = payloadSplit[0]
            const lastname = payloadSplit[1]
            const dateOfBirth = payloadSplit[2]
            const startDate = payloadSplit[3]
            const street = payloadSplit[4]
            const city = payloadSplit[5]
            const addressState = payloadSplit[6]
            const zipCode = payloadSplit[7]
            const department = payloadSplit[8]

            //const employee = state.find(t => t.id === 0)
            const employee = state[0]
            employee.firstname = firstname
            employee.lastname = lastname
            employee.dateOfBirth = dateOfBirth
            employee.startDate = startDate
            employee.street = street
            employee.city = city
            employee.addressState = addressState
            employee.zipCode = zipCode
            employee.department = department
        }
    }
})

//Action creator
export const { createEmployee } = employeeSlice.actions

export const store = configureStore({
    reducer: {
        employee: employeeSlice.reducer
    }
})