package com.og.bughound.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.og.bughound.model.Attachment;
import com.og.bughound.model.BugForm;
import com.og.bughound.model.BugPageInfo;
import com.og.bughound.model.Employee;
import com.og.bughound.model.EmployeeForm;
import com.og.bughound.model.EmployeePrincipal;
import com.og.bughound.model.FunctionalArea;
import com.og.bughound.model.Program;
import com.og.bughound.model.Team;
import com.og.bughound.service.AttachmentService;
import com.og.bughound.service.BugService;
import com.og.bughound.service.EmployeeService;
import com.og.bughound.service.FunctionalAreaService;
import com.og.bughound.service.ProgramService;
import com.og.bughound.service.TeamService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

@Controller
// allow frontend to access
@CrossOrigin(origins = "http://localhost:5173/", allowCredentials = "true")
public class BugHoundController {

    // front end url
    private String baseUrl = "http://localhost:5173/";

    private final BugService bugService;
    private final ProgramService programService;
    private final FunctionalAreaService functionalAreaService;
    private final TeamService teamService;
    private final EmployeeService employeeService;
    private final AttachmentService attachmentService;
    private Employee employee;
    private final int limitPerPage = 10;

    BugHoundController(BugService bugService, ProgramService programService,
            FunctionalAreaService functionalAreaService, TeamService teamService, EmployeeService employeeService,
            AttachmentService attachmentService) {
        this.bugService = bugService;
        this.programService = programService;
        this.functionalAreaService = functionalAreaService;
        this.teamService = teamService;
        this.employeeService = employeeService;
        this.attachmentService = attachmentService;
    }

    // after login redirect to front end
    @RequestMapping(value = "/", method = { RequestMethod.GET, RequestMethod.POST })
    public void redirectToTargetUrl(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            HttpServletResponse httpServletResponse) {
        employee = employeePrincipal.getEmployee();
        httpServletResponse.setHeader("Location", baseUrl);
        httpServletResponse.setStatus(302);
    }

    // error page
    @RequestMapping(value = "/error", method = { RequestMethod.GET, RequestMethod.POST })
    public void redirectToLogin(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            HttpServletResponse httpServletResponse) {
        employee = employeePrincipal.getEmployee();
        httpServletResponse.setHeader("Location", "/");
        httpServletResponse.setStatus(302);
    }

    // get csrf token
    @RequestMapping("/getCsrfToken")
    @ResponseBody
    public List<String> getCsrfToken(HttpServletRequest request) {
        CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        return csrfToken == null ? null : Arrays.asList(csrfToken.getToken());
    }

    // send employee data based on authentication
    @RequestMapping("/getEmployeeData")
    @ResponseBody
    public Employee getUserData(@AuthenticationPrincipal EmployeePrincipal employeePrincipal) {
        employee = employeePrincipal.getEmployee();
        employee.setEmployeeId(null);
        employee.setPassword(null);
        return employee;
    }

    // send attachment file content data
    @PostMapping("/download/attachment")
    @ResponseBody
    public byte[] downloadAttachment(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            Long attachmentId, Long problemReportNumber) {
        if (attachmentId == null || problemReportNumber == null) {
            return null;
        }
        Attachment attachment = attachmentService.getAttachment(attachmentId, problemReportNumber);
        if (attachment == null) {
            return null;
        }
        return attachment.getAttachmentContent();
    }

    // filtered bugs
    @PostMapping("/get/filtered/bugs")
    @ResponseBody
    public BugPageInfo getfilterdBugs(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            BugForm bugForm, Integer limit, Integer offset) {
        return (limit == null || limitPerPage < limit || offset == null) ? null
                : bugService.getFilterBugs(bugForm, limit, offset);
    }

    // search query in bugs(summary, description, suggested fix, comments)
    @PostMapping("/get/search/bugs")
    @ResponseBody
    public BugPageInfo getSearchBugs(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            String query, Integer limit, Integer offset) {
        return (query == null || limit == null || limitPerPage < limit || offset == null) ? null
                : bugService.getSearchBugs(query, limit, offset);
    }

    // search query in programs
    @PostMapping("/get/search/programs")
    @ResponseBody
    public List<Program> getSearchPrograms(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            String query) {
        return (query == null) ? null
                : programService.startsWithProgramName(query);
    }

    // search query in functional areas
    @PostMapping("/get/search/functionalarea")
    @ResponseBody
    public List<FunctionalArea> getSearchFunctionalArea(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            String query) {
        return (query == null) ? null
                : functionalAreaService.startsWithFunctionalAreaName(query);
    }

    // search query in teams
    @PostMapping("/get/search/team")
    @ResponseBody
    public List<Team> getSearchTeam(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            String query) {
        return (query == null) ? null
                : teamService.startsWithTeamName(query);
    }

    // search query in employees
    @PostMapping("/get/search/employee")
    @ResponseBody
    public List<Employee> getSearchEmployee(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            String query) {
        if (query == null) {
            return null;
        }
        employee = employeePrincipal.getEmployee();
        List<Employee> employees = employeeService.startsWithEmployeeUsername(query);
        employees.forEach(emp -> {
            if (!employee.getRole().equals("ROLE_ADMIN")) {
                emp.setEmployeeId(null);
                emp.setPassword(null);
            }
        });
        return employees;
    }

    // insert oredit bug
    @PostMapping("/create/bug")
    @ResponseBody
    @Transactional
    public ResponseEntity<String> saveBug(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            BugForm bugForm) {
        employee = employeePrincipal.getEmployee();
        try {
            if (bugForm == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid bug data");
            }
            bugService.saveBug(bugForm, employee);
            return ResponseEntity.ok("Bug created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating bug: " + e.getMessage());
        }
    }

    // insert or edit employee
    @PostMapping("/save/employee")
    @ResponseBody
    @Transactional
    public ResponseEntity<String> saveEmployee(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            EmployeeForm emp) {
        try {
            if (emp == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid employee data");
            }
            employee = employeePrincipal.getEmployee();
            if (employee.getRole().equals("ROLE_ADMIN")) {
                employeeService.saveEmployee(emp);
                return ResponseEntity.ok("Employee saved successfully");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving employee: " + e.getMessage());
        }
    }

    // insert or edit program
    @PostMapping("/save/program")
    @ResponseBody
    @Transactional
    public ResponseEntity<String> saveProgram(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            Program program) {
        try {
            if (program == null || program.getProgramName() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid program data");
            }
            employee = employeePrincipal.getEmployee();
            if (employee.getRole().equals("ROLE_ADMIN")) {
                programService.saveProgram(program.getProgramName(), program.getProgramId());
                return ResponseEntity.ok("Program saved successfully");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving employee: " + e.getMessage());
        }
    }

    // insert or edit functional area
    @PostMapping("/save/functionalarea")
    @ResponseBody
    @Transactional
    public ResponseEntity<String> saveFunctionalArea(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            FunctionalArea functionalArea) {
        try {
            if (functionalArea == null || functionalArea.getAreaName() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid functional area data");
            }
            employee = employeePrincipal.getEmployee();
            if (employee.getRole().equals("ROLE_ADMIN")) {
                functionalAreaService.saveFunctionalArea(functionalArea.getAreaName(),
                        functionalArea.getFunctionalAreaId());
                return ResponseEntity.ok("Functional area saved successfully");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving employee: " + e.getMessage());
        }
    }

    // insert or edit team
    @PostMapping("/save/team")
    @ResponseBody
    @Transactional
    public ResponseEntity<String> saveTeam(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            Team team) {
        try {
            if (team == null || team.getTeamName() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid team data");
            }
            employee = employeePrincipal.getEmployee();
            if (employee.getRole().equals("ROLE_ADMIN")) {
                teamService.saveTeam(team.getTeamName(), team.getTeamId());
                return ResponseEntity.ok("Team saved successfully");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving employee: " + e.getMessage());
        }
    }

    // get bugs
    @PostMapping("/get/bugs")
    @ResponseBody
    public BugPageInfo getBugs(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            Integer limit, Integer offset) {
        return (limit == null || limitPerPage < limit || offset == null) ? null
                : bugService.getBugs(limit, offset);
    }

    // get employee by id
    @PostMapping("get/employee/id")
    @ResponseBody
    public EmployeeForm getEmployeeById(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            Long employeeId) {
        if (employeeId == null) {
            return null;
        }
        employee = employeePrincipal.getEmployee();
        Employee emp = employeeService.getEmployeeById(employeeId);
        if (!employee.getRole().equals("ROLE_ADMIN")) {
            emp.setEmployeeId(null);
            emp.setPassword(null);
            emp.setTeamId(null);
        }
        return employeeService.convertToEmployeeForm(emp);
    }

    // get program by id
    @PostMapping("get/program/id")
    @ResponseBody
    public Program getProgramById(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            Long programId) {
        if (programId == null) {
            return null;
        }
        employee = employeePrincipal.getEmployee();
        if (employee.getRole().equals("ROLE_ADMIN")) {
            return programService.getProgramById(programId);
        }
        return null;
    }

    // get functional area by id
    @PostMapping("get/functionalarea/id")
    @ResponseBody
    public FunctionalArea getFunctionalAreaById(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            Long functionalAreaId) {
        if (functionalAreaId == null) {
            return null;
        }
        employee = employeePrincipal.getEmployee();
        if (employee.getRole().equals("ROLE_ADMIN")) {
            return functionalAreaService.getFunctionalAreaById(functionalAreaId);
        }
        return null;
    }

    // get team by id
    @PostMapping("get/team/id")
    @ResponseBody
    public Team getTeamById(@AuthenticationPrincipal EmployeePrincipal employeePrincipal, Long teamId) {
        if (teamId == null) {
            return null;
        }
        employee = employeePrincipal.getEmployee();
        if (employee.getRole().equals("ROLE_ADMIN")) {
            return teamService.getTeamById(teamId);
        }
        return null;
    }

    // get attachments
    @PostMapping("/get/attachments")
    @ResponseBody
    public List<Attachment> getAttachmentNames(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            Long problemReportNumber) {
        return problemReportNumber == null ? null : attachmentService.getFileNames(problemReportNumber);
    }

    // delete employee
    @PostMapping("/delete/employee")
    @ResponseBody
    @Transactional
    public void deleteEmployee(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            Long employeeId) {
        if (employeeId == null) {
            return;
        }
        employee = employeePrincipal.getEmployee();
        if (employee.getRole().equals("ROLE_ADMIN")) {
            bugService.deleteBugAssociatesByEmployeeId(employeeId);
            employeeService.deleteEmployee(employeeId);
        }
    }

    // delete program
    @PostMapping("/delete/program")
    @ResponseBody
    @Transactional
    public void deleteProgram(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            Long programId) {
        if (programId == null) {
            return;
        }
        employee = employeePrincipal.getEmployee();
        if (employee.getRole().equals("ROLE_ADMIN")) {
            bugService.deleteBugAssociatesByProgram(programId);
            programService.deleteProgram(programId);
        }
    }

    // delete functional area
    @PostMapping("/delete/functionalarea")
    @ResponseBody
    @Transactional
    public void deleteFunctionalArea(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            Long functionalAreaId) {
        if (functionalAreaId == null) {
            return;
        }
        employee = employeePrincipal.getEmployee();
        if (employee.getRole().equals("ROLE_ADMIN")) {
            bugService.deleteBugAssociatesByFunctionalArea(functionalAreaId);
            functionalAreaService.deleteFunctionalArea(functionalAreaId);
        }
    }

    // delete team
    @PostMapping("/delete/team")
    @ResponseBody
    @Transactional
    public void deleteTeam(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            Long teamId) {
        if (teamId == null) {
            return;
        }
        employee = employeePrincipal.getEmployee();
        if (employee.getRole().equals("ROLE_ADMIN")) {
            bugService.deleteBugAssociatesByTeam(teamId);
            teamService.deleteTeam(teamId);
        }
    }

    // delete bug
    @PostMapping("/delete/bug")
    @ResponseBody
    @Transactional
    public void deleteBug(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            Long problemReportNumber) {
        if (problemReportNumber == null) {
            return;
        }
        employee = employeePrincipal.getEmployee();
        if (employee.getRole().equals("ROLE_ADMIN")) {
            bugService.deleteBugAssociates(problemReportNumber);
        }
    }

    // delete attachment
    @PostMapping("/delete/attachment")
    @ResponseBody
    @Transactional
    public void deleteAttachment(@AuthenticationPrincipal EmployeePrincipal employeePrincipal,
            Long attachmentId) {
        if (attachmentId != null) {
            employee = employeePrincipal.getEmployee();
            if (!employee.getRole().equals("ROLE_USER")) {
                attachmentService.deleteAttachment(attachmentId);
            }
        }
    }
}
