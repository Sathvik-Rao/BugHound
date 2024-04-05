import { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Pagination,
  Form,
  Button,
} from "react-bootstrap";
import BugPageInfo from "../model/BugPageInfo";
import Bug from "../model/Bug";
import { FaTimes } from "react-icons/fa";
import ErrorBox from "./ErrorBox";
import Filter from "./Filter";
import Program from "../model/Program";
import FunctionalArea from "../model/FunctionalArea";
import Employee from "../model/Employee";
import Team from "../model/Team";
import { useNavigate } from "react-router-dom";

interface PropsListItem {
  id: number;
  title: string;
  description: string;
}

interface PropsHome {
  baseUrl: string;
  csrfToken: string;
}

const ListItem = ({ id, title, description }: PropsListItem) => {
  return (
    <Card className="my-2">
      <Card.Body>
        <Container>
          <Row>
            <Col md={2} className="d-flex align-items-center">
              {id}
            </Col>
            <Col md={9}>
              <Card.Title className="text-truncate">{title}</Card.Title>
              <Card.Text className="text-truncate">{description}</Card.Text>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

const Home = ({ baseUrl, csrfToken }: PropsHome) => {
  const navigate = useNavigate();

  //pagination
  const MAX_LIMIT = 10;
  const DEFAULT_OFFSET = 0;
  const [totalResults, setTotalResults] = useState(0);
  const [option, setOption] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  //bugs list
  const [bugPage, setBugPage] = useState<BugPageInfo>({
    bugs: [],
    totalCount: 0,
  });

  //error message
  const [errorMessage, setErrorMessage] = useState<string>("");

  //filter
  const [filter, setFilter] = useState<Bug>({});
  const [filterReset, setFilterReset] = useState<boolean>(false);

  //search
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchReset, setSearchReset] = useState<boolean>(false);
  const [showSearchAlert, setShowSearchAlert] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<String>("");

  const handleSearchResetForm = () => {
    setErrorMessage("");
    setSearchReset(false);
    setSearchQuery("");
    setShowSearchAlert(false);
    setOption(1);
    setCurrentPage(1);
    if (searchRef.current) {
      searchRef.current.value = "";
    }
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    if (searchRef.current) {
      if (searchRef.current.value.trim() === "") {
        setShowSearchAlert(true);
      } else {
        handleFilterResetForm();
        setOption(3);
        setCurrentPage(1);
        setShowSearchAlert(false);
        setSearchReset(true);
        setSearchQuery(searchRef.current.value);
      }
    }
  };

  //filter
  const handleFilterResetForm = () => {
    setErrorMessage("");
    setFilter({});
    setFilterReset(false);
    setOption(1);
    setCurrentPage(1);

    const inputIdsToClear = [
      "program",
      "reportType",
      "severity",
      "functionalArea",
      "assignedToEmployee",
      "assignedToTeam",
      "status",
      "priority",
      "resolution",
      "reportedBy",
      "dateReported",
      "resolvedBy",
      "problemReportNumber",
    ];

    inputIdsToClear.forEach((id) => {
      const inputElement = document.getElementById(id);
      if (inputElement && inputElement instanceof HTMLInputElement) {
        inputElement.value = "";
      }
    });
  };

  const handleFilterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    const formData: Bug = {
      programName: event.currentTarget.program.value,
      reportType: event.currentTarget.reportType.value,
      severity: event.currentTarget.severity.value,
      functionalArea: event.currentTarget.functionalArea.value,
      assignedToEmployee: event.currentTarget.assignedToEmployee.value,
      assignedToTeam: event.currentTarget.assignedToTeam.value,
      status: event.currentTarget.status.value,
      priority: event.currentTarget.priority.value,
      resolution: event.currentTarget.resolution.value,
      reportedBy: event.currentTarget.reportedBy.value,
      dateReported: event.currentTarget.dateReported.value,
      resolvedBy: event.currentTarget.resolvedBy.value,
      problemReportNumber: event.currentTarget.problemReportNumber.value,
    };
    handleSearchResetForm();
    setOption(2);
    setCurrentPage(1);
    setFilterReset(true);
    setFilter(formData);
  };

  //filter suggestions
  //program
  const [filterProgramSuggestions, setFilterProgramSuggestions] = useState<
    Program[]
  >([]);
  const filterProgramRef = useRef<HTMLInputElement | null>(null);

  //functional area
  const [filterFunctionalAreaSuggestions, setFilterFunctionalAreaSuggestions] =
    useState<FunctionalArea[]>([]);
  const filterFunctionalAreaRef = useRef<HTMLInputElement | null>(null);

  //team
  const [filterAssignedToTeamSuggestions, setFilterAssignedToTeamSuggestions] =
    useState<Team[]>([]);
  const filterAssignedToTeamRef = useRef<HTMLInputElement | null>(null);

  //Assigned to employee
  const [
    filterAssignedToEmployeeSuggestions,
    setFilterAssignedToEmployeeSuggestions,
  ] = useState<Employee[]>([]);
  const filterAssignedToEmployeeRef = useRef<HTMLInputElement | null>(null);

  //Reported By
  const [filterReportedBySuggestions, setFilterReportedBySuggestions] =
    useState<Employee[]>([]);
  const filterReportedByRef = useRef<HTMLInputElement | null>(null);

  //Resolved By
  const [filterResolvedBySuggestions, setFilterResolvedBySuggestions] =
    useState<Employee[]>([]);
  const filterResolvedByRef = useRef<HTMLInputElement | null>(null);

  const handleFilterSuggestion = (option: number) => {
    let value = "";

    if (option === 4) {
      //program
      value = filterProgramRef.current?.value.trim() ?? "";
    } else if (option === 5) {
      //functional area
      value = filterFunctionalAreaRef.current?.value.trim() ?? "";
    } else if (option === 6) {
      //Assigned to team
      value = filterAssignedToTeamRef.current?.value.trim() ?? "";
    } else if (option === 7) {
      //Assigned to employee
      value = filterAssignedToEmployeeRef.current?.value.trim() ?? "";
    } else if (option === 8) {
      //Reported by
      value = filterReportedByRef.current?.value.trim() ?? "";
    } else if (option === 9) {
      //Resolved by
      value = filterResolvedByRef.current?.value.trim() ?? "";
    }

    if (value === "") {
      if (option === 4) {
        setFilterProgramSuggestions([]);
      } else if (option === 5) {
        setFilterFunctionalAreaSuggestions([]);
      } else if (option === 6) {
        setFilterAssignedToTeamSuggestions([]);
      } else if (option === 7) {
        setFilterAssignedToEmployeeSuggestions([]);
      } else if (option === 8) {
        setFilterReportedBySuggestions([]);
      } else if (option === 9) {
        setFilterResolvedBySuggestions([]);
      }
      return;
    }

    getDataFromBackend(option, undefined, undefined, value);
  };

  const handleFilterSuggestionSelect = (option: number, name: string) => {
    if (option === 4) {
      if (filterProgramRef.current) {
        filterProgramRef.current.value = name ?? "";
      }
      setFilterProgramSuggestions([]);
    } else if (option === 5) {
      if (filterFunctionalAreaRef.current) {
        filterFunctionalAreaRef.current.value = name ?? "";
      }
      setFilterFunctionalAreaSuggestions([]);
    } else if (option === 6) {
      if (filterAssignedToTeamRef.current) {
        filterAssignedToTeamRef.current.value = name ?? "";
      }
      setFilterAssignedToTeamSuggestions([]);
    } else if (option === 7) {
      if (filterAssignedToEmployeeRef.current) {
        filterAssignedToEmployeeRef.current.value = name ?? "";
      }
      setFilterAssignedToEmployeeSuggestions([]);
    } else if (option === 8) {
      if (filterReportedByRef.current) {
        filterReportedByRef.current.value = name ?? "";
      }
      setFilterReportedBySuggestions([]);
    } else if (option === 9) {
      if (filterResolvedByRef.current) {
        filterResolvedByRef.current.value = name ?? "";
      }
      setFilterResolvedBySuggestions([]);
    }
  };

  //execute when searchQuery or filter updates
  useEffect(() => {
    document.title = "Bughound - Home";

    getDataFromBackend(option, MAX_LIMIT, DEFAULT_OFFSET);
  }, [searchQuery, filter]);

  //get data from backend based on options
  const getDataFromBackend = async (
    option: number,
    limit?: number,
    offset?: number,
    suggestionQuery?: string
  ) => {
    try {
      let url = "";
      let errorMessage = "";

      if (option === 1) {
        //list bugs
        url = `${baseUrl}/get/bugs?limit=${limit}&offset=${offset}`;
        errorMessage = "Failed to fetch bugs";
      } else if (option === 2) {
        //filter bugs
        const queryParams = new URLSearchParams({
          limit: limit?.toString() ?? "",
          offset: offset?.toString() ?? "",
          ...Object.entries(filter).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              acc[key] = value.toString();
            }
            return acc;
          }, {} as Record<string, string>),
        });
        url = `${baseUrl}/get/filtered/bugs?${queryParams.toString()}`;
        errorMessage = "Failed to filter bugs";
      } else if (option === 3) {
        //search bugs
        url = `${baseUrl}/get/search/bugs?query=${searchQuery}&limit=${limit}&offset=${offset}`;
        errorMessage = "Failed to search bugs";
      } else if (option === 4) {
        //search programs
        url = `${baseUrl}/get/search/programs?query=${suggestionQuery}`;
        errorMessage = "Failed to fetch list of programs";
      } else if (option === 5) {
        //search functional areas
        url = `${baseUrl}/get/search/functionalarea?query=${suggestionQuery}`;
        errorMessage = "Failed to fetch list of functional areas";
      } else if (option === 6) {
        //search teams
        url = `${baseUrl}/get/search/team?query=${suggestionQuery}`;
        errorMessage = "Failed to fetch list of teams";
      } else if (option === 7 || option === 8 || option === 9) {
        //search employees
        url = `${baseUrl}/get/search/employee?query=${suggestionQuery}`;
        errorMessage = "Failed to fetch list of employees";
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

      const data = await response.json();

      if (option === 1 || option === 2 || option === 3) {
        if (data === null || data.bugs === null) {
          setBugPage({
            bugs: [],
            totalCount: 0,
          });
          setTotalResults(0);
        } else {
          setBugPage(data);
          setTotalResults(data.totalCount);
        }
      } else if (option === 4) {
        data === null
          ? setFilterProgramSuggestions([])
          : setFilterProgramSuggestions(data);
      } else if (option === 5) {
        data === null
          ? setFilterFunctionalAreaSuggestions([])
          : setFilterFunctionalAreaSuggestions(data);
      } else if (option === 6) {
        data === null
          ? setFilterAssignedToTeamSuggestions([])
          : setFilterAssignedToTeamSuggestions(data);
      } else if (option === 7) {
        data === null
          ? setFilterAssignedToEmployeeSuggestions([])
          : setFilterAssignedToEmployeeSuggestions(data);
      } else if (option === 8) {
        data === null
          ? setFilterReportedBySuggestions([])
          : setFilterReportedBySuggestions(data);
      } else if (option === 9) {
        data === null
          ? setFilterResolvedBySuggestions([])
          : setFilterResolvedBySuggestions(data);
      }
    } catch (error) {
      const errorMessageString =
        error instanceof Error ? error.message : String(error);
      setErrorMessage(errorMessageString);
    }
  };

  //error message
  const handleErrorMessageClose = () => {
    setErrorMessage("");
  };

  //pagination
  const itemsPerPage = 10;
  const maxPages = 5;
  const totalItems = bugPage.totalCount;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = bugPage.bugs;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    getDataFromBackend(option, MAX_LIMIT, (pageNumber - 1) * 10);
  };

  let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
  let endPage = Math.min(totalPages, startPage + maxPages - 1);

  // Adjust endPage if totalPages is less than maxPages
  if (totalPages <= maxPages) {
    endPage = totalPages;
  }

  // Adjust startPage if endPage is updated
  startPage = Math.max(1, endPage - maxPages + 1);

  return (
    <div style={{ display: "flex", paddingTop: "56px", overflow: "hidden" }}>
      <div
        style={{
          flex: 1,
          marginRight: "20px",
          marginLeft: "5px",
          maxHeight: "calc(100vh - 56px)",
          overflowY: "auto",
        }}
      >
        <Filter
          handleFilterSubmit={handleFilterSubmit}
          filterReset={filterReset}
          handleFilterResetForm={handleFilterResetForm}
          handleFilterSuggestion={handleFilterSuggestion}
          handleFilterSuggestionSelect={handleFilterSuggestionSelect}
          filterProgramSuggestions={filterProgramSuggestions}
          filterProgramRef={filterProgramRef}
          filterFunctionalAreaSuggestions={filterFunctionalAreaSuggestions}
          filterFunctionalAreaRef={filterFunctionalAreaRef}
          filterAssignedToEmployeeSuggestions={
            filterAssignedToEmployeeSuggestions
          }
          filterAssignedToEmployeeRef={filterAssignedToEmployeeRef}
          filterAssignedToTeamSuggestions={filterAssignedToTeamSuggestions}
          filterAssignedToTeamRef={filterAssignedToTeamRef}
          filterReportedBySuggestions={filterReportedBySuggestions}
          filterReportedByRef={filterReportedByRef}
          filterResolvedBySuggestions={filterResolvedBySuggestions}
          filterResolvedByRef={filterResolvedByRef}
        />
      </div>
      <div
        style={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          maxHeight: "calc(100vh - 56px)",
          overflowY: "auto",
        }}
      >
        <Container>
          <div className="d-flex justify-content-between mb-4 mt-3">
            <Form style={{ width: "45%" }} onSubmit={handleSearchSubmit}>
              <div className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  ref={searchRef}
                  className="rounded-pill w-100"
                />
                {searchReset && (
                  <FaTimes
                    className="position-absolute top-50 end-1 translate-middle-y text-muted"
                    style={{
                      cursor: "pointer",
                      fontSize: "20px",
                      right: "10px",
                    }}
                    onClick={handleSearchResetForm}
                  />
                )}
              </div>
              {showSearchAlert && (
                <small className="text-danger">Please enter text</small>
              )}
            </Form>
            <div className="d-flex align-items-center">
              {
                <span className="fw-bold text-muted">
                  ({totalResults.toLocaleString()} results)
                </span>
              }
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                navigate("/bug");
              }}
            >
              Create Bug
            </Button>
          </div>
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

          {currentItems.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/bug`, { state: { item } });
              }}
              style={{ cursor: "pointer" }}
            >
              <ListItem
                key={index}
                id={item.problemReportNumber || -1}
                title={item.problemDescription || "Untitled"}
                description={item.problemSummary || "Untitled"}
              />
            </div>
          ))}
          <Pagination>
            <Pagination.First onClick={() => paginate(1)} />
            <Pagination.Prev
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            />
            {[...Array(endPage - startPage + 1)].map((_, index) => (
              <Pagination.Item
                key={startPage + index}
                active={startPage + index === currentPage}
                onClick={() => paginate(startPage + index)}
              >
                {startPage + index}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                paginate(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
            />
            <Pagination.Last onClick={() => paginate(totalPages)} />
          </Pagination>
        </Container>
      </div>
    </div>
  );
};

export default Home;
