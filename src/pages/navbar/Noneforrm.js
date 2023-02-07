import React, { useState } from 'react';

function SignUpForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        // validate the form data
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        // send the form data to the server or do something else with it
        console.log("Name: ", name);
        console.log("Email: ", email);
        console.log("Password: ", password);
    }

    const validateForm = () => {
        const errors = {};
        if (!name) {
            errors.name = 'Name is required';
        }
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is not valid';
        }
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        if (!passwordConfirm) {
            errors.passwordConfirm = 'Please confirm the password';
        } else if (password !== passwordConfirm) {
            errors.passwordConfirm = 'Passwords do not match';
        }
        return errors;
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                {errors.name && <div className="error">{errors.name}</div>}
            </label>
            <br />
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                {errors.email && <div className="error">{errors.email}</div>}
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                {errors.password && <div className="error">{errors.password}</div>}
            </label>
            <br />
            <label>
                Confirm Password:
                <input type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                {errors.passwordConfirm && <div className="error">{errors.passwordConfirm}</div>}
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    )


}

export default Noneforrm


