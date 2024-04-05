import * as TeamService from "../../_services/TeamService.jsx";
import UpdateTeam from "./updateteams.jsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {addMemberToTeam, addMemberToTeam2, getTeamuser} from "../../_services/TeamService.jsx";
import {useSelector} from "react-redux";
import {selectUserObject} from "../../redux/user/userSelector.js";

export default function UserTeams (){
    const [team, setTeams] = useState([]);
    const currentUser = useSelector(selectUserObject);

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const userTeams = await TeamService.getTeamuser(currentUser._id);
            setTeams(userTeams);
        } catch (error) {
            console.error('Error fetching user teams:', error);
        }
    };




    return (
        <>

            {team.map((team) => (
                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6" key={team._id}>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between mt-5">
                                <div className="lesson_name">
                                    <div className="project-block light-info-bg">
                                        <Link to={`/Home/teams-members/${team._id}`}>
                                            <i className="icofont-group" />
                                        </Link>
                                    </div>
                                    <span className="small text-muted project_name fw-bold">{team.category}</span>
                                    <h6 className="mb-0 fw-bold fs-6 mb-2">{team.name}</h6>
                                </div>
                                <div
                                    className="btn-group"
                                    role="group"
                                    aria-label="Basic outlined example"
                                ></div>
                            </div>
                            <div className="dividers-block" />
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <h4 className="small fw-bold mb-0">Description</h4>
                            </div>
                            <p>{team.description}</p>
                        </div>
                    </div>
                </div>
            ))}

         </>
    )
}