import { Form, Button, Dropdown } from "react-bootstrap";
import Program from "../model/Program";
import FunctionalArea from "../model/FunctionalArea";
import Employee from "../model/Employee";
import Team from "../model/Team";
import { useRef } from "react";

interface PropsFilter {
  handleFilterSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  filterReset: boolean;
  handleFilterResetForm: () => void;
  handleFilterSuggestion: (option: number) => void;
  handleFilterSuggestionSelect: (option: number, name: string) => void;
  filterProgramSuggestions: Program[];
  filterProgramRef: React.RefObject<HTMLInputElement>;
  filterFunctionalAreaSuggestions: FunctionalArea[];
  filterFunctionalAreaRef: React.RefObject<HTMLInputElement>;
  filterAssignedToEmployeeSuggestions: Employee[];
  filterAssignedToEmployeeRef: React.RefObject<HTMLInputElement>;
  filterAssignedToTeamSuggestions: Team[];
  filterAssignedToTeamRef: React.RefObject<HTMLInputElement>;
  filterReportedBySuggestions: Employee[];
  filterReportedByRef: React.RefObject<HTMLInputElement>;
  filterResolvedBySuggestions: Employee[];
  filterResolvedByRef: React.RefObject<HTMLInputElement>;
}

const Filter = ({
  handleFilterSubmit,
  filterReset,
  handleFilterResetForm,
  handleFilterSuggestion,
  handleFilterSuggestionSelect,
  filterProgramSuggestions,
  filterProgramRef,
  filterFunctionalAreaSuggestions,
  filterFunctionalAreaRef,
  filterAssignedToEmployeeSuggestions,
  filterAssignedToEmployeeRef,
  filterAssignedToTeamSuggestions,
  filterAssignedToTeamRef,
  filterReportedBySuggestions,
  filterReportedByRef,
  filterResolvedBySuggestions,
  filterResolvedByRef,
}: PropsFilter) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <div className="container mt-3 mb-3">
      <Form ref={formRef} onSubmit={handleFilterSubmit}>
        <Form.Group controlId="problemReportNumber" className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>
            Problem Report Number
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Problem Report Number"
            autoComplete="off"
            pattern="[0-9]*"
            title="Please enter only numbers"
          />
        </Form.Group>
        <Form.Group controlId="program" className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>Program</Form.Label>
          <Dropdown show={filterProgramSuggestions.length > 0}>
            <Form.Control
              type="text"
              placeholder="Enter Program"
              ref={filterProgramRef}
              onKeyUp={() => handleFilterSuggestion(4)}
              autoComplete="off"
            />
            <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
              {filterProgramSuggestions.map((program, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() =>
                    handleFilterSuggestionSelect(4, program.programName || "")
                  }
                >
                  {program.programName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group controlId="reportType" className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>Report Type</Form.Label>
          <Form.Control as="select">
            <option value="">Select Report Type</option>
            <option value="Coding Error">Coding Error</option>
            <option value="Design Issue">Design Issue</option>
            <option value="Suggestion">Suggestion</option>
            <option value="Documentation">Documentation</option>
            <option value="Hardware">Hardware</option>
            <option value="Query">Query</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="severity" className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>Severity</Form.Label>
          <Form.Control as="select">
            <option value="">Select Severity</option>
            <option value="Fatal">Fatal</option>
            <option value="Serious">Serious</option>
            <option value="Minor">Minor</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="functionalArea" className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>Functional Area</Form.Label>
          <Dropdown show={filterFunctionalAreaSuggestions.length > 0}>
            <Form.Control
              type="text"
              placeholder="Enter Functional Area"
              ref={filterFunctionalAreaRef}
              onKeyUp={() => handleFilterSuggestion(5)}
              autoComplete="off"
            />
            <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
              {filterFunctionalAreaSuggestions.map((functinalArea, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() =>
                    handleFilterSuggestionSelect(
                      5,
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
        <Form.Group controlId="assignedToEmployee" className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>
            Assigned To Employee
          </Form.Label>
          <Dropdown show={filterAssignedToEmployeeSuggestions.length > 0}>
            <Form.Control
              type="text"
              placeholder="Enter Assigned To Employee"
              ref={filterAssignedToEmployeeRef}
              onKeyUp={() => handleFilterSuggestion(7)}
              autoComplete="off"
            />
            <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
              {filterAssignedToEmployeeSuggestions.map((employee, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() =>
                    handleFilterSuggestionSelect(7, employee.username || "")
                  }
                >
                  {employee.username}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group controlId="assignedToTeam" className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>
            Assigned To Team
          </Form.Label>
          <Dropdown show={filterAssignedToTeamSuggestions.length > 0}>
            <Form.Control
              type="text"
              placeholder="Enter Assigned To Team"
              ref={filterAssignedToTeamRef}
              onKeyUp={() => handleFilterSuggestion(6)}
              autoComplete="off"
            />
            <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
              {filterAssignedToTeamSuggestions.map((team, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() =>
                    handleFilterSuggestionSelect(6, team.teamName || "")
                  }
                >
                  {team.teamName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group controlId="status" className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>Status</Form.Label>
          <Form.Control as="select">
            <option value="">Select Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="priority" className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>Priority</Form.Label>
          <Form.Control as="select">
            <option value="">Select Priority</option>
            <option value="1. Fix immediately">1. Fix immediately</option>
            <option value="2. Fix as soon as possible">
              2. Fix as soon as possible
            </option>
            <option value="3. Fix before next milestone">
              3. Fix before next milestone
            </option>
            <option value="4. Fix before release">4. Fix before release</option>
            <option value="5. Fix if possible">5. Fix if possible</option>
            <option value="6. Optional">6. Optional</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="resolution" className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>Resolution</Form.Label>
          <Form.Control as="select">
            <option value="">Select Resolution</option>
            <option value="Pending">Pending</option>
            <option value="Fixed">Fixed</option>
            <option value="Irreproducible">Irreproducible</option>
            <option value="Deferred">Deferred</option>
            <option value="As designed">As designed</option>
            <option value="Withdrawn by reporter">Withdrawn by reporter</option>
            <option value="Need more info">Need more info</option>
            <option value="Disagree with suggestion">
              Disagree with suggestion
            </option>
            <option value="Duplicate">Duplicate</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="reportedBy" className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>Reported By</Form.Label>
          <Dropdown show={filterReportedBySuggestions.length > 0}>
            <Form.Control
              type="text"
              placeholder="Enter Reported By"
              ref={filterReportedByRef}
              onKeyUp={() => handleFilterSuggestion(8)}
              autoComplete="off"
            />
            <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
              {filterReportedBySuggestions.map((employee, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() =>
                    handleFilterSuggestionSelect(8, employee.username || "")
                  }
                >
                  {employee.username}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group controlId="dateReported" className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>Date Reported</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
        <Form.Group controlId="resolvedBy" className="mb-3">
          <Form.Label style={{ fontWeight: "600" }}>Resolved By</Form.Label>
          <Dropdown show={filterResolvedBySuggestions.length > 0}>
            <Form.Control
              type="text"
              placeholder="Enter Resolved By"
              ref={filterResolvedByRef}
              onKeyUp={() => handleFilterSuggestion(9)}
              autoComplete="off"
            />
            <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
              {filterResolvedBySuggestions.map((employee, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() =>
                    handleFilterSuggestionSelect(9, employee.username || "")
                  }
                >
                  {employee.username}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <br />
        {filterReset && (
          <Button
            variant="secondary"
            type="reset"
            onClick={() => {
              if (formRef.current) {
                formRef.current.reset();
              }
              handleFilterResetForm();
            }}
          >
            Reset
          </Button>
        )}
        <Button variant="primary" type="submit" className="float-end">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default Filter;
