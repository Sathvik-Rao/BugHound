package com.og.bughound.model;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

public class BugForm {
    private final String dateFormat = "yyyy-MM-dd";

    private Long problemReportNumber;
    private String programName;
    private String reportType;
    private String severity;
    private String problemSummary;
    private Boolean canReproduce;
    private String problemDescription;
    private String suggestedFix;
    private String reportedBy;
    @DateTimeFormat(pattern = dateFormat)
    private Date dateReported;
    private MultipartFile[] files;
    private String functionalArea;
    private String assignedToEmployee;
    private String assignedToTeam;
    private String comments;
    private String status;
    private String priority;
    private String resolution;
    private String resolutionVersion;
    private String resolvedBy;
    @DateTimeFormat(pattern = dateFormat)
    private Date resolvedDate;
    private String resolutionTestedBy;
    @DateTimeFormat(pattern = dateFormat)
    private Date resolutionTestedDate;

    public BugForm() {
    }

    public BugForm(Long problemReportNumber, String programName, String reportType, String severity,
            String problemSummary, Boolean canReproduce, String problemDescription, String suggestedFix,
            String reportedBy, Date dateReported, MultipartFile[] files, String functionalArea,
            String assignedToEmployee, String assignedToTeam, String comments, String status, String priority,
            String resolution, String resolutionVersion, String resolvedBy, Date resolvedDate,
            String resolutionTestedBy, Date resolutionTestedDate) {
        this.problemReportNumber = problemReportNumber;
        this.programName = programName;
        this.reportType = reportType;
        this.severity = severity;
        this.problemSummary = problemSummary;
        this.canReproduce = canReproduce;
        this.problemDescription = problemDescription;
        this.suggestedFix = suggestedFix;
        this.reportedBy = reportedBy;
        this.dateReported = dateReported;
        this.files = files;
        this.functionalArea = functionalArea;
        this.assignedToEmployee = assignedToEmployee;
        this.assignedToTeam = assignedToTeam;
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

    public String getDateFormat() {
        return this.dateFormat;
    }

    public Long getProblemReportNumber() {
        return this.problemReportNumber;
    }

    public void setProblemReportNumber(Long problemReportNumber) {
        this.problemReportNumber = problemReportNumber;
    }

    public String getProgramName() {
        return this.programName;
    }

    public void setProgramName(String programName) {
        this.programName = programName;
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

    public String getReportedBy() {
        return this.reportedBy;
    }

    public void setReportedBy(String reportedBy) {
        this.reportedBy = reportedBy;
    }

    public Date getDateReported() {
        return this.dateReported;
    }

    public void setDateReported(Date dateReported) {
        this.dateReported = dateReported;
    }

    public MultipartFile[] getFiles() {
        return this.files;
    }

    public void setFiles(MultipartFile[] files) {
        this.files = files;
    }

    public String getFunctionalArea() {
        return this.functionalArea;
    }

    public void setFunctionalArea(String functionalArea) {
        this.functionalArea = functionalArea;
    }

    public String getAssignedToEmployee() {
        return this.assignedToEmployee;
    }

    public void setAssignedToEmployee(String assignedToEmployee) {
        this.assignedToEmployee = assignedToEmployee;
    }

    public String getAssignedToTeam() {
        return this.assignedToTeam;
    }

    public void setAssignedToTeam(String assignedToTeam) {
        this.assignedToTeam = assignedToTeam;
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

    public String getResolvedBy() {
        return this.resolvedBy;
    }

    public void setResolvedBy(String resolvedBy) {
        this.resolvedBy = resolvedBy;
    }

    public Date getResolvedDate() {
        return this.resolvedDate;
    }

    public void setResolvedDate(Date resolvedDate) {
        this.resolvedDate = resolvedDate;
    }

    public String getResolutionTestedBy() {
        return this.resolutionTestedBy;
    }

    public void setResolutionTestedBy(String resolutionTestedBy) {
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
                " dateFormat='" + getDateFormat() + "'" +
                ", problemReportNumber='" + getProblemReportNumber() + "'" +
                ", programName='" + getProgramName() + "'" +
                ", reportType='" + getReportType() + "'" +
                ", severity='" + getSeverity() + "'" +
                ", problemSummary='" + getProblemSummary() + "'" +
                ", canReproduce='" + isCanReproduce() + "'" +
                ", problemDescription='" + getProblemDescription() + "'" +
                ", suggestedFix='" + getSuggestedFix() + "'" +
                ", reportedBy='" + getReportedBy() + "'" +
                ", dateReported='" + getDateReported() + "'" +
                ", files='" + getFiles() + "'" +
                ", functionalArea='" + getFunctionalArea() + "'" +
                ", assignedToEmployee='" + getAssignedToEmployee() + "'" +
                ", assignedToTeam='" + getAssignedToTeam() + "'" +
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
