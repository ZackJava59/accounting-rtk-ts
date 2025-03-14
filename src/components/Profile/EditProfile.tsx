import {useState} from "react";
import {useUpdateUserMutation} from "../../features/api/accauntApi.ts";


interface Props {
    close: () => void;
}

const EditProfile = ({close}: Props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [updateUser] = useUpdateUserMutation()

    const handleClickSave = () => {
        updateUser({firstName, lastName})
        close();
    }

    const handleClickClear = () => {
        setFirstName('');
        setLastName('');
    }

    return (
        <>
            <label>First Name:
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            <label>Last Name:
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            <button onClick={handleClickSave}>Save and Close</button>
            <button onClick={close}>Close without save</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
};

export default EditProfile;