import {useAppSelector} from "../../app/hooks.ts";
import {useFetchUserQuery} from "../../features/api/accauntApi.ts";

const ProfileData = () => {
    const token = useAppSelector(state => state.token);
    const {data, isLoading} = useFetchUserQuery(token);

    if(isLoading){
        return <p>Loading...</p>
    }
    if(!data){
        return <p>Data is not available</p>
    }

    return (
        <>
            <p>First Name: {data.firstName}</p>
            <p>Last Name: {data.lastName}</p>
            <p>Login: {data.login}</p>
            <ul>
                {data.roles.map(role => <li key={role}>{role}</li>)}
            </ul>
        </>
    );
};

export default ProfileData;