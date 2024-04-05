import {useParams} from "react-router-dom";
import * as TeamService from "../../_services/TeamService.jsx";
import {useEffect, useState} from "react";
import {getChatMessages, sendChatMessage} from "../../_services/TeamService.jsx";
import {useSelector} from "react-redux";
import {selectUserObject} from "../../redux/user/userSelector.js";
import team from "../../_models/Team.jsx";

export default function TeamChat() {
    const { id } = useParams( );
    const [Chat, setChats] = useState([]);
    const [Team, setTeam] = useState([]);
    const currentUser = useSelector(selectUserObject);
    const [messageText, setMessageText] = useState('');
    const fetchAllChats = async () => {
        try {
            console.log("zazazaz"+currentUser._id);

            const fetchedTeam = await TeamService.getOneTeam(id);
            setTeam(fetchedTeam);
            const fetchedChats = await TeamService.getChatMessages(id);
            setChats(fetchedChats);
            // Log the content of each chat message to the console
            fetchedChats.forEach(chat => {
                console.log(chat.content);
            });
        } catch (error) {
            console.error('Error fetching chat messages:', error);
        }
    };
    // Fetch chat messages when the component mounts
    useEffect(() => {


        fetchAllChats();
    }, [id]);
    const handleSendMessage = async () => {
        try {
            // Create the SendChatMessageDto object
            const sendChatMessageDto = {
                senderId: currentUser, // Assuming currentUser contains the sender's information
                content: messageText,
            };

            // Call the API function to send the message
            await sendChatMessage(id, sendChatMessageDto);

            // Clear the message input field after sending
            setMessageText('');

            // Refresh the chat messages after sending
            fetchAllChats();

        } catch (error) {
            console.error('Error sending chat message:', error);
        }
    };
    return (
        <>


            <div className="main">
                 <div className="body d-flex">
                    <div className="container-xxl p-0">
                        <div className="row g-0">
                            <div className="col-12 d-flex">
                                  <div className="card card-chat-body border-0  w-100 px-4 px-md-5 py-3 py-md-4">

                                     <div className="chat-header d-flex justify-content-between align-items-center border-bottom pb-3">
                                        <div className="d-flex align-items-center">
                                            <a href="index.html" title="Home"><i className="icofont-arrow-left fs-4"></i></a>
                                            <a href="javascript:void(0);" title="">
                                                <img className="avatar rounded" src="/assets/images/xs/avatar2.jpg" alt="avatar"/>
                                            </a>
                                            <div className="ms-3">
                                                <h6 className="mb-0">{Team.name}</h6>
                                                <small className="text-muted">{Team.description}</small>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <a className="nav-link py-2 px-3 text-muted d-none d-lg-block" href="javascript:void(0);"><i className="fa fa-camera"></i></a>
                                            <a className="nav-link py-2 px-3 text-muted d-none d-lg-block" href="javascript:void(0);"><i className="fa fa-video-camera"></i></a>
                                            <a className="nav-link py-2 px-3 text-muted d-none d-lg-block" href="javascript:void(0);"><i className="fa fa-gear"></i></a>
                                            <a className="nav-link py-2 px-3 text-muted d-none d-lg-block" href="javascript:void(0);"><i className="fa fa-info-circle"></i></a>
                                            <a className="nav-link py-2 px-3 d-block d-lg-none chatlist-toggle" href="#"><i className="fa fa-bars"></i></a>
                                             <div className="nav-item list-inline-item d-block d-xl-none">
                                                <div className="dropdown">
                                                    <a className="nav-link text-muted px-0" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i className="fa fa-ellipsis-v"></i>
                                                    </a>
                                                    <ul className="dropdown-menu shadow border-0">
                                                        <li><a className="dropdown-item" href="index.html"><i className="fa fa-camera"></i> Share Images</a></li>
                                                        <li><a className="dropdown-item" href="index.html"><i className="fa fa-video-camera"></i> Video Call</a></li>
                                                        <li><a className="dropdown-item" href="index.html"><i className="fa fa-gear"></i> Settings</a></li>
                                                        <li><a className="dropdown-item" href="index.html"><i className="fa fa-info-circle"></i> Info</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                      <ul className="chat-history list-unstyled mb-0 py-lg-5 py-md-4 py-3 flex-grow-1">

                                          {Chat.map((chat, index) => (
                                              <li key={chat.id} className={`mb-3 d-flex flex-row ${currentUser._id === chat.sender ? 'justify-content-end' : 'align-items-end'}`}>
                                                  {currentUser._id !== chat.sender && (
                                                      <div className="max-width-70">
                                                          <div className="user-info mb-1">
                                                              <span className="text-muted small">{chat.timestamp}</span>
                                                          </div>
                                                          <div className="card border-0 p-3">
                                                              <div className="message">{chat.content}</div>
                                                          </div>
                                                      </div>
                                                  )}
                                                  {currentUser._id === chat.sender && (
                                                      <div className="max-width-70 text-right">
                                                          <div className="user-info mb-1">
                                                              <span className="text-muted small">{chat.timestamp}</span>
                                                          </div>
                                                          <div className="card border-0 p-3 text-light" style={{ backgroundColor: '#4c3575' }}>
                                                              <div className="message">{chat.content}</div>
                                                          </div>
                                                      </div>
                                                  )}
                                              </li>
                                          ))}
                                      </ul>
                                      <div className="chat-message d-flex align-items-center">
                <textarea
                    className="form-control flex-grow-1"
                    placeholder="Enter text here..."
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                ></textarea>
                                          <button className="btn btn-primary btn-lg" onClick={handleSendMessage} style={{ backgroundColor: 'blue' }}>
                                              <i className="fas fa-paper-plane"></i> {/* Assuming you're using Font Awesome for icons */}
                                              Send
                                          </button>


                                      </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
)

}