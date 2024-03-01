import React, {useEffect, useState} from "react";
import * as TaskService from "../../../_services/TaskService.jsx";




export default function BoardTask() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await TaskService.getAllTasks();
            setTasks(data);
        };
        fetchTasks();
    }, []);


    return (

        <>


            <div className="row taskboard g-3 py-xxl-4">
                {/* <div class="col-xxl-3 col-xl-12 col-lg-12 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-4 mt-sm-4 mt-4">
                          <h6 class="fw-bold py-3 mb-0">Task Ready</h6>
                          <div class="planned_task">
                              <div class="dd" data-plugin="nestable">
                                  <ol class="dd-list">
                                      <li class="dd-item" data-id="1">
                                          <div class="dd-handle">
                                              <div class="pages-info d-flex align-items-center justify-content-between">
                                                  <h6 class="light-info-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">UI/UX Design</h6>
                                                  <div class="pages-priority d-flex flex-column align-items-center justify-content-center">
                                                      <div class="avatar-list avatar-list-stacked m-0">
                                                          <img class="avatar rounded-circle small-avt" src="assets/images/xs/avatar2.jpg" alt="">
                                                          <img class="avatar rounded-circle small-avt" src="assets/images/xs/avatar1.jpg" alt="">
                                                      </div>
                                                      <span class="badge bg-warning text-end mt-2">MEDIUM</span>
                                                  </div>
                                              </div>
                                              <p class="py-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id
                                                  nec scelerisque massa.</p>
                                              <div class="tikit-info row g-3 align-items-center">
                                                  <div class="col-sm">
                                                      <ul class="d-flex list-unstyled align-items-center flex-wrap">
                                                          <li class="me-2">
                                                              <div class="d-flex align-items-center">
                                                                  <i class="icofont-flag"></i>
                                                                  <span class="ms-1">25 Nov</span>
                                                              </div>
                                                          </li>
                                                          <li class="me-2">
                                                              <div class="d-flex align-items-center">

                                                                      <i class="icofont-ui-text-chat"></i>
                                                                      <span class="ms-1">4</span>

                                                              </div>
                                                          </li>
                                                          <li>
                                                              <div class="d-flex align-items-center">
                                                                  <i class="icofont-paper-clip"></i>
                                                                  <span class="ms-1">5</span>
                                                              </div>
                                                          </li>
                                                      </ul>
                                                  </div>
                                                  <div class="col-sm text-end">
                                                      <div class="small text-truncate light-danger-bg py-1 px-2 rounded-1 d-inline-block fw-bold small"> Social Geek Made </div>
                                                  </div>
                                              </div>
                                          </div>

                                      </li>
                                      <li class="dd-item" data-id="2">
                                          <div class="dd-handle">
                                              <div class="pages-info d-flex align-items-center justify-content-between">
                                                  <h6 class="bg-lightgreen py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">Website Design
                                                  </h6>
                                                  <div class="pages-priority d-flex flex-column align-items-center justify-content-center">
                                                      <div class="avatar-list avatar-list-stacked m-0">
                                                          <img class="avatar rounded-circle small-avt" src="assets/images/xs/avatar7.jpg" alt="">
                                                      </div>
                                                      <span class="badge bg-success text-end mt-2">LOW</span>
                                                  </div>
                                              </div>
                                              <p class="py-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id
                                                  nec scelerisque massa.</p>
                                              <div class="tikit-info row g-3 align-items-center">
                                                  <div class="col-sm">
                                                      <ul class="d-flex list-unstyled align-items-center flex-wrap">
                                                          <li class="me-2">
                                                              <div class="d-flex align-items-center">
                                                                  <i class="icofont-flag"></i>
                                                                  <span class="ms-1">12 Feb</span>
                                                              </div>
                                                          </li>
                                                          <li class="me-2">
                                                              <div class="d-flex align-items-center">

                                                                      <i class="icofont-ui-text-chat"></i>
                                                                      <span class="ms-1">3</span>

                                                              </div>
                                                          </li>
                                                          <li>
                                                              <div class="d-flex align-items-center">
                                                                  <i class="icofont-paper-clip"></i>
                                                                  <span class="ms-1">4</span>
                                                              </div>
                                                          </li>
                                                      </ul>
                                                  </div>
                                                  <div class="col-sm text-end">

                                                      <div class="small text-truncate light-danger-bg py-1 px-2 rounded-1 d-inline-block fw-bold small"> Practice to Perfect </div>
                                                  </div>
                                              </div>
                                          </div>

                                      </li>
                                      <li class="dd-item" data-id="3">
                                          <div class="dd-handle">
                                              <div class="pages-info d-flex align-items-center justify-content-between">
                                                  <h6 class="light-success-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">Quality Assurance
                                                  </h6>
                                                  <div class="pages-priority d-flex flex-column align-items-center justify-content-center">
                                                      <div class="avatar-list avatar-list-stacked m-0">
                                                          <img class="avatar rounded-circle small-avt" src="assets/images/xs/avatar2.jpg" alt="">
                                                          <img class="avatar rounded-circle small-avt" src="assets/images/xs/avatar1.jpg" alt="">
                                                      </div>
                                                      <span class="badge bg-warning text-end mt-2">MEDIUM</span>
                                                  </div>
                                              </div>
                                              <p class="py-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id
                                                  nec scelerisque massa.</p>
                                              <div class="tikit-info row g-3 align-items-center">
                                                  <div class="col-sm">
                                                      <ul class="d-flex list-unstyled align-items-center flex-wrap">
                                                          <li class="me-2">
                                                              <div class="d-flex align-items-center">
                                                                  <i class="icofont-flag"></i>
                                                                  <span class="ms-1">17 Mar</span>
                                                              </div>
                                                          </li>
                                                          <li class="me-2">
                                                              <div class="d-flex align-items-center">

                                                                      <i class="icofont-ui-text-chat"></i>
                                                                      <span class="ms-1">15</span>

                                                              </div>
                                                          </li>
                                                          <li>
                                                              <div class="d-flex align-items-center">
                                                                  <i class="icofont-paper-clip"></i>
                                                                  <span class="ms-1">1</span>
                                                              </div>
                                                          </li>
                                                      </ul>
                                                  </div>
                                                  <div class="col-sm text-end">

                                                      <div class="small text-truncate light-danger-bg py-1 px-2 rounded-1 d-inline-block fw-bold small"> Box of Crayons </div>
                                                  </div>
                                              </div>
                                          </div>

                                      </li>
                                      <li class="dd-item" data-id="4">
                                          <div class="dd-handle">
                                              <div class="pages-info d-flex align-items-center justify-content-between">
                                                  <h6 class="light-orange-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">Development
                                                  </h6>
                                                  <div class="pages-priority d-flex flex-column align-items-center justify-content-center">
                                                      <div class="avatar-list avatar-list-stacked m-0">
                                                          <img class="avatar rounded-circle small-avt" src="assets/images/xs/avatar6.jpg" alt="">
                                                          <img class="avatar rounded-circle small-avt" src="assets/images/xs/avatar5.jpg" alt="">
                                                      </div>
                                                      <span class="badge bg-warning text-end mt-2">MEDIUM</span>
                                                  </div>
                                              </div>
                                              <p class="py-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id
                                                  nec scelerisque massa.</p>
                                              <div class="tikit-info row g-3 align-items-center">
                                                  <div class="col-sm">
                                                      <ul class="d-flex list-unstyled align-items-center flex-wrap">
                                                          <li class="me-2">
                                                              <div class="d-flex align-items-center">
                                                                  <i class="icofont-flag"></i>
                                                                  <span class="ms-1">28 Nov</span>
                                                              </div>
                                                          </li>
                                                          <li class="me-2">
                                                              <div class="d-flex align-items-center">

                                                                      <i class="icofont-ui-text-chat"></i>
                                                                      <span class="ms-1">45</span>

                                                              </div>
                                                          </li>
                                                          <li>
                                                              <div class="d-flex align-items-center">
                                                                  <i class="icofont-paper-clip"></i>
                                                                  <span class="ms-1">1</span>
                                                              </div>
                                                          </li>
                                                      </ul>
                                                  </div>
                                                  <div class="col-sm text-end">

                                                      <div class="small text-truncate light-danger-bg py-1 px-2 rounded-1 d-inline-block fw-bold small"> Gob Geeklords </div>
                                                  </div>
                                              </div>
                                          </div>

                                      </li>
                                  </ol>
                              </div>
                          </div>
                      </div> */}
                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-4 mt-sm-4 mt-4">
                    <h6 className="fw-bold py-3 mb-0">To do</h6>
                    <div className="progress_task">
                        <div className="dd" data-plugin="nestable">
                            <ol className="dd-list">

                                {tasks.map(task => (


                                    <li className="dd-item" key={task._id} data-id={1}>
                                        <div className="dd-handle">
                                            <div
                                                className="task-info d-flex align-items-center justify-content-between">
                                                <h6 className="light-info-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
                                                    {task.category}
                                                </h6>
                                                <div
                                                    className="task-priority d-flex flex-column align-items-center justify-content-center">
                                                    <div className="avatar-list avatar-list-stacked m-0">
                                                        <img
                                                            className="avatar rounded-circle small-avt"
                                                            src="assets/images/xs/avatar2.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            className="avatar rounded-circle small-avt"
                                                            src="assets/images/xs/avatar1.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <span className="badge bg-success text-end mt-2">
                                                                                {task.priority}
                                                                            </span>
                                                </div>
                                            </div>
                                            <p className="py-2 mb-0">
                                                {task.description}
                                            </p>
                                            <div className="tikit-info row g-3 align-items-center">
                                                <div className="col-sm">
                                                    <ul className="d-flex list-unstyled align-items-center flex-wrap">
                                                        <li className="me-2">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-flag"/>
                                                                <span className="ms-1">{task.creationDate}</span>
                                                            </div>
                                                        </li>
                                                        <li className="me-2">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-1">5</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-1">5</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm text-end">
                                                    <div
                                                        className="small text-truncate light-danger-bg py-1 px-2 rounded-1 d-inline-block fw-bold small">
                                                        {" "}
                                                        Box of Crayons{" "}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                ))}


                            </ol>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-0 mt-sm-0 mt-0">
                    <h6 className="fw-bold py-3 mb-0">In Progres</h6>
                    <div className="review_task">
                        <div className="dd" data-plugin="nestable">
                            <ol className="dd-list">
                                <li className="dd-item" data-id={1}>
                                    <div className="dd-handle">
                                        <div className="task-info d-flex align-items-center justify-content-between">
                                            <h6 className="light-info-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
                                                UI/UX Design
                                            </h6>
                                            <div
                                                className="task-priority d-flex flex-column align-items-center justify-content-center">
                                                <div className="avatar-list avatar-list-stacked m-0">
                                                    <img
                                                        className="avatar rounded-circle small-avt"
                                                        src="../../../../public/assets/images/xs/avatar3.jpg"
                                                        alt=""
                                                    />
                                                    <img
                                                        className="avatar rounded-circle small-avt"
                                                        src="../../../../public/assets/images/xs/avatar1.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <span className="badge bg-warning text-end mt-2">
                                                                                MEDIUM
                                                                            </span>
                                            </div>
                                        </div>
                                        <p className="py-2 mb-0">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing
                                            elit. In id nec scelerisque massa.
                                        </p>
                                        <div className="tikit-info row g-3 align-items-center">
                                            <div className="col-sm">
                                                <ul className="d-flex list-unstyled align-items-center flex-wrap">
                                                    <li className="me-2">
                                                        <div className="d-flex align-items-center">
                                                            <i className="icofont-flag"/>
                                                            <span className="ms-1">03 Apr</span>
                                                        </div>
                                                    </li>
                                                    <li className="me-2">
                                                        <div className="d-flex align-items-center">
                                                            <i className="icofont-ui-text-chat"/>
                                                            <span className="ms-1">7</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="d-flex align-items-center">
                                                            <i className="icofont-paper-clip"/>
                                                            <span className="ms-1">2</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-sm text-end">
                                                <div
                                                    className="small text-truncate light-danger-bg py-1 px-2 rounded-1 d-inline-block fw-bold small">
                                                    {" "}
                                                    Social Geek Made{" "}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                            </ol>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-0 mt-sm-0 mt-0">
                    <h6 className="fw-bold py-3 mb-0">done</h6>
                    <div className="completed_task">
                        <div className="dd" data-plugin="nestable">
                            <ol className="dd-list">
                                <li className="dd-item" data-id={1}>
                                    <div className="dd-handle">
                                        <div className="task-info d-flex align-items-center justify-content-between">
                                            <h6 className="light-info-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
                                                UI/UX Design
                                            </h6>
                                            <div
                                                className="task-priority d-flex flex-column align-items-center justify-content-center">
                                                <div className="avatar-list avatar-list-stacked m-0">
                                                    <img
                                                        className="avatar rounded-circle small-avt"
                                                        src="../../../../public/assets/images/xs/avatar6.jpg"
                                                        alt=""
                                                    />
                                                    <img
                                                        className="avatar rounded-circle small-avt"
                                                        src="../../../../public/assets/images/xs/avatar7.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <span className="badge bg-warning text-end mt-2">
                                                                                MEDIUM
                                                                            </span>
                                            </div>
                                        </div>
                                        <p className="py-2 mb-0">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing
                                            elit. In id nec scelerisque massa.
                                        </p>
                                        <div className="tikit-info row g-3 align-items-center">
                                            <div className="col-sm">
                                                <ul className="d-flex list-unstyled align-items-center flex-wrap">
                                                    <li className="me-2">
                                                        <div className="d-flex align-items-center">
                                                            <i className="icofont-flag"/>
                                                            <span className="ms-1">13 Jan</span>
                                                        </div>
                                                    </li>
                                                    <li className="me-2">
                                                        <div className="d-flex align-items-center">
                                                            <i className="icofont-ui-text-chat"/>
                                                            <span className="ms-1">4</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="d-flex align-items-center">
                                                            <i className="icofont-paper-clip"/>
                                                            <span className="ms-1">1</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-sm text-end">
                                                <div
                                                    className="small text-truncate light-danger-bg py-1 px-2 rounded-1 d-inline-block fw-bold small">
                                                    {" "}
                                                    Social Geek Made{" "}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="dd-item" data-id={2}>
                                    <div className="dd-handle">
                                        <div className="task-info d-flex align-items-center justify-content-between">
                                            <h6 className="light-info-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
                                                UI/UX Design
                                            </h6>
                                            <div
                                                className="task-priority d-flex flex-column align-items-center justify-content-center">
                                                <div className="avatar-list avatar-list-stacked m-0">
                                                    <img
                                                        className="avatar rounded-circle small-avt"
                                                        src="../../../../public/assets/images/xs/avatar2.jpg"
                                                        alt=""
                                                    />
                                                    <img
                                                        className="avatar rounded-circle small-avt"
                                                        src="../../../../public/assets/images/xs/avatar8.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <span className="badge bg-warning text-end mt-2">
                                                                                MEDIUM
                                                                            </span>
                                            </div>
                                        </div>
                                        <p className="py-2 mb-0">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing
                                            elit. In id nec scelerisque massa.
                                        </p>
                                        <div className="tikit-info row g-3 align-items-center">
                                            <div className="col-sm">
                                                <ul className="d-flex list-unstyled align-items-center flex-wrap">
                                                    <li className="me-2">
                                                        <div className="d-flex align-items-center">
                                                            <i className="icofont-flag"/>
                                                            <span className="ms-1">02 Feb</span>
                                                        </div>
                                                    </li>
                                                    <li className="me-2">
                                                        <div className="d-flex align-items-center">
                                                            <i className="icofont-ui-text-chat"/>
                                                            <span className="ms-1">1</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="d-flex align-items-center">
                                                            <i className="icofont-paper-clip"/>
                                                            <span className="ms-1">5</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-sm text-end">
                                                <div
                                                    className="small text-truncate light-danger-bg py-1 px-2 rounded-1 d-inline-block fw-bold small">
                                                    {" "}
                                                    Social Geek Made{" "}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                            </ol>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}