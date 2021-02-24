import React, { useState, useEffect } from 'react';
import Input from './Input';
import axios from 'axios';
import * as yup from 'yup';

const Form = () => {
    const defaultState = {
        name: "",
        email: "",
        password: "",
        terms: false
    }
    const [formState, setFormState] = useState(defaultState);
    const [errors, setErrors] = useState({...defaultState, terms: ""});

    let formSchema = yup.object().shape({
        name: yup.string().required("Please provide your name"),
        email: yup.string().required("Please proivde an email").email("Invalid Email"),
        password: yup.string().required("Please provide a password"),
        terms:  yup.boolean().required("Please agree to the terms and conditions")
    })

    const formSubmit = e => {
        e.preventDefault();
        console.log("Form Submitted!");
    }

    const validateChange = e => {
        e.persist();
        yup.reach(formSchema, e.target.name).validate(e.target.value)
            .then(valid => setErrors({
                ...errors,
                [e.target.name]: ""   
            }))
            .catch(error => setErrors({
                ...errors,
                [e.target.name]: error.errors[0]
            }));
    }

    const change = e => {
        //console.log("Input Changed!", e.target.value);
        const value = 
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({
            ...formState,
            [e.target.name]: value
        });
        validateChange(e);
    }

    useEffect(() => {
        axios.post("https://reqres.in/api/users")
            .then(res => {
                console.log(res);
            })
    },[])

    return (
        <form onSubmit={formSubmit}>
            <Input 
                onChange={change} 
                value={formState.name} 
                type="text" 
                name="name"
                label="Name"
                errors={errors}
            />
            <Input 
                onChange={change} 
                value={formState.email} 
                type="text" 
                name="email"
                label="Email"
                errors={errors}
            />
            <Input 
                onChange={change} 
                value={formState.password} 
                type="text" 
                name="password"
                label="Password"
                errors={errors}
            />
            <label className="terms" htmlFor="terms">
                <input 
                    onChange={change} 
                    name="terms" 
                    type="checkbox"
                    errors={errors}
                />
                Terms & Conditions
            </label>
            <button >Submit</button>
        </form>
    )
}



export default Form;