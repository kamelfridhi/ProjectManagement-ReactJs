import {useSelector} from "react-redux";
import {selectUserObject} from "../redux/user/userSelector.js";
import {Navigate, Outlet} from "react-router-dom";

export default function PrivateRoute() {
    const currentUser = useSelector(selectUserObject);
    return currentUser? <Outlet/> : <Navigate to={"/"}/>;
}