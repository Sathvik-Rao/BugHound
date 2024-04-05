interface Bug {
  problemReportNumber?: number;
  programName?: string;
  reportType?: string;
  severity?: string;
  problemSummary?: string;
  canReproduce?: boolean;
  problemDescription?: string;
  suggestedFix?: string;
  reportedBy?: string;
  dateReported?: Date;
  functionalArea?: string;
  assignedToEmployee?: string;
  assignedToTeam?: string;
  comments?: string;
  status?: string;
  priority?: string;
  resolution?: string;
  resolutionVersion?: string;
  resolvedBy?: string;
  resolvedDate?: Date;
  resolutionTestedBy?: string;
  resolutionTestedDate?: Date;
}

export default Bug;
