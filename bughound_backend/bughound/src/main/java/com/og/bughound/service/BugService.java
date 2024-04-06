package com.og.bughound.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.og.bughound.model.Bug;
import com.og.bughound.model.BugForm;
import com.og.bughound.model.BugPageInfo;
import com.og.bughound.model.Employee;
import com.og.bughound.model.FunctionalArea;
import com.og.bughound.model.Program;
import com.og.bughound.model.Team;
import com.og.bughound.repo.BugRepo;

import jakarta.transaction.Transactional;

@Service
public class BugService {

    private final BugRepo bugRepo;

    private final ProgramService programService;

    private final FunctionalAreaService functionalAreaService;

    private final EmployeeService employeeService;

    private final TeamService teamService;

    private final AttachmentService attachmentService;

    private final String[] REPORT_LIST = {
            "Coding Error",
            "Design Issue",
            "Suggestion",
            "Documentation",
            "Hardware",
            "Query"
    };

    private final String[] SEVERITY_LIST = {
            "Fatal",
            "Serious",
            "Minor"
    };

    private final String[] STATUS_LIST = {
            "Open",
            "In Progress",
            "Resolved",
            "Closed"
    };

    private final String[] PRIORITY_LIST = {
            "1. Fix immediately",
            "2. Fix as soon as possible",
            "3. Fix before next milestone",
            "4. Fix before release",
            "5. Fix if possible",
            "6. Optional"
    };

    private final String[] RESOLUTION_LIST = {
            "Pending",
            "Fixed",
            "Irreproducible",
            "Deferred",
            "As designed",
            "Withdrawn by reporter",
            "Need more info",
            "Disagree with suggestion",
            "Duplicate"
    };

    public BugService(BugRepo bugRepo, ProgramService programService, FunctionalAreaService functionalAreaService,
            EmployeeService employeeService, TeamService teamService, AttachmentService attachmentService) {
        this.bugRepo = bugRepo;
        this.programService = programService;
        this.functionalAreaService = functionalAreaService;
        this.employeeService = employeeService;
        this.teamService = teamService;
        this.attachmentService = attachmentService;
    }

    @Transactional
    public Bug saveBug(BugForm bugForm, Employee employee) {

        if (bugForm == null || employee == null) {
            return null;
        }

        Bug bug = bugForm.getProblemReportNumber() != null
                ? bugRepo.findById(bugForm.getProblemReportNumber()).orElseGet(Bug::new)
                : new Bug();

        if (employee.getRole().equals("ROLE_USER") && bug.getProblemReportNumber() != null) {
            throw new IllegalArgumentException("You are not authorized to edit this bug.");
        }

        Program program = Optional.ofNullable(programService.getProgram(bugForm.getProgramName()))
                .orElseGet(() -> programService.saveProgram(bugForm.getProgramName()));
        if (program != null) {
            bug.setProgramId(program.getProgramId());
        } else {
            bug.setProgramId(null);
        }

        if (bugForm.getReportType() != null && !bugForm.getReportType().trim().isEmpty()) {
            bug.setReportType(containsIgnoreCase(bugForm.getReportType().trim(), REPORT_LIST));
        } else {
            bug.setReportType(null);
        }

        if (bugForm.getSeverity() != null && !bugForm.getSeverity().trim().isEmpty()) {
            bug.setSeverity(containsIgnoreCase(bugForm.getSeverity().trim(), SEVERITY_LIST));
        } else {
            bug.setSeverity(null);
        }

        if (bugForm.getProblemSummary() != null && !bugForm.getProblemSummary().trim().isEmpty()) {
            bug.setProblemSummary(bugForm.getProblemSummary());
        } else {
            throw new IllegalArgumentException("Problem summary cannot be empty or null.");
        }

        if (bugForm.getCanReproduce() != null) {
            bug.setCanReproduce(bugForm.getCanReproduce());
        } else {
            bug.setCanReproduce(null);
        }

        if (bugForm.getProblemDescription() != null && !bugForm.getProblemDescription().trim().isEmpty()) {
            bug.setProblemDescription(bugForm.getProblemDescription());
        } else {
            throw new IllegalArgumentException("Problem description cannot be empty or null.");
        }

        if (bugForm.getSuggestedFix() != null && !bugForm.getSuggestedFix().trim().isEmpty()) {
            bug.setSuggestedFix(bugForm.getSuggestedFix());
        } else {
            bug.setSuggestedFix(null);
        }

        if (bugForm.getReportedBy() != null && !bugForm.getReportedBy().trim().isEmpty()) {
            Employee reportedBy = employeeService.getEmployee(bugForm.getReportedBy());
            if (reportedBy != null) {
                bug.setReportedBy(reportedBy.getEmployeeId());
            } else {
                throw new IllegalArgumentException("Reported by: Non-existing username.");
            }
        } else {
            throw new IllegalArgumentException("Reported by cannot be empty or null.");
        }

        if (bugForm.getDateReported() != null) {
            bug.setDateReported(bugForm.getDateReported());
        } else {
            bug.setDateReported(null);
        }

        if (!employee.getRole().equals("ROLE_USER")) {

            if (bugForm.getFunctionalArea() != null && !bugForm.getFunctionalArea().trim().isEmpty()) {
                FunctionalArea functionalArea = functionalAreaService
                        .getFunctionalArea(bugForm.getFunctionalArea());
                if (functionalArea != null) {
                    bug.setFunctionalAreaId(functionalArea.getFunctionalAreaId());
                } else {
                    throw new IllegalArgumentException("Functional area: Non-existing name.");
                }
            } else {
                bug.setFunctionalAreaId(null);
            }

            if (bugForm.getAssignedToEmployee() != null && !bugForm.getAssignedToEmployee().trim().isEmpty()) {
                Employee assignedToEmployee = employeeService.getEmployee(bugForm.getAssignedToEmployee());
                if (assignedToEmployee != null) {
                    bug.setAssignedToEmployeeId(assignedToEmployee.getEmployeeId());
                } else {
                    throw new IllegalArgumentException("Assigned to Employee: Non-existing username.");
                }
            } else {
                bug.setAssignedToEmployeeId(null);
            }

            if (bugForm.getAssignedToTeam() != null && !bugForm.getAssignedToTeam().trim().isEmpty()) {
                Team assignedToTeam = teamService.getTeam(bugForm.getAssignedToTeam());
                if (assignedToTeam != null) {
                    bug.setAssignedToTeamId(assignedToTeam.getTeamId());
                } else {
                    throw new IllegalArgumentException("Assigned to Team: Non-existing team name.");
                }
            } else {
                bug.setAssignedToTeamId(null);
            }

            if (bugForm.getComments() != null && !bugForm.getComments().trim().isEmpty()) {
                bug.setComments(bugForm.getComments());
            } else {
                bug.setComments(null);
            }

            if (bugForm.getStatus() != null && !bugForm.getStatus().trim().isEmpty()) {
                bug.setStatus(containsIgnoreCase(bugForm.getStatus().trim(), STATUS_LIST));
            } else {
                bug.setStatus(null);
            }

            if (bugForm.getPriority() != null && !bugForm.getPriority().trim().isEmpty()) {
                bug.setPriority(containsIgnoreCase(bugForm.getPriority().trim(), PRIORITY_LIST));
            } else {
                bug.setPriority(null);
            }

            if (bugForm.getResolution() != null && !bugForm.getResolution().trim().isEmpty()) {
                bug.setResolution(containsIgnoreCase(bugForm.getResolution().trim(), RESOLUTION_LIST));
            } else {
                bug.setResolution(null);
            }

            if (bugForm.getResolutionVersion() != null && !bugForm.getResolutionVersion().trim().isEmpty()) {
                bug.setResolutionVersion(bugForm.getResolutionVersion());
            } else {
                bug.setResolutionVersion(null);
            }

            if (bugForm.getResolvedBy() != null && !bugForm.getResolvedBy().trim().isEmpty()) {
                Employee resolvedBy = employeeService.getEmployee(bugForm.getResolvedBy());
                if (resolvedBy != null) {
                    bug.setResolvedBy(resolvedBy.getEmployeeId());
                } else {
                    throw new IllegalArgumentException("Resolved by: Non-existing username.");
                }
            } else {
                bug.setResolvedBy(null);
            }

            if (bugForm.getResolvedDate() != null) {
                bug.setResolvedDate(bugForm.getResolvedDate());
            } else {
                bug.setResolvedDate(null);
            }

            if (bugForm.getResolutionTestedBy() != null && !bugForm.getResolutionTestedBy().trim().isEmpty()) {
                Employee resolutionTestedBy = employeeService.getEmployee(bugForm.getResolutionTestedBy());
                if (resolutionTestedBy != null) {
                    bug.setResolutionTestedBy(resolutionTestedBy.getEmployeeId());
                } else {
                    throw new IllegalArgumentException("Resolution Tested By: Non-existing username.");
                }
            } else {
                bug.setResolutionTestedBy(null);
            }

            if (bugForm.getResolutionTestedDate() != null) {
                bug.setResolutionTestedDate(bugForm.getResolutionTestedDate());
            } else {
                bug.setResolutionTestedDate(null);
            }
        }

        bug = bugRepo.save(bug);

        MultipartFile[] files = bugForm.getFiles();
        if (files != null && files.length > 0) {
            try {
                for (MultipartFile file : files) {
                    attachmentService.saveAttachment(file, bug.getProblemReportNumber());
                }
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        return bug;
    }

    @Transactional
    public void deleteBug(Long problemReportNumber) {
        if (problemReportNumber == null) {
            return;
        }
        bugRepo.deleteById(problemReportNumber);
    }

    @Transactional
    public void deleteBugAssociates(Long problemReportNumber) {
        if (problemReportNumber == null) {
            return;
        }
        attachmentService.deleteAttachmentByProblemReportNumber(problemReportNumber);
        deleteBug(problemReportNumber);
    }

    @Transactional
    public void deleteBugAssociatesByEmployeeId(Long employeeId) {
        if (employeeId == null) {
            return;
        }
        List<Bug> bugList = bugRepo.findByReportedByOrAssignedToEmployeeIdOrResolvedByOrResolutionTestedBy(employeeId,
                employeeId, employeeId, employeeId);
        for (Bug bug : bugList) {
            deleteBugAssociates(bug.getProblemReportNumber());
        }
    }

    @Transactional
    public void deleteBugAssociatesByProgram(Long programId) {
        if (programId == null) {
            return;
        }
        List<Bug> bugList = bugRepo.findByProgramId(programId);
        for (Bug bug : bugList) {
            deleteBugAssociates(bug.getProblemReportNumber());
        }
    }

    @Transactional
    public void deleteBugAssociatesByFunctionalArea(Long functionalAreaId) {
        if (functionalAreaId == null) {
            return;
        }
        List<Bug> bugList = bugRepo.findByFunctionalAreaId(functionalAreaId);
        for (Bug bug : bugList) {
            deleteBugAssociates(bug.getProblemReportNumber());
        }
    }

    @Transactional
    public void deleteBugAssociatesByTeam(Long teamId) {
        if (teamId == null) {
            return;
        }
        List<Employee> empList = employeeService.getEmployeesByTeam(teamId);
        for (Employee emp : empList) {
            deleteBugAssociatesByEmployeeId(emp.getEmployeeId());
            employeeService.deleteEmployee(emp.getEmployeeId());
        }
        List<Bug> bugList = bugRepo.findByAssignedToTeamId(teamId);
        for (Bug bug : bugList) {
            deleteBugAssociates(bug.getProblemReportNumber());
        }
    }

    public BugPageInfo getBugs(int limit, int offset) {
        Long count = bugRepo.count();
        if (count == 0 || count == null) {
            return new BugPageInfo(null, 0L);
        }

        Pageable pageable = PageRequest.of(offset / limit, limit);
        List<Bug> bugs = bugRepo.findAll(pageable).getContent();
        List<BugForm> bugForms = convertToBugForm(bugs);

        return new BugPageInfo(bugForms, count);

    }

    public BugPageInfo getFilterBugs(BugForm bugForm, int limit, int offset) {
        if (bugForm == null) {
            return null;
        }

        Bug bug = new Bug();
        ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreNullValues();

        if (bugForm.getProblemReportNumber() != null) {
            bug.setProblemReportNumber(bugForm.getProblemReportNumber());
        }

        if (bugForm.getProgramName() != null && !bugForm.getProgramName().trim().isEmpty()) {
            Program program = programService.getProgram(bugForm.getProgramName());
            if (program == null) {
                return new BugPageInfo(null, 0L);
            }
            bug.setProgramId(program.getProgramId());
        }

        if (bugForm.getReportType() != null && !bugForm.getReportType().trim().isEmpty()) {
            bug.setReportType(bugForm.getReportType());
        }

        if (bugForm.getSeverity() != null && !bugForm.getSeverity().trim().isEmpty()) {
            bug.setSeverity(containsIgnoreCase(bugForm.getSeverity().trim(), SEVERITY_LIST));
        }

        if (bugForm.getReportedBy() != null && !bugForm.getReportedBy().trim().isEmpty()) {
            bug.setReportedBy(employeeService.getEmployee(bugForm.getReportedBy()).getEmployeeId());
        }

        if (bugForm.getDateReported() != null) {
            bug.setDateReported(bugForm.getDateReported());
        }

        if (bugForm.getFunctionalArea() != null && !bugForm.getFunctionalArea().trim().isEmpty()) {
            FunctionalArea functionalArea = functionalAreaService
                    .getFunctionalArea(bugForm.getFunctionalArea());
            if (functionalArea == null) {
                return new BugPageInfo(null, 0L);
            }
            bug.setFunctionalAreaId(functionalArea.getFunctionalAreaId());
        }

        if (bugForm.getAssignedToEmployee() != null && !bugForm.getAssignedToEmployee().trim().isEmpty()) {
            Employee assignedToEmployee = employeeService.getEmployee(bugForm.getAssignedToEmployee());
            if (assignedToEmployee == null) {
                return new BugPageInfo(null, 0L);
            }
            bug.setAssignedToEmployeeId(assignedToEmployee.getEmployeeId());
        }

        if (bugForm.getAssignedToTeam() != null && !bugForm.getAssignedToTeam().trim().isEmpty()) {
            Team assignedToTeam = teamService.getTeam(bugForm.getAssignedToTeam());
            if (assignedToTeam == null) {
                return new BugPageInfo(null, 0L);
            }
            bug.setAssignedToTeamId(assignedToTeam.getTeamId());
        }

        if (bugForm.getStatus() != null && !bugForm.getStatus().trim().isEmpty()) {
            bug.setStatus(containsIgnoreCase(bugForm.getStatus().trim(), STATUS_LIST));
        }

        if (bugForm.getPriority() != null && !bugForm.getPriority().trim().isEmpty()) {
            bug.setPriority(containsIgnoreCase(bugForm.getPriority().trim(), PRIORITY_LIST));
        }

        if (bugForm.getResolution() != null && !bugForm.getResolution().trim().isEmpty()) {
            bug.setResolution(containsIgnoreCase(bugForm.getResolution().trim(), RESOLUTION_LIST));
        }

        if (bugForm.getResolvedBy() != null && !bugForm.getResolvedBy().trim().isEmpty()) {
            Employee resolvedBy = employeeService.getEmployee(bugForm.getResolvedBy());
            if (resolvedBy == null) {
                return new BugPageInfo(null, 0L);
            }
            bug.setResolvedBy(resolvedBy.getEmployeeId());
        }

        Example<Bug> exampleQuery = Example.of(bug, matcher);

        Long count = bugRepo.count(exampleQuery);
        if (count == 0 || count == null) {
            return new BugPageInfo(null, 0L);
        }

        Pageable pageable = PageRequest.of(offset / limit, limit);
        List<Bug> bugs = bugRepo.findAll(exampleQuery, pageable).getContent();
        List<BugForm> bugForms = convertToBugForm(bugs);

        return new BugPageInfo(bugForms, count);
    }

    public BugPageInfo getSearchBugs(String query, int limit, int offset) {
        if (query == null || query.trim().isEmpty()) {
            return null;
        }
        Long count = bugRepo
                .countByProblemSummaryIgnoreCaseContainingOrProblemDescriptionIgnoreCaseContainingOrSuggestedFixIgnoreCaseContainingOrCommentsIgnoreCaseContaining(
                        query, query, query, query);
        if (count == 0 || count == null) {
            return new BugPageInfo(null, 0L);
        }

        Pageable pageable = PageRequest.of(offset / limit, limit);

        List<Bug> bugs = bugRepo
                .findByProblemSummaryIgnoreCaseContainingOrProblemDescriptionIgnoreCaseContainingOrSuggestedFixIgnoreCaseContainingOrCommentsIgnoreCaseContaining(
                        query, query, query, query, pageable);
        List<BugForm> bugForms = convertToBugForm(bugs);

        return new BugPageInfo(bugForms, count);
    }

    List<BugForm> convertToBugForm(List<Bug> bugs) {
        if (bugs == null) {
            return null;
        }

        List<BugForm> bugForms = new ArrayList<BugForm>();
        bugs.forEach(bug -> {
            BugForm bugForm = new BugForm();
            bugForm.setProblemReportNumber(bug.getProblemReportNumber());

            Program program = programService.getProgramById(bug.getProgramId());
            if (program != null) {
                bugForm.setProgramName(program.getProgramName());
            }

            bugForm.setReportType(bug.getReportType());
            bugForm.setSeverity(bug.getSeverity());
            bugForm.setProblemSummary(bug.getProblemSummary());
            bugForm.setCanReproduce(bug.getCanReproduce());
            bugForm.setProblemDescription(bug.getProblemDescription());
            bugForm.setSuggestedFix(bug.getSuggestedFix());

            Employee employee = employeeService.getEmployeeById(bug.getReportedBy());
            if (employee != null) {
                bugForm.setReportedBy(employee.getUsername());
            }

            bugForm.setDateReported(bug.getDateReported());

            FunctionalArea functionalArea = functionalAreaService.getFunctionalAreaById(bug.getFunctionalAreaId());
            if (functionalArea != null) {
                bugForm.setFunctionalArea(functionalArea.getAreaName());
            }

            employee = employeeService.getEmployeeById(bug.getAssignedToEmployeeId());
            if (employee != null) {
                bugForm.setAssignedToEmployee(employee.getUsername());
            }

            Team team = teamService.getTeamById(bug.getAssignedToTeamId());
            if (team != null) {
                bugForm.setAssignedToTeam(team.getTeamName());
            }

            bugForm.setComments(bug.getComments());
            bugForm.setStatus(bug.getStatus());
            bugForm.setPriority(bug.getPriority());
            bugForm.setResolution(bug.getResolution());
            bugForm.setResolutionVersion(bug.getResolutionVersion());

            employee = employeeService.getEmployeeById(bug.getResolvedBy());
            if (employee != null) {
                bugForm.setResolvedBy(employee.getUsername());
            }

            bugForm.setResolvedDate(bug.getResolvedDate());

            employee = employeeService.getEmployeeById(bug.getResolutionTestedBy());
            if (employee != null) {
                bugForm.setResolutionTestedBy(employee.getUsername());
            }

            bugForm.setResolutionTestedDate(bug.getResolutionTestedDate());

            bugForms.add(bugForm);
        });
        return bugForms;
    }

    private String containsIgnoreCase(String str, String[] strArr) {
        for (String s : strArr) {
            if (s.equalsIgnoreCase(str)) {
                return s;
            }
        }
        return null;
    }

}
