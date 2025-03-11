import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {changePassword} from "../../features/api/accauntApi.ts";
import {deleteToken} from "../../features/slices/tokenSlice.ts";

interface Props {
    close: () => void;
}

const ChangePassword = ({close}: Props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.token);


    const decodeToken = (token: string) => {
        try {
            const decoded = atob(token.split(" ")[1]);
            const [, password] = decoded.split(":");
            return password;
        } catch {
            return null;
        }
    };

    const handleClickSave = () => {
        const storedPassword = decodeToken(token);
        if (!storedPassword || storedPassword !== oldPassword) {
            alert("Incorrect old password! Logging out...");
            dispatch(deleteToken());
            close();
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('New password and confirm new password are different');
            return;
        }

        dispatch(changePassword(newPassword));
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