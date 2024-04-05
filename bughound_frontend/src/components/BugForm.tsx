import { Form, Button, Col, Row, Dropdown } from "react-bootstrap";
import Employee from "../model/Employee";
import { useLocation } from "react-router-dom";
import Bug from "../model/Bug";
import { useEffect, useRef, useState } from "react";
import ErrorBox from "./ErrorBox";
import Attachment from "../model/Attachment";
import { FaDownload, FaTrash } from "react-icons/fa";

interface PropsCreateBug {
  baseUrl: string;
  csrfToken: string;
  user: Employee;
}

const BugForm = ({ baseUrl, csrfToken, user }: PropsCreateBug) => {
  const TIME_OUT = 200;

  // bug data from router if present
  let bug: Bug | null = null;
  const state = useLocation();
  const item = state["state"];
  if (item !== null) {
    bug = item["item"] as Bug;
  }

  //role based form edit
  const [disabled, setDisabled] = useState<boolean>(false);

  //suggestion list
  const [suggestionList, setSuggestionList] = useState<any[]>([]);

  //error message
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleErrorMessageClose = () => {
    setErrorMessage("");
  };

  //program name
  const [isFocusedProgram, setIsFocusedProgram] = useState<boolean>(false);
  const programRef = useRef<HTMLInputElement | null>(null);

  //reported by
  const [isFocusedReportedBy, setIsFocusedReportedBy] =
    useState<boolean>(false);
  const reportedByRef = useRef<HTMLInputElement | null>(null);

  //Functional Area
  const [isFocusedFunctionalArea, setIsFocusedFunctionalArea] =
    useState<boolean>(false);
  const functionalAreaRef = useRef<HTMLInputElement | null>(null);

  //Assigned To Emoployee
  const [isFocusedAssignedToEmployee, setIsFocusedAssignedToEmployee] =
    useState<boolean>(false);
  const assignedToEmployeeRef = useRef<HTMLInputElement | null>(null);

  //Assigned To Team
  const [isFocusedAssignedToTeam, setIsFocusedAssignedToTeam] =
    useState<boolean>(false);
  const assignedToTeamRef = useRef<HTMLInputElement | null>(null);

  //Resolved By
  const [isFocusedResolvedBy, setIsFocusedResolvedBy] =
    useState<boolean>(false);
  const resolvedByRef = useRef<HTMLInputElement | null>(null);

  //Resolution Test By
  const [isFocusedResolutionTestedBy, setIsFocusedResolutionTestedBy] =
    useState<boolean>(false);
  const resolutionTestedByRef = useRef<HTMLInputElement | null>(null);

  //on key up
  const handleSuggestion = (option: number) => {
    let value = "";

    if (option === 1) {
      //program
      value = programRef.current?.value.trim() ?? "";
    } else if (option === 2) {
      //reported by
      value = reportedByRef.current?.value.trim() ?? "";
    } else if (option === 3) {
      //functional area
      value = functionalAreaRef.current?.value.trim() ?? "";
    } else if (option === 4) {
      //assigned to employee
      value = assignedToEmployeeRef.current?.value.trim() ?? "";
    } else if (option === 5) {
      //assigned to team
      value = assignedToTeamRef.current?.value.trim() ?? "";
    } else if (option === 6) {
      //resolved by
      value = resolvedByRef.current?.value.trim() ?? "";
    } else if (option === 7) {
      //resolution test by
      value = resolutionTestedByRef.current?.value.trim() ?? "";
    }

    getDataFromBackend(option, value);
  };

  //on suggestion/option select
  const handleSuggestionSelect = (option: number, name: string) => {
    if (option === 1) {
      if (programRef.current) {
        programRef.current.value = name ?? "";
      }
      setIsFocusedProgram(false);
    } else if (option === 2) {
      if (reportedByRef.current) {
        reportedByRef.current.value = name ?? "";
      }
      setIsFocusedReportedBy(false);
    } else if (option === 3) {
      if (functionalAreaRef.current) {
        functionalAreaRef.current.value = name ?? "";
      }
      setIsFocusedFunctionalArea(false);
    } else if (option === 4) {
      if (assignedToEmployeeRef.current) {
        assignedToEmployeeRef.current.value = name ?? "";
      }
      setIsFocusedAssignedToEmployee(false);
    } else if (option === 5) {
      if (assignedToTeamRef.current) {
        assignedToTeamRef.current.value = name ?? "";
      }
      setIsFocusedAssignedToTeam(false);
    } else if (option === 6) {
      if (resolvedByRef.current) {
        resolvedByRef.current.value = name ?? "";
      }
      setIsFocusedResolvedBy(false);
    } else if (option === 7) {
      if (resolutionTestedByRef.current) {
        resolutionTestedByRef.current.value = name ?? "";
      }
      setIsFocusedResolutionTestedBy(false);
    }

    setSuggestionList([]);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //download files
  const downloadFile = (blob: Blob, fileName: string) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  //get data from backend based on options
  const getDataFromBackend = async (
    option: number,
    suggestionQuery?: string,
    bug?: Bug,
    attachment?: Attachment,
    formData?: FormData,
    noContentType: boolean = false
  ) => {
    try {
      let url = "";
      let errorMessage = "";

      if (option === 1) {
        //search programs
        url = `${baseUrl}/get/search/programs?query=${suggestionQuery}`;
        errorMessage = "Failed to fetch list of programs";
      } else if (option === 2 || option === 4 || option === 6 || option === 7) {
        //search employee
        url = `${baseUrl}/get/search/employee?query=${suggestionQuery}`;
        errorMessage = "Failed to fetch list of employees";
      } else if (option === 3) {
        //search functional areas
        url = `${baseUrl}/get/search/functionalarea?query=${suggestionQuery}`;
        errorMessage = "Failed to fetch list of functional areas";
      } else if (option === 5) {
        //search teams
        url = `${baseUrl}/get/search/team?query=${suggestionQuery}`;
        errorMessage = "Failed to fetch list of teams";
      } else if (option === 8) {
        //get attachments
        url = `${baseUrl}/get/attachments?problemReportNumber=${
          bug?.problemReportNumber ?? 0
        }`;
        errorMessage = "Failed to fetch list of attachments";
      } else if (option === 9) {
        //download attachment
        url = `${baseUrl}/download/attachment?attachmentId=${
          attachment?.attachmentId ?? 0
        }&problemReportNumber=${attachment?.problemReportNumber ?? 0}`;
        errorMessage = "Failed to download attachment";
      } else if (option === 10) {
        //delete file
        url = `${baseUrl}/delete/attachment?attachmentId=${
          attachment?.attachmentId ?? 0
        }`;
        errorMessage = "Failed to delete attachment";
      } else if (option === 11) {
        //send bug report
        url = `${baseUrl}/create/bug`;
        errorMessage = "Failed to send bug report";
      }

      const headers: any = {
        "X-CSRF-Token": csrfToken,
      };
      if (!noContentType) {
        headers["Content-Type"] = "application/json";
      }
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: formData || null,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(errorMessage);
      }

      if (
        option === 1 ||
        option === 2 ||
        option === 3 ||
        option === 4 ||
        option === 5 ||
        option === 6 ||
        option === 7
      ) {
        const data = await response.json();
        data === null ? setSuggestionList([]) : setSuggestionList(data);
      } else if (option === 8) {
        const data = await response.json();
        data === null ? setAttachments([]) : setAttachments(data);
      } else if (option === 9) {
        const blob = await response.blob();
        downloadFile(blob, attachment?.fileName ?? "untitled");
      } else if (option === 11) {
        history.back();
      }
    } catch (error) {
      const errorMessageString =
        error instanceof Error ? error.message : String(error);
      setErrorMessage(errorMessageString);
    }
  };

  //get Attachments and assign role based edit
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  useEffect(() => {
    document.title = "Bughound - Bug Report";

    if (bug != null) {
      getDataFromBackend(8, undefined, bug);
    }
    if (user.role === "ROLE_USER") {
      setDisabled(true);
    }
  }, []);

  //handle attachment selection when duplicate files are selected
  const handleAttachmentSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFilenames = Array.from(event.target.files || []).map(
      (file) => file.name
    );

    const existingFilenames = attachments.map(
      (attachment) => attachment.fileName || ""
    );

    const duplicateFilenames = newFilenames.filter((filename) =>
      existingFilenames.includes(filename)
    );

    if (duplicateFilenames.length > 0) {
      setErrorMessage(
        `Error: ${duplicateFilenames.join(", ")} already exists.`
      );
    } else {
      setErrorMessage("");
    }
  };

  //form submit
  const handleBugFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    // Create a new FormData object
    const formData = new FormData();

    // Append other form fields to formData
    formData.append(
      "problemReportNumber",
      bug?.problemReportNumber?.toString() ?? ""
    );
    formData.append("programName", event.currentTarget.programName.value);
    formData.append("reportType", event.currentTarget.reportType.value);
    formData.append("severity", event.currentTarget.severity.value);
    formData.append(
      "problemDescription",
      event.currentTarget.problemDescription.value
    );
    formData.append("canReproduce", event.currentTarget.canReproduce.checked);
    formData.append("problemSummary", event.currentTarget.problemSummary.value);
    formData.append("suggestedFix", event.currentTarget.suggestedFix.value);
    formData.append("reportedBy", event.currentTarget.reportedBy.value);
    formData.append("dateReported", event.currentTarget.dateReported.value);
    formData.append("functionalArea", event.currentTarget.functionalArea.value);
    formData.append(
      "assignedToEmployee",
      event.currentTarget.assignedToEmployee.value
    );
    formData.append("assignedToTeam", event.currentTarget.assignedToTeam.value);
    formData.append("comments", event.currentTarget.comments.value);
    formData.append("status", event.currentTarget.status.value);
    formData.append("priority", event.currentTarget.priority.value);
    formData.append("resolution", event.currentTarget.resolution.value);
    formData.append(
      "resolutionVersion",
      event.currentTarget.resolutionVersion.value
    );
    formData.append("resolvedBy", event.currentTarget.resolvedBy.value);
    formData.append("resolvedDate", event.currentTarget.resolvedDate.value);
    formData.append(
      "resolutionTestedBy",
      event.currentTarget.resolutionTestedBy.value
    );
    formData.append(
      "resolutionTestedDate",
      event.currentTarget.resolutionTestedDate.value
    );

    if (bug != null) {
      //delete files if any
      attachments.forEach((attachment) => {
        if (
          attachment.fileName === null &&
          attachment.attachmentContent === null
        ) {
          getDataFromBackend(10, undefined, undefined, attachment);
        }
      });
    }

    // Append attachments to formData
    const files = event.currentTarget.attachments.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }

    getDataFromBackend(11, undefined, undefined, undefined, formData, true);
  };

  //export bug report as ASCII or XML
  const handleBugReportExport = (format: string) => {
    if (bug != null) {
      if (format === "ascii") {
        const asciiContent = dictToAscii(bug, true, 0);
        const blob = new Blob([asciiContent], { type: "text/plain" });
        downloadFile(
          blob,
          `bug_report_ascii_id#${bug.problemReportNumber}.txt`
        );
      } else if (format === "xml") {
        const xmlContent = dictToXml(bug, true);
        const blob = new Blob([xmlContent], { type: "text/plain" });
        downloadFile(blob, `bug_report_xml_id#${bug.problemReportNumber}.xml`);
      }
    }
  };

  const dictToAscii = (dict: any, bugSpecificEdit = false, depth = 0) => {
    const indent = " ".repeat(depth);
    let ascii = "";

    for (const key in dict) {
      if (bugSpecificEdit && (key === "files" || key === "dateFormat")) {
        continue;
      }
      const value = dict[key];
      if (value !== undefined) {
        ascii += `${indent}${key}: ${value}\n`;
      }
    }

    if (bugSpecificEdit && attachments.length > 0) {
      ascii += `${indent}attachments: `;
      attachments.forEach((attachment) => {
        if (attachment.fileName !== null) {
          ascii += `${attachment.fileName}, `;
        }
      });
    }
    ascii += "\n";
    return ascii;
  };

  const dictToXml = (dict: any, bugSpecificEdit = false) => {
    let xml = "";
    if (bugSpecificEdit) {
      xml = "<bug>\n";
    }
    for (const key in dict) {
      if (bugSpecificEdit && (key === "files" || key === "dateFormat")) {
        continue;
      }
      const value = dict[key];
      if (value === undefined || value === null) {
        xml += `  <${key}></${key}>\n`;
      } else {
        xml += `  <${key}>${value}</${key}>\n`;
      }
    }

    if (bugSpecificEdit && attachments.length > 0) {
      xml += `  <attachments>\n`;
      attachments.forEach((attachment) => {
        if (attachment.fileName !== null) {
          xml += `    <fileName>${attachment.fileName}</fileName>\n`;
        }
      });
      xml += `  </attachments>\n`;
    }

    if (bugSpecificEdit) {
      xml += "</bug>";
    }

    return xml;
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
        <h4>
          {bug ? "Edit Bug#" + bug.problemReportNumber : "New Bug Report"}
        </h4>
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
        <Form
          className="mt-4 mb-4"
          autoComplete="off"
          onSubmit={handleBugFormSubmit}
        >
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="programName">
                <Form.Label style={{ fontWeight: "600" }}>
                  Program Name
                </Form.Label>
                <Dropdown show={isFocusedProgram}>
                  <Form.Control
                    type="text"
                    name="programName"
                    defaultValue={bug?.programName ?? ""}
                    ref={programRef}
                    onKeyUp={() => handleSuggestion(1)}
                    onFocus={() => {
                      handleSuggestion(1);
                      setIsFocusedProgram(true);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setIsFocusedProgram(false);
                        setSuggestionList([]);
                      }, TIME_OUT);
                    }}
                    autoComplete="off"
                    disabled={disabled && bug != null}
                  />
                  <Dropdown.Menu
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {suggestionList.map((program, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() =>
                          handleSuggestionSelect(1, program.programName || "")
                        }
                      >
                        {program.programName}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="reportType">
                <Form.Label style={{ fontWeight: "600" }}>
                  Report Type
                </Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={bug?.reportType ?? ""}
                  disabled={disabled && bug != null}
                >
                  <option value=""></option>
                  <option value="Coding Error">Coding Error</option>
                  <option value="Design Issue">Design Issue</option>
                  <option value="Suggestion">Suggestion</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Query">Query</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="severity">
                <Form.Label style={{ fontWeight: "600" }}>Severity</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={bug?.severity ?? ""}
                  disabled={disabled && bug != null}
                >
                  <option value=""></option>
                  <option value="Fatal">Fatal</option>
                  <option value="Serious">Serious</option>
                  <option value="Minor">Minor</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="problemDescription">
                <Form.Label style={{ fontWeight: "600" }}>
                  Problem Description
                </Form.Label>
                <Form.Control
                  type="text"
                  name="problemDescription"
                  defaultValue={bug?.problemDescription ?? ""}
                  required
                  disabled={disabled && bug != null}
                />
              </Form.Group>
            </Col>
            <Col xs="auto" className="d-flex flex-column justify-content-end">
              <Form.Group controlId="canReproduce">
                <Form.Check
                  type="checkbox"
                  label="Can Reproduce"
                  name="canReproduce"
                  defaultChecked={bug?.canReproduce ?? false}
                  disabled={disabled && bug != null}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="problemSummary">
                <Form.Label style={{ fontWeight: "600" }}>
                  Problem Summary
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="text"
                  name="problemSummary"
                  defaultValue={bug?.problemSummary ?? ""}
                  required
                  disabled={disabled && bug != null}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="suggestedFix">
                <Form.Label style={{ fontWeight: "600" }}>
                  Suggested Fix
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="suggestedFix"
                  defaultValue={bug?.suggestedFix ?? ""}
                  disabled={disabled && bug != null}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col style={{ flex: 0.3 }}>
              <Form.Group controlId="reportedBy">
                <Form.Label style={{ fontWeight: "600" }}>
                  Reported By
                </Form.Label>
                <Dropdown show={isFocusedReportedBy}>
                  <Form.Control
                    type="text"
                    name="reportedBy"
                    defaultValue={bug?.reportedBy ?? ""}
                    ref={reportedByRef}
                    onKeyUp={() => handleSuggestion(2)}
                    onFocus={() => {
                      handleSuggestion(2);
                      setIsFocusedReportedBy(true);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setIsFocusedReportedBy(false);
                        setSuggestionList([]);
                      }, TIME_OUT);
                    }}
                    autoComplete="off"
                    required
                    disabled={disabled && bug != null}
                  />
                  <Dropdown.Menu
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {suggestionList.map((employee, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() =>
                          handleSuggestionSelect(2, employee.username || "")
                        }
                      >
                        {employee.username}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Col>
            <Col style={{ flex: 0.2 }}>
              <Form.Group controlId="dateReported">
                <Form.Label style={{ fontWeight: "600" }}>
                  Date Reported
                </Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={
                    bug?.dateReported
                      ? formatDate(new Date(bug.dateReported))
                      : ""
                  }
                  disabled={disabled && bug != null}
                />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="functionalArea">
                <Form.Label style={{ fontWeight: "600" }}>
                  Functional Area
                </Form.Label>
                <Dropdown show={isFocusedFunctionalArea}>
                  <Form.Control
                    type="text"
                    name="functionalArea"
                    defaultValue={bug?.functionalArea ?? ""}
                    ref={functionalAreaRef}
                    onKeyUp={() => handleSuggestion(3)}
                    onFocus={() => {
                      handleSuggestion(3);
                      setIsFocusedFunctionalArea(true);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setIsFocusedFunctionalArea(false);
                        setSuggestionList([]);
                      }, TIME_OUT);
                    }}
                    autoComplete="off"
                    disabled={disabled}
                  />
                  <Dropdown.Menu
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {suggestionList.map((functinalArea, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() =>
                          handleSuggestionSelect(
                            3,
                            functinalArea.areaName || ""
                          )
                        }
                      >
                        {functinalArea.areaName}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="assignedToEmployee">
                <Form.Label style={{ fontWeight: "600" }}>
                  Assigned To Employee
                </Form.Label>
                <Dropdown show={isFocusedAssignedToEmployee}>
                  <Form.Control
                    type="text"
                    name="assignedToEmployee"
                    defaultValue={bug?.assignedToEmployee ?? ""}
                    ref={assignedToEmployeeRef}
                    onKeyUp={() => handleSuggestion(4)}
                    onFocus={() => {
                      handleSuggestion(4);
                      setIsFocusedAssignedToEmployee(true);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setIsFocusedAssignedToEmployee(false);
                        setSuggestionList([]);
                      }, TIME_OUT);
                    }}
                    autoComplete="off"
                    disabled={disabled}
                  />
                  <Dropdown.Menu
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {suggestionList.map((employee, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() =>
                          handleSuggestionSelect(4, employee.username || "")
                        }
                      >
                        {employee.username}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="assignedToTeam">
                <Form.Label style={{ fontWeight: "600" }}>
                  Assigned To Team
                </Form.Label>
                <Dropdown show={isFocusedAssignedToTeam}>
                  <Form.Control
                    type="text"
                    name="assignedToTeam"
                    defaultValue={bug?.assignedToTeam ?? ""}
                    ref={assignedToTeamRef}
                    onKeyUp={() => handleSuggestion(5)}
                    onFocus={() => {
                      handleSuggestion(5);
                      setIsFocusedAssignedToTeam(true);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setIsFocusedAssignedToTeam(false);
                        setSuggestionList([]);
                      }, TIME_OUT);
                    }}
                    autoComplete="off"
                    disabled={disabled}
                  />
                  <Dropdown.Menu
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {suggestionList.map((team, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() =>
                          handleSuggestionSelect(5, team.teamName || "")
                        }
                      >
                        {team.teamName}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="comments">
                <Form.Label style={{ fontWeight: "600" }}>Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="comments"
                  defaultValue={bug?.comments ?? ""}
                  disabled={disabled}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="status">
                <Form.Label style={{ fontWeight: "600" }}>Status</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={bug?.status ?? ""}
                  disabled={disabled}
                >
                  <option value=""></option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="priority">
                <Form.Label style={{ fontWeight: "600" }}>Priority</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={bug?.priority ?? ""}
                  disabled={disabled}
                >
                  <option value=""></option>
                  <option value="1. Fix immediately">1. Fix immediately</option>
                  <option value="2. Fix as soon as possible">
                    2. Fix as soon as possible
                  </option>
                  <option value="3. Fix before next milestone">
                    3. Fix before next milestone
                  </option>
                  <option value="4. Fix before release">
                    4. Fix before release
                  </option>
                  <option value="5. Fix if possible">5. Fix if possible</option>
                  <option value="6. Optional">6. Optional</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="resolution">
                <Form.Label style={{ fontWeight: "600" }}>
                  Resolution
                </Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={bug?.resolution ?? ""}
                  disabled={disabled}
                >
                  <option value=""></option>
                  <option value="Pending">Pending</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Irreproducible">Irreproducible</option>
                  <option value="Deferred">Deferred</option>
                  <option value="As designed">As designed</option>
                  <option value="Withdrawn by reporter">
                    Withdrawn by reporter
                  </option>
                  <option value="Need more info">Need more info</option>
                  <option value="Disagree with suggestion">
                    Disagree with suggestion
                  </option>
                  <option value="Duplicate">Duplicate</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="resolutionVersion">
                <Form.Label style={{ fontWeight: "600" }}>
                  Resolution Version
                </Form.Label>
                <Form.Control
                  type="text"
                  name="resolutionVersion"
                  defaultValue={bug?.resolutionVersion ?? ""}
                  disabled={disabled}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="resolvedBy">
                <Form.Label style={{ fontWeight: "600" }}>
                  Resolved By
                </Form.Label>
                <Dropdown show={isFocusedResolvedBy}>
                  <Form.Control
                    type="text"
                    name="resolvedBy"
                    defaultValue={bug?.resolvedBy ?? ""}
                    ref={resolvedByRef}
                    onKeyUp={() => handleSuggestion(6)}
                    onFocus={() => {
                      handleSuggestion(6);
                      setIsFocusedResolvedBy(true);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setIsFocusedResolvedBy(false);
                        setSuggestionList([]);
                      }, TIME_OUT);
                    }}
                    autoComplete="off"
                    disabled={disabled}
                  />
                  <Dropdown.Menu
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {suggestionList.map((employee, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() =>
                          handleSuggestionSelect(6, employee.username || "")
                        }
                      >
                        {employee.username}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="resolvedDate">
                <Form.Label style={{ fontWeight: "600" }}>
                  Resolved Date
                </Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={
                    bug?.resolvedDate
                      ? formatDate(new Date(bug.resolvedDate))
                      : ""
                  }
                  disabled={disabled}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="resolutionTestedBy">
                <Form.Label style={{ fontWeight: "600" }}>
                  Resolution Tested By
                </Form.Label>
                <Dropdown show={isFocusedResolutionTestedBy}>
                  <Form.Control
                    type="text"
                    name="resolutionTestedBy"
                    defaultValue={bug?.resolutionTestedBy ?? ""}
                    ref={resolutionTestedByRef}
                    onKeyUp={() => handleSuggestion(7)}
                    onFocus={() => {
                      handleSuggestion(7);
                      setIsFocusedResolutionTestedBy(true);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setIsFocusedResolutionTestedBy(false);
                        setSuggestionList([]);
                      }, TIME_OUT);
                    }}
                    autoComplete="off"
                    disabled={disabled}
                  />
                  <Dropdown.Menu
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {suggestionList.map((employee, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() =>
                          handleSuggestionSelect(7, employee.username || "")
                        }
                      >
                        {employee.username}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="resolutionTestedDate">
                <Form.Label style={{ fontWeight: "600" }}>
                  Resolution Tested Date
                </Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={
                    bug?.resolutionTestedDate
                      ? formatDate(new Date(bug.resolutionTestedDate))
                      : ""
                  }
                  disabled={disabled}
                />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <Row className="mb-3">
            <Col style={{ flex: 0.3 }}>
              <Form.Group controlId="files">
                <Form.Label style={{ fontWeight: "600" }}>
                  Attachments
                </Form.Label>
                <Form.Control
                  type="file"
                  name="attachments"
                  multiple
                  onChange={handleAttachmentSelection}
                  disabled={disabled && bug != null}
                />
              </Form.Group>
            </Col>
          </Row>
          {attachments.map(
            (attachment, index) =>
              attachment.fileName && (
                <Row key={index} className="mb-1">
                  <div className="d-flex align-items-center">
                    <span className="me-2">{attachment.fileName}</span>
                    <Button
                      variant="link"
                      className="me-2"
                      onClick={() =>
                        getDataFromBackend(
                          9,
                          undefined,
                          undefined,
                          attachment,
                          undefined,
                          true
                        )
                      }
                    >
                      <FaDownload size={14} />
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => {
                        setAttachments(
                          attachments.map((a) =>
                            a.fileName !== attachment.fileName
                              ? a
                              : {
                                  ...a,
                                  fileName: null,
                                  attachmentContent: null,
                                }
                          )
                        );
                      }}
                      disabled={disabled && bug != null}
                    >
                      <FaTrash size={14} />
                    </Button>
                  </div>
                </Row>
              )
          )}

          <Row className="mb-3">
            <Col className="d-flex justify-content-end">
              <Button
                variant="dark"
                onClick={() => history.back()}
                style={{ marginRight: "20px" }}
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                type="reset"
                style={{ marginRight: "20px" }}
                disabled={disabled && bug != null}
              >
                Reset
              </Button>
              {bug && (
                <>
                  <Button
                    variant="success"
                    style={{ marginRight: "20px" }}
                    onClick={() => handleBugReportExport("xml")}
                  >
                    Export XML
                  </Button>
                  <Button
                    variant="success"
                    style={{ marginRight: "20px" }}
                    onClick={() => handleBugReportExport("ascii")}
                  >
                    Export ASCII
                  </Button>
                </>
              )}
              <Button
                variant="primary"
                type="submit"
                className="ml-2"
                disabled={disabled && bug != null}
              >
                {bug === null ? "Submit" : "Save"}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default BugForm;
