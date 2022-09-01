import { useState } from "react";

export const useForm = ( initialState:any = {} ) => {
    
    const [formValues, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }

    const handleInputChange = ({ target }:any) => {

        setValues({
            ...formValues,
            [ target.name ]: target.value
        });

    }

    return { formValues, handleInputChange, reset };

}