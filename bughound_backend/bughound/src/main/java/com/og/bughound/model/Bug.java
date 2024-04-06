package com.og.bughound.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "\"Bug\"")
public class Bug {

    @Id
    @Column(name = "\"Problem_Report_Number\"")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long problemReportNumber;

    @Column(name = "\"Program_ID\"")
    private Long programId;

    @Column(name = "\"Report_Type\"", length = 100)
    private String reportType;

    @Column(name = "\"Severity\"", length = 100)
    private String severity;

    @Column(name = "\"Problem_Summary\"", length = 8000)
    private String problemSummary;

    @Column(name = "\"Can_Reproduce\"")
    private Boolean canReproduce;

    @Column(name = "\"Problem_Description\"", length = 8000)
    private String problemDescription;

    @Column(name = "\"Suggested_Fix\"", length = 8000)
    private String suggestedFix;

    @Column(name = "\"Reported_By\"")
    private Long reportedBy;

    @Column(name = "\"Date_Reported\"")
    private Date dateReported;

    @Column(name = "\"Functional_Area_ID\"")
    private Long functionalAreaId;

    @Column(name = "\"Assigned_To_Employee_ID\"")
    private Long assignedToEmployeeId;

    @Column(name = "\"Assigned_To_Team_ID\"")
    private Long assignedToTeamId;

    @Column(name = "\"Comments\"", length = 8000)
    private String comments;

    @Column(name = "\"Status\"", length = 100)
    private String status;

    @Column(name = "\"Priority\"", length = 100)
    private String priority;

    @Column(name = "\"Resolution\"", length = 100)
    private String resolution;

    @Column(name = "\"Resolution_Version\"", length = 100)
    private String resolutionVersion;

    @Column(name = "\"Resolved_By\"")
    private Long resolvedBy;

    @Column(name = "\"Resolved_Date\"")
    private Date resolvedDate;

    @Column(name = "\"Resolution_Tested_By\"")
    private Long resolutionTestedBy;

    @Column(name = "\"Resolution_Tested_Date\"")
    private Date resolutionTestedDate;

    public Bug() {
    }

    public Bug(Long problemReportNumber, Long programId, String reportType, String severity, String problemSummary,
            Boolean canReproduce, String problemDescription, String suggestedFix, Long reportedBy, Date dateReported,
            Long functionalAreaId, Long assignedToEmployeeId, Long assignedToTeamId, String comments, String status,
            String priority, String resolution, String resolutionVersion, Long resolvedBy, Date resolvedDate,
            Long resolutionTestedBy, Date resolutionTestedDate) {
        this.problemReportNumber = problemReportNumber;
        this.programId = programId;
        this.reportType = reportType;
        this.severity = severity;
        this.problemSummary = problemSummary;
        this.canReproduce = canReproduce;
        this.problemDescription = problemDescription;
        this.suggestedFix = suggestedFix;
        this.reportedBy = reportedBy;
        this.dateReported = dateReported;
        this.functionalAreaId = functionalAreaId;
        this.assignedToEmployeeId = assignedToEmployeeId;
        this.assignedToTeamId = assignedToTeamId;
        this.comments = comments;
        this.status = status;
        this.priority = priority;
        this.resolution = resolution;
        this.resolutionVersion = resolutionVersion;
        this.resolvedBy = resolvedBy;
        this.resolvedDate = resolvedDate;
        this.resolutionTestedBy = resolutionTestedBy;
        this.resolutionTestedDate = resolutionTestedDate;
    }

    public Long getProblemReportNumber() {
        return this.problemReportNumber;
    }

    public void setProblemReportNumber(Long problemReportNumber) {
        this.problemReportNumber = problemReportNumber;
    }

    public Long getProgramId() {
        return this.programId;
    }

    public void setProgramId(Long programId) {
        this.programId = programId;
    }

    public String getReportType() {
        return this.reportType;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }

    public String getSeverity() {
        return this.severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getProblemSummary() {
        return this.problemSummary;
    }

    public void setProblemSummary(String problemSummary) {
        this.problemSummary = problemSummary;
    }

    public Boolean isCanReproduce() {
        return this.canReproduce;
    }

    public Boolean getCanReproduce() {
        return this.canReproduce;
    }

    public void setCanReproduce(Boolean canReproduce) {
        this.canReproduce = canReproduce;
    }

    public String getProblemDescription() {
        return this.problemDescription;
    }

    public void setProblemDescription(String problemDescription) {
        this.problemDescription = problemDescription;
    }

    public String getSuggestedFix() {
        return this.suggestedFix;
    }

    public void setSuggestedFix(String suggestedFix) {
        this.suggestedFix = suggestedFix;
    }

    public Long getReportedBy() {
        return this.reportedBy;
    }

    public void setReportedBy(Long reportedBy) {
        this.reportedBy = reportedBy;
    }

    public Date getDateReported() {
        return this.dateReported;
    }

    public void setDateReported(Date dateReported) {
        this.dateReported = dateReported;
    }

    public Long getFunctionalAreaId() {
        return this.functionalAreaId;
    }

    public void setFunctionalAreaId(Long functionalAreaId) {
        this.functionalAreaId = functionalAreaId;
    }

    public Long getAssignedToEmployeeId() {
        return this.assignedToEmployeeId;
    }

    public void setAssignedToEmployeeId(Long assignedToEmployeeId) {
        this.assignedToEmployeeId = assignedToEmployeeId;
    }

    public Long getAssignedToTeamId() {
        return this.assignedToTeamId;
    }

    public void setAssignedToTeamId(Long assignedToTeamId) {
        this.assignedToTeamId = assignedToTeamId;
    }

    public String getComments() {
        return this.comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriority() {
        return this.priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getResolution() {
        return this.resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public String getResolutionVersion() {
        return this.resolutionVersion;
    }

    public void setResolutionVersion(String resolutionVersion) {
        this.resolutionVersion = resolutionVersion;
    }

    public Long getResolvedBy() {
        return this.resolvedBy;
    }

    public void setResolvedBy(Long resolvedBy) {
        this.resolvedBy = resolvedBy;
    }

    public Date getResolvedDate() {
        return this.resolvedDate;
    }

    public void setResolvedDate(Date resolvedDate) {
        this.resolvedDate = resolvedDate;
    }

    public Long getResolutionTestedBy() {
        return this.resolutionTestedBy;
    }

    public void setResolutionTestedBy(Long resolutionTestedBy) {
        this.resolutionTestedBy = resolutionTestedBy;
    }

    public Date getResolutionTestedDate() {
        return this.resolutionTestedDate;
    }

    public void setResolutionTestedDate(Date resolutionTestedDate) {
        this.resolutionTestedDate = resolutionTestedDate;
    }

    @Override
    public String toString() {
        return "{" +
                " problemReportNumber='" + getProblemReportNumber() + "'" +
                ", programId='" + getProgramId() + "'" +
                ", reportType='" + getReportType() + "'" +
                ", severity='" + getSeverity() + "'" +
                ", problemSummary='" + getProblemSummary() + "'" +
                ", canReproduce='" + isCanReproduce() + "'" +
                ", problemDescription='" + getProblemDescription() + "'" +
                ", suggestedFix='" + getSuggestedFix() + "'" +
                ", reportedBy='" + getReportedBy() + "'" +
                ", dateReported='" + getDateReported() + "'" +
                ", functionalAreaId='" + getFunctionalAreaId() + "'" +
                ", assignedToEmployeeId='" + getAssignedToEmployeeId() + "'" +
                ", assignedToTeamId='" + getAssignedToTeamId() + "'" +
                ", comments='" + getComments() + "'" +
                ", status='" + getStatus() + "'" +
                ", priority='" + getPriority() + "'" +
                ", resolution='" + getResolution() + "'" +
                ", resolutionVersion='" + getResolutionVersion() + "'" +
                ", resolvedBy='" + getResolvedBy() + "'" +
                ", resolvedDate='" + getResolvedDate() + "'" +
                ", resolutionTestedBy='" + getResolutionTestedBy() + "'" +
                ", resolutionTestedDate='" + getResolutionTestedDate() + "'" +
                "}";
    }

}
