import { Form, Button, Col, Row } from "react-bootstrap";
import Employee from "../model/Employee";
import ErrorBox from "./ErrorBox";
import { useEffect, useRef, useState } from "react";
import Program from "../model/Program";
import FunctionalArea from "../model/FunctionalArea";
import Team from "../model/Team";

interface PropsAdminPage {
  baseUrl: string;
  csrfToken: string;
}

const AdminPage = ({ baseUrl, csrfToken }: PropsAdminPage) => {
  useEffect(() => {
    document.title = "Bughound - Admin Page";
  }, []);

  //error message
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleErrorMessageClose = () => {
    setErrorMessage("");
  };

  //dict to query params
  const queryParams = (dict: any) => {
    return new URLSearchParams({
      ...Object.entries(dict).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, string>),
    });
  };

  const getDataFromBackend = async (
    option: number,
    id?: number,
    dict?: any
  ) => {
    try {
      let url = "";
      let errorMessage = "";

      if (option === 1) {
        //get employee
        url = `${baseUrl}/get/employee/id?employeeId=${id}`;
        errorMessage = "Failed to fetch employee";
      } else if (option === 2) {
        //delete employee
        url = `${baseUrl}/delete/employee?employeeId=${id}`;
        errorMessage = "Failed to delete employee";
      } else if (option === 3) {
        //save employee
        url = `${baseUrl}/save/employee?${queryParams(dict).toString()}`;
        errorMessage = "Failed to save employee";
      } else if (option === 4) {
        //get program
        url = `${baseUrl}/get/program/id?programId=${id}`;
        errorMessage = "Failed to fetch program";
      } else if (option === 5) {
        //delete program
        url = `${baseUrl}/delete/program?programId=${id}`;
        errorMessage = "Failed to delete program";
      } else if (option === 6) {
        //save program
        url = `${baseUrl}/save/program?${queryParams(dict).toString()}`;
        errorMessage = "Failed to save program";
      } else if (option === 7) {
        //get functional area
        url = `${baseUrl}/get/functionalarea/id?functionalAreaId=${id}`;
        errorMessage = "Failed to fetch functional area";
      } else if (option === 8) {
        //delete functional area
        url = `${baseUrl}/delete/functionalarea?functionalAreaId=${id}`;
        errorMessage = "Failed to delete functional area";
      } else if (option === 9) {
        //save functional area
        url = `${baseUrl}/save/functionalarea?${queryParams(dict).toString()}`;
        errorMessage = "Failed to save functional area";
      } else if (option === 10) {
        //get team
        url = `${baseUrl}/get/team/id?teamId=${id}`;
        errorMessage = "Failed to fetch team";
      } else if (option === 11) {
        //delete team
        url = `${baseUrl}/delete/team?teamId=${id}`;
        errorMessage = "Failed to delete team";
      } else if (option === 12) {
        //save team
        url = `${baseUrl}/save/team?${queryParams(dict).toString()}`;
        errorMessage = "Failed to save team";
      } else if (option === 13) {
        //delete bug
        url = `${baseUrl}/delete/bug?problemReportNumber=${id}`;
        errorMessage = "Failed to delete bug";
      } else if (option === 14) {
        //delete attachment
        url = `${baseUrl}/delete/attachment?attachmentId=${id}`;
        errorMessage = "Failed to delete attachment";
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(errorMessage);
      }

      const data = await response.text();

      if (option === 1) {
        if (data.length === 0) {
          setErrorMessage("No employee found");
          return;
        }
        setErrorMessage("");
        setEmployeeFields(JSON.parse(data));
      } else if (option === 2 || option === 3) {
        if (formEmployeeRef1.current) {
          formEmployeeRef1.current.reset();
        }
        if (formEmployeeRef2.current) {
          formEmployeeRef2.current.reset();
        }
      } else if (option === 4) {
        if (data.length === 0) {
          setErrorMessage("No program found");
          return;
        }
        setErrorMessage("");
        setProgramFields(JSON.parse(data));
      } else if (option === 5 || option === 6) {
        if (formProgramRef1.current) {
          formProgramRef1.current.reset();
        }
        if (formProgramRef2.current) {
          formProgramRef2.current.reset();
        }
      } else if (option === 7) {
        if (data.length === 0) {
          setErrorMessage("No functional area found");
          return;
        }
        setErrorMessage("");
        setFunctionalAreaFields(JSON.parse(data));
      } else if (option === 8 || option === 9) {
        if (formFunctionalAreaRef1.current) {
          formFunctionalAreaRef1.current.reset();
        }
        if (formFunctionalAreaRef2.current) {
          formFunctionalAreaRef2.current.reset();
        }
      } else if (option === 10) {
        if (data.length === 0) {
          setErrorMessage("No team found");
          return;
        }
        setErrorMessage("");
        setTeamFields(JSON.parse(data));
      } else if (option === 11 || option === 12) {
        if (formTeamRef1.current) {
          formTeamRef1.current.reset();
        }
        if (formTeamRef2.current) {
          formTeamRef2.current.reset();
        }
      } else if (option === 13) {
        if (formBugRef.current) {
          formBugRef.current.reset();
        }
      } else if (option === 14) {
        if (formAttachmentRef.current) {
          formAttachmentRef.current.reset();
        }
      }
    } catch (error) {
      const errorMessageString =
        error instanceof Error ? error.message : String(error);
      setErrorMessage(errorMessageString);
    }
  };

  //get employee by Id
  const getEmployeeById = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    getDataFromBackend(1, event.currentTarget.employeeId.value);
  };

  //get program by Id
  const getProgramById = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    getDataFromBackend(4, event.currentTarget.programId.value);
  };

  //get functional area by Id
  const getFunctionalAreaById = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    getDataFromBackend(7, event.currentTarget.functionalAreaId.value);
  };

  //get team by Id
  const getTeamById = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    getDataFromBackend(10, event.currentTarget.teamId.value);
  };

  const employeeInputIdRef = useRef<HTMLInputElement | null>(null);
  const formEmployeeRef1 = useRef<HTMLFormElement | null>(null);
  const formEmployeeRef2 = useRef<HTMLFormElement | null>(null);
  //delete employee
  const handelEmployeeDelete = () => {
    const confirmation = window.confirm(
      "Deleting an employee will delete associated bug reports and their attachments\n" +
        "Are you sure you want to delete?"
    );
    if (confirmation) {
      if (employeeInputIdRef.current?.value) {
        const id = parseInt(employeeInputIdRef.current.value, 10);
        if (!isNaN(id)) {
          setErrorMessage("");
          getDataFromBackend(2, id);
        } else {
          setErrorMessage("Invalid input for employee ID");
        }
      }
    }
  };

  const programInputIdRef = useRef<HTMLInputElement | null>(null);
  const formProgramRef1 = useRef<HTMLFormElement | null>(null);
  const formProgramRef2 = useRef<HTMLFormElement | null>(null);
  //delete program
  const handelProgramDelete = () => {
    const confirmation = window.confirm(
      "Deleting a program will delete associated bug reports and their attachments\n" +
        "Are you sure you want to delete?"
    );
    if (confirmation) {
      if (programInputIdRef.current?.value) {
        const id = parseInt(programInputIdRef.current.value, 10);
        if (!isNaN(id)) {
          setErrorMessage("");
          getDataFromBackend(5, id);
        } else {
          setErrorMessage("Invalid input for program ID");
        }
      }
    }
  };

  const functionalAreaInputIdRef = useRef<HTMLInputElement | null>(null);
  const formFunctionalAreaRef1 = useRef<HTMLFormElement | null>(null);
  const formFunctionalAreaRef2 = useRef<HTMLFormElement | null>(null);
  //delete functional area
  const handelFunctionalAreaDelete = () => {
    const confirmation = window.confirm(
      "Deleting a functional area will delete associated bug reports and their attachments\n" +
        "Are you sure you want to delete?"
    );
    if (confirmation) {
      if (functionalAreaInputIdRef.current?.value) {
        const id = parseInt(functionalAreaInputIdRef.current.value, 10);
        if (!isNaN(id)) {
          setErrorMessage("");
          getDataFromBackend(8, id);
        } else {
          setErrorMessage("Invalid input for functional area ID");
        }
      }
    }
  };

  const teamInputIdRef = useRef<HTMLInputElement | null>(null);
  const formTeamRef1 = useRef<HTMLFormElement | null>(null);
  const formTeamRef2 = useRef<HTMLFormElement | null>(null);
  //delete team
  const handelTeamDelete = () => {
    const confirmation = window.confirm(
      "Deleting a team will delete associated employees, bug reports and their attachments\n" +
        "Are you sure you want to delete?"
    );
    if (confirmation) {
      if (teamInputIdRef.current?.value) {
        const id = parseInt(teamInputIdRef.current.value, 10);
        if (!isNaN(id)) {
          setErrorMessage("");
          getDataFromBackend(11, id);
        } else {
          setErrorMessage("Invalid input for team ID");
        }
      }
    }
  };

  const formBugRef = useRef<HTMLFormElement | null>(null);
  //delete bug report
  const deleteBugId = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    const confirmation = window.confirm(
      "Deleting a bug report will delete its attachments\n" +
        "Are you sure you want to delete?"
    );
    if (confirmation) {
      getDataFromBackend(13, event.currentTarget.problemReportNumber.value);
    }
  };

  const formAttachmentRef = useRef<HTMLFormElement | null>(null);
  //delete attachment
  const deleteAttachmentId = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    const confirmation = window.confirm(
      "Deleting an attachment \nAre you sure you want to delete?"
    );
    if (confirmation) {
      getDataFromBackend(14, event.currentTarget.attachmentId.value);
    }
  };

  //employee fields
  const teamNameRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const designationRef = useRef<HTMLInputElement | null>(null);
  const roleRef = useRef<HTMLSelectElement | null>(null);
  const employeeIdRef = useRef<HTMLInputElement | null>(null);

  //program fields
  const programNameRef = useRef<HTMLInputElement | null>(null);
  const programIdRef = useRef<HTMLInputElement | null>(null);

  //functional area fields
  const functionalAreaNameRef = useRef<HTMLInputElement | null>(null);
  const functionalAreaIdRef = useRef<HTMLInputElement | null>(null);

  //team fields
  const teamNameRef2 = useRef<HTMLInputElement | null>(null);
  const teamIdRef = useRef<HTMLInputElement | null>(null);

  //set employee fields
  const setEmployeeFields = (employee: Employee) => {
    teamNameRef.current!.value = employee.teamName || "";
    nameRef.current!.value = employee.name || "";
    usernameRef.current!.value = employee.username || "";
    passwordRef.current!.value = employee.password || "";
    designationRef.current!.value = employee.designation || "";
    roleRef.current!.value = employee.role || "";
    employeeIdRef.current!.value = employee.employeeId?.toString() ?? "";
  };

  //set program fields
  const setProgramFields = (program: Program) => {
    programNameRef.current!.value = program.programName || "";
    programIdRef.current!.value = program.programId?.toString() ?? "";
  };

  //set functional area fields
  const setFunctionalAreaFields = (functionalArea: FunctionalArea) => {
    functionalAreaNameRef.current!.value = functionalArea.areaName || "";
    functionalAreaIdRef.current!.value =
      functionalArea.functionalAreaId?.toString() ?? "";
  };

  //set team fields
  const setTeamFields = (team: Team) => {
    teamNameRef2.current!.value = team.teamName || "";
    teamIdRef.current!.value = team.teamId?.toString() ?? "";
  };

  // handle employee submit
  const handleEmployeeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    const employeeId = parseInt(employeeIdRef.current!.value, 10);
    const employeeForm: Employee = {
      employeeId: isNaN(employeeId) ? undefined : employeeId,
      teamName: teamNameRef.current!.value,
      name: nameRef.current!.value,
      username: usernameRef.current!.value,
      password: passwordRef.current!.value,
      designation: designationRef.current!.value,
      role: roleRef.current!.value,
    };

    getDataFromBackend(3, undefined, employeeForm);
  };

  // handle program submit
  const handleProgramSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    const programId = parseInt(programIdRef.current!.value, 10);
    const programForm: Program = {
      programId: isNaN(programId) ? undefined : programId,
      programName: programNameRef.current!.value,
    };

    getDataFromBackend(6, undefined, programForm);
  };

  // handle functional area submit
  const handleFunctionalAreaSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setErrorMessage("");
    const functionalAreaId = parseInt(functionalAreaIdRef.current!.value, 10);
    const functionalAreaForm: FunctionalArea = {
      functionalAreaId: isNaN(functionalAreaId) ? undefined : functionalAreaId,
      areaName: functionalAreaNameRef.current!.value,
    };

    getDataFromBackend(9, undefined, functionalAreaForm);
  };

  // handle team submit
  const handleTeamSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    const teamId = parseInt(teamIdRef.current!.value, 10);
    const teamForm: Team = {
      teamId: isNaN(teamId) ? undefined : teamId,
      teamName: teamNameRef2.current!.value,
    };

    getDataFromBackend(12, undefined, teamForm);
  };

  return (
    <div style={{ display: "flex", paddingTop: "56px", overflow: "hidden" }}>
      <div
        style={{
          width: "100%",
          maxHeight: "calc(100vh - 56px)",
          padding: "24px",
          overflow: "auto",
        }}
      >
        <h4>Admin Edits</h4>
        <div
          style={{
            position: "fixed",
            top: "60px",
            right: "20px",
            zIndex: "999",
          }}
        >
          {errorMessage && (
            <ErrorBox
              errorMessage={errorMessage}
              handleErrorMessageClose={handleErrorMessageClose}
            />
          )}
        </div>

        <h5 className="mt-4">Employee</h5>
        <Row>
          <Form
            className="mt-2 mb-4"
            autoComplete="off"
            onSubmit={getEmployeeById}
            ref={formEmployeeRef1}
          >
            <Row className="align-items-end">
              <Col style={{ flex: 0.2 }}>
                <Form.Group controlId="employeeId">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Employee Id
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Employee Id"
                    autoComplete="off"
                    pattern="[0-9]*"
                    title="Please enter only numbers"
                    ref={employeeInputIdRef}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  type="reset"
                  size="sm"
                  style={{ marginRight: "20px" }}
                >
                  Clear
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  size="sm"
                  style={{ marginRight: "60px" }}
                >
                  Get
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  title="Deleting an employee will delete associated bug reports and their attachments."
                  onClick={handelEmployeeDelete}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
        <Row>
          <Form
            className="mt-2 mb-4"
            autoComplete="off"
            ref={formEmployeeRef2}
            onSubmit={handleEmployeeSubmit}
          >
            <Row className="align-items-end">
              <Col style={{ flex: 0.2 }}>
                <Form.Group controlId="teamName">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Team Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Team Name"
                    autoComplete="off"
                    ref={teamNameRef}
                  />
                </Form.Group>
              </Col>
              <Col style={{ flex: 0.2 }}>
                <Form.Group controlId="name">
                  <Form.Label style={{ fontWeight: "500" }}>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    autoComplete="off"
                    ref={nameRef}
                  />
                </Form.Group>
              </Col>
              <Col style={{ flex: 0.2 }}>
                <Form.Group controlId="username">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    autoComplete="off"
                    ref={usernameRef}
                    required
                  />
                </Form.Group>
              </Col>
              <Col style={{ flex: 0.4 }}>
                <Form.Group controlId="password">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Password
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Password (bcrypt)"
                    autoComplete="off"
                    ref={passwordRef}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3 align-items-end">
              <Col style={{ flex: 0.2 }}>
                <Form.Group controlId="role">
                  <Form.Label style={{ fontWeight: "500" }}>Role</Form.Label>
                  <Form.Control
                    as="select"
                    autoComplete="off"
                    ref={roleRef}
                    required
                  >
                    <option value="ROLE_USER">ROLE_USER</option>
                    <option value="ROLE_MANAGER">ROLE_MANAGER</option>
                    <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col style={{ flex: 0.2 }}>
                <Form.Group controlId="designation">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Designation
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Designation"
                    autoComplete="off"
                    ref={designationRef}
                  />
                </Form.Group>
              </Col>
              <Col style={{ flex: 0.2 }}>
                <Form.Group controlId="employeeId">
                  <Form.Control
                    type="text"
                    placeholder="Employee Id (Read-Only)"
                    readOnly={true}
                    ref={employeeIdRef}
                  />
                </Form.Group>
              </Col>
              <Col style={{ flex: 0.4 }} className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  type="reset"
                  style={{ marginRight: "20px" }}
                >
                  Reset
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
        <hr />
        <h5 className="mt-4">Program</h5>
        <Row>
          <Form
            className="mt-2 mb-4"
            autoComplete="off"
            onSubmit={getProgramById}
            ref={formProgramRef1}
          >
            <Row className="align-items-end">
              <Col style={{ flex: 0.2 }}>
                <Form.Group controlId="programId">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Program Id
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Program Id"
                    autoComplete="off"
                    pattern="[0-9]*"
                    title="Please enter only numbers"
                    ref={programInputIdRef}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  type="reset"
                  size="sm"
                  style={{ marginRight: "20px" }}
                >
                  Clear
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  size="sm"
                  style={{ marginRight: "60px" }}
                >
                  Get
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  title="Deleting a program will delete associated bug reports and their attachments."
                  onClick={handelProgramDelete}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
        <Row>
          <Form
            className="mt-2 mb-4"
            autoComplete="off"
            ref={formProgramRef2}
            onSubmit={handleProgramSubmit}
          >
            <Row className="align-items-end">
              <Col style={{ flex: 0.4 }}>
                <Form.Group controlId="programName">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Program Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Program Name"
                    autoComplete="off"
                    ref={programNameRef}
                    required
                  />
                </Form.Group>
              </Col>
              <Col style={{ flex: 0.2 }}>
                <Form.Group controlId="programId">
                  <Form.Control
                    type="text"
                    placeholder="Program Id (Read-Only)"
                    readOnly={true}
                    ref={programIdRef}
                  />
                </Form.Group>
              </Col>
              <Col style={{ flex: 0.4 }} className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  type="reset"
                  style={{ marginRight: "20px" }}
                >
                  Reset
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
        <hr />
        <h5 className="mt-4">Functional Area</h5>
        <Row>
          <Form
            className="mt-2 mb-4"
            autoComplete="off"
            onSubmit={getFunctionalAreaById}
            ref={formFunctionalAreaRef1}
          >
            <Row className="align-items-end">
              <Col style={{ flex: 0.2 }}>
                <Form.Group controlId="functionalAreaId">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Functional Area Id
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Functional Area Id"
                    autoComplete="off"
                    pattern="[0-9]*"
                    title="Please enter only numbers"
                    ref={functionalAreaInputIdRef}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  type="reset"
                  size="sm"
                  style={{ marginRight: "20px" }}
                >
                  Clear
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  size="sm"
                  style={{ marginRight: "60px" }}
                >
                  Get
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  title="Deleting a Functional Area will delete associated bug reports and their attachments."
                  onClick={handelFunctionalAreaDelete}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
        <Row>
          <Form
            className="mt-2 mb-4"
            autoComplete="off"
            ref={formFunctionalAreaRef2}
            onSubmit={handleFunctionalAreaSubmit}
          >
            <Row className="align-items-end">
              <Col style={{ flex: 0.4 }}>
                <Form.Group controlId="areaName">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Functional Area Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Functional Area Name"
                    autoComplete="off"
                    ref={functionalAreaNameRef}
                    required
                  />
                </Form.Group>
              </Col>
              <Col style={{ flex: 0.2 }}>
                <Form.Group controlId="functionalAreaId">
                  <Form.Control
                    type="text"
                    placeholder="Functional Area Id (Read-Only)"
                    readOnly={true}
                    ref={functionalAreaIdRef}
                  />
                </Form.Group>
              </Col>
              <Col style={{ flex: 0.4 }} className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  type="reset"
                  style={{ marginRight: "20px" }}
                >
                  Reset
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
        <hr />
        <h5 className="mt-4">Team</h5>
        <Row>
          <Form
            className="mt-2 mb-4"
            autoComplete="off"
            onSubmit={getTeamById}
            ref={formTeamRef1}
          >
            <Row className="align-items-end">
              <Col style={{ flex: 0.2 }}>
                <Form.Group controlId="teamId">
                  <Form.Label style={{ fontWeight: "500" }}>Team Id</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Team Id"
                    autoComplete="off"
                    pattern="[0-9]*"
                    title="Please enter only numbers"
                    ref={teamInputIdRef}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  type="reset"
                  size="sm"
                  style={{ marginRight: "20px" }}
                >
                  Clear
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  size="sm"
                  style={{ marginRight: "60px" }}
                >
                  Get
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  title="Deleting a Team will delete associated employees, bug reports and their attachments."
                  onClick={handelTeamDelete}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
        <Row>
          <Form
            className="mt-2 mb-4"
            autoComplete="off"
            ref={formTeamRef2}
            onSubmit={handleTeamSubmit}
          >
            <Row className="align-items-end">
              <Col style={{ flex: 0.4 }}>
                <Form.Group controlId="teamName">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Team Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Team Name"
                    autoComplete="off"
                    ref={teamNameRef2}
                    required
                  />
                </Form.Group>
              </Col>
              <Col style={{ flex: 0.2 }}>
                <Form.Group controlId="teamId">
                  <Form.Control
                    type="text"
                    placeholder="Team Id (Read-Only)"
                    readOnly={true}
                    ref={teamIdRef}
                  />
                </Form.Group>
              </Col>
              <Col style={{ flex: 0.4 }} className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  type="reset"
                  style={{ marginRight: "20px" }}
                >
                  Reset
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
        <hr />
        <h5 className="mt-4">Bug Report</h5>
        <Row>
          <Form
            className="mt-2 mb-4"
            autoComplete="off"
            onSubmit={deleteBugId}
            ref={formBugRef}
          >
            <Row className="align-items-end">
              <Col style={{ flex: 0.4 }}>
                <Form.Group controlId="problemReportNumber">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Problem Report Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Problem Report Number"
                    autoComplete="off"
                    pattern="[0-9]*"
                    title="Please enter only numbers"
                    required
                  />
                </Form.Group>
              </Col>
              <Col style={{ flex: 0.6 }}>
                <Button
                  variant="secondary"
                  type="reset"
                  size="sm"
                  style={{ marginRight: "50px" }}
                >
                  Clear
                </Button>
                <Button
                  variant="danger"
                  type="submit"
                  size="sm"
                  title="Deleting a bug report will delete its attachments"
                  style={{ marginRight: "60px" }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
        <hr />
        <h5 className="mt-4">Attachment</h5>
        <Row>
          <Form
            className="mt-2 mb-4"
            autoComplete="off"
            onSubmit={deleteAttachmentId}
            ref={formAttachmentRef}
          >
            <Row className="align-items-end">
              <Col style={{ flex: 0.4 }}>
                <Form.Group controlId="attachmentId">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Attachment Id
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Attachment Id"
                    autoComplete="off"
                    pattern="[0-9]*"
                    title="Please enter only numbers"
                    required
                  />
                </Form.Group>
              </Col>
              <Col style={{ flex: 0.6 }}>
                <Button
                  variant="secondary"
                  type="reset"
                  size="sm"
                  style={{ marginRight: "50px" }}
                >
                  Clear
                </Button>
                <Button
                  variant="danger"
                  type="submit"
                  size="sm"
                  title="Delete an attachment."
                  style={{ marginRight: "60px" }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </div>
    </div>
  );
};

export default AdminPage;
