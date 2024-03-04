 import * as TeamService from "../../_services/TeamService.jsx";
import UpdateTeam from "./updateteams.jsx";
 import {useEffect, useState} from "react";
 import TeamMembers from "./TeamMembers.jsx";
 import {Link} from "react-router-dom";
 import {addMemberToTeam, getOneUser} from "../../_services/TeamService.jsx";

export default function Teamcard ({ team ,fetchTeams}){
    const [usersInfo, setUsersInfo] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsersInfo();
        fetchallusers();
    }, [team]);
    const fetchallusers = async () => {
        try {
            const fetchedUsers = await TeamService.getAllUser(); // Assuming you have a function to get teams from your service
            const filteredUsers = fetchedUsers.filter(user => !user.teams || user.teams.length === 0);
            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    }

    const fetchUsersInfo = async () => {
        try {
            const users = team.users; // Assuming team.users contains user IDs
            const usersDetails = await Promise.all(
                users.map((userId) => TeamService.getOneUser(userId))
            );
            setUsersInfo(usersDetails);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };
    const handleAddMember = async (teamId, userId) => {
        try {
            await addMemberToTeam(teamId, userId); // Call the function to add a member to a team
          await   fetchallusers();
             fetchTeams();

            // Optionally, you can update the UI or perform any other action after adding the member
        } catch (error) {
            console.error('Error adding member to team:', error);
        }
    };
    const HandeDelete = async (_id) => {
        try {
            await TeamService.deleteTeam(_id);
            // Fetch updated teams after successful deletion
            fetchTeams();
        } catch (error) {
            console.error(error);
            // Handle error appropriately
        }
    };
    const [searchQuery, setSearchQuery] = useState('');

    // Filter users based on the search query
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
     return (
        <>



                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6" >
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between mt-5">
                                <div className="lesson_name">
                                    <div className="project-block light-info-bg">
                                        <Link to={`/Home/teams-members/${team._id}`}>
                                            <i className="icofont-group" />
                                        </Link>
                                    </div>
                                    <span className="small text-muted project_name fw-bold" key={team._id}>
                                        {" "}
                                        {team.category}{" "}
                                    </span>
                                    <h6 className="mb-0 fw-bold  fs-6  mb-2" key={team._id}>{team.name}</h6>
                                </div>
                                <div
                                    className="btn-group"
                                    role="group"
                                    aria-label="Basic outlined example"
                                >

                                        <UpdateTeam id={team._id} fetchTeams={fetchTeams}/>


                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={()=> HandeDelete(team._id)}

                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteproject"
                                    >
                                        <i className="icofont-ui-delete text-danger" />
                                    </button>


                                </div>
                            </div>

                            <div className="row g-2 pt-4">
                                <div className="d-flex align-items-center">
                                    {usersInfo.length > 0 && usersInfo.map((user, index) => (
                                        <div key={index} className="avatar-list avatar-list-stacked pt-2">
                                            <img
                                                className="avatar rounded-circle sm"
                                                src="/assets/images/xs/avatar2.jpg"
                                                alt=""
                                            />
                                        </div>
                                    ))}




                                    <span
                                        className="avatar rounded-circle text-center pointer sm ms-2 mt-4" // Add the "ms-1" class for left margin
                                        data-bs-toggle="modal"
                                        data-bs-target="#addUser"
                                    >
    <i className="icofont-ui-add"/>
</span>

                                </div>

                                {/* Modal Members*/}
                                <div
                                    className="modal fade"
                                    id="addUser"
                                    tabIndex={-1}
                                    aria-labelledby="addUserLabel"
                                    aria-hidden="true"
                                >
                                    <div className="modal-dialog modal-dialog-centered modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title  fw-bold" id="addUserLabel">
                                                    Add Member
                                                </h5>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                />
                                            </div>
                                            <div className="modal-body">
                                                <div className="inviteby_email">
                                                    <div className="input-group mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Search by username"
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="members_list">
                                                    <h6 className="fw-bold">Employee</h6>
                                                    <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0">
                                                        {filteredUsers.map((user, index) => (
                                                            <li key={index} className="list-group-item py-3 text-center text-md-start">
                                                                <div className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row">
                                                                    <div className="no-thumbnail mb-2 mb-md-0">
                                                                        <img
                                                                            className="avatar lg rounded-circle"
                                                                            src="/assets/images/xs/avatar2.jpg" // Replace 'avatarSrc' with the appropriate property that holds the user's avatar URL
                                                                            alt={`Avatar of ${user.username}`}
                                                                        />
                                                                    </div>
                                                                    <div className="flex-fill ms-3 text-truncate">
                                                                        <h6 className="mb-0 fw-bold">{user.username}</h6> {/* Replace 'username' with the appropriate property that holds the user's name */}
                                                                        <span className="text-muted">{user.email}</span> {/* Replace 'email' with the appropriate property that holds the user's email */}
                                                                    </div>
                                                                    <div className="members-action">
                                                                        <span className="members-role">Admin</span>
                                                                        <div className="btn-group">
                                                                            <button
                                                                                type="button"
                                                                                className="btn bg-transparent dropdown-toggle"
                                                                                aria-expanded="false"
                                                                                onClick={() => handleAddMember(team._id, user._id)}
                                                                            >
                                                                                Invite
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <i className="icofont-group-students " />
                                        <span className="ms-2">{usersInfo.length} Members</span>
                                    </div>
                                </div>

                            </div>
                            <div className="dividers-block" />
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <h4 className="small fw-bold mb-0">Description</h4>


                            </div>
                            <p key={team._id}> {team.description}</p>

                        </div>
                    </div>
                </div>
         </>
    )
}