import {Navigate,Outlet} from "react-router-dom";
import {UseAuthStatus} from'../hook/useAuthStatus'

const PrivateRoute = () => {
    const {loggedIn,checkingStatus} = UseAuthStatus()
    if(checkingStatus){
        return(
            <img src='src/assets/loading.gif' alt='Loading'/>
        )
    }

    return loggedIn? <Outlet/>:<Navigate to='/signin'/>

}


export default PrivateRoute