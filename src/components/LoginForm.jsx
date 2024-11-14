import { useState, } from 'react';

const LoginForm = ({onLogin}) => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    }); 

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onLogin(e, formData.username, formData.password);
    };

    return (
        <div >
                    <div>
                        <form onSubmit={onSubmit}>
                            <div >
                                <input
                                    type="username"
                                    id="loginUsername"
                                    name="username"
                                    onChange={onChangeHandler}
                                />
                                <label htmlFor="loginUsername">Username</label>
                            </div>

                            <div >
                                <input
                                    type="password"
                                    id="loginPassword"
                                    name="password"
                                    onChange={onChangeHandler}
                                />
                                <label htmlFor="loginPassword">Password</label>
                            </div>
                            <button type="submit" >Sign in</button>
                        </form>
                    </div>
                </div>
    );
};

export default LoginForm;