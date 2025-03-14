import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {useLazyFetchUserQuery} from "../../features/api/accauntApi.ts";
import {createToken} from "../../utils/constants.ts";
import {setToken} from "../../features/slices/tokenSlice.ts";

const SignIn = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const [fetchUser] = useLazyFetchUserQuery()

    const handleClickSignIn = async () => {
        const token = createToken(login, password);
        const result = await fetchUser(token);
        if (result.isSuccess) {
            dispatch(setToken(token))
        }
    }

    const handleClickClear = () => {
        setLogin('');
        setPassword('');
    }

    return (
        <>
            <label>Login:
                <input
                    type={'text'}
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                />
            </label>
            <label>Password:
                <input
                    type={'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <button onClick={handleClickSignIn}>Sign in</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
};

export default SignIn;