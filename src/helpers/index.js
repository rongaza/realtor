import zipcodes from 'zipcodes'
import { useLocation } from 'react-router-dom'

export const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

export const validLocation = (formValues, errors, setErrorsStateCB) => {
    let valid = true
    let result = null

    result = zipcodes.lookup(formValues.zip)

    if (!result) {
        setErrorsStateCB({ zip: 'Not a valid zip code' })
        valid = false
    }

    if (result.city.toUpperCase() !== formValues.city.toUpperCase()) {
        setErrorsStateCB((errors) => {
            return {
                ...errors,
                city: `Could not find "${formValues.city}" in area code${formValues.zip}. Did you mean "${result.city}"?`,
            }
        })
        valid = false
    }

    if (result.state.toUpperCase() !== formValues.state.toUpperCase()) {
        setErrorsStateCB((errors) => {
            return {
                ...errors,
                state: `Could not find "${formValues.state}" in area code ${formValues.zip}. Did you mean "${result.state}"?`,
            }
        })
        valid = false
    }
    console.log(result)
    console.log('validation helper', valid)
    return valid
}

export const replaceUndefinedToNull = (obj) => {
    let newObj = obj
    for (const key in newObj) {
        const element = newObj[key]
        if (element === undefined) newObj[key] = null
    }
    return newObj
}

export const fakeListing = {
    baths: '3',
    bedrooms: '4',
    city: 'Bentonville',
    date: '2020-07-07',
    squareFeet: 7777,
    description: 'Great house in a central location',
    garageSize: '500',
    lotSize: '12000',
    neighborhood: 'Bentonville County',
    price: 950000,
    state: 'AR',
    street: '1902 B Street',
    zip: '72712',
}
