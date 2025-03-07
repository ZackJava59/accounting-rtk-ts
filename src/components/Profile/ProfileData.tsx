import {useAppSelector} from "../../app/hooks.ts";

const ProfileData = () => {
    const {firstName, lastName, login, roles} = useAppSelector(state => state.user);

    return (
        <>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>Login: {login}</p>
            <ul>
                {roles.map(role => <li key={role}>{role}</li>)}
            </ul>
        </>
    );
};

export default ProfileData;