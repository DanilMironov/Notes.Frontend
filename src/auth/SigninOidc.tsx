import { useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { signinRedirectCallback } from './user-service';
//import { useHistory } from 'react-router-dom'

const SigninOidc: FC<{}> = () => {
    const navigate = useNavigate();
    useEffect(() => {
        async function signinAsync() {
            await signinRedirectCallback();
            //history.push('/');
            navigate('/');
        }
        signinAsync();
    }, [navigate]);
    return <div>Redirecting...</div>;
};

export default SigninOidc;