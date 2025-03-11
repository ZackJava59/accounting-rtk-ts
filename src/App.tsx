import './App.css'
import Guest from "./components/Guest";
import {Navigate, Route, Routes} from "react-router";
import Profile from "./components/Profile";
import {useAppSelector} from "./app/hooks.ts";

function App() {
    const token = useAppSelector(state => state.token);

    return (
        <Routes>
            <Route path="/" element={token ? <Navigate to={'/profile'}/> : <Guest/>}/>
            <Route path="/profile" element={token ? <Profile/> : <Navigate to={'/'}/>}/>
        </Routes>
    )
}

export default App
