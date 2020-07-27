import zipcodes from 'zipcodes'

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
