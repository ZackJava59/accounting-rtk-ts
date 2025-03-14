import {useState} from "react";
import {useChangePasswordMutation, useFetchUserQuery} from "../../features/api/accauntApi.ts";
import {createToken} from "../../utils/constants.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {setToken} from "../../features/slices/tokenSlice.ts";

interface Props {
    close: () => void;
}

const ChangePassword = ({close}: Props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [changePassword] = useChangePasswordMutation();
    const token = useAppSelector(state => state.token);
    const {data} = useFetchUserQuery(token);
    const dispatch = useAppDispatch();

    const handleClickSave = async () => {
        if (newPassword === confirmPassword) {
            const t = createToken(data!.login, oldPassword);
            const {error} = await changePassword({newPassword, token: t});
            if (!error) {
                dispatch(setToken(createToken(data!.login, newPassword)));
            }
        } else {
            alert('New password and confirm new password are different');
        }
        close();
    };


    const handleClickClear = () => {
        setNewPassword('');
        setConfirmPassword('');
        setOldPassword('')
    }

    return (
        <>
            <label>Old Password:
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            </label>
            <label>New Password
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </label>
            <label>Confirm Password:
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </label>
            <button onClick={handleClickSave}>Save and Close</button>
            <button onClick={close}>Close without save</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
};

export default ChangePassword;