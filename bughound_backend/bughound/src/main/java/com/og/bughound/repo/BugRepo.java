package com.og.bughound.repo;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.og.bughound.model.Bug;

public interface BugRepo extends JpaRepository<Bug, Long> {

        List<Bug> findByProblemSummaryIgnoreCaseContainingOrProblemDescriptionIgnoreCaseContainingOrSuggestedFixIgnoreCaseContainingOrCommentsIgnoreCaseContaining(
                        String problemSummary, String problemDescription, String suggestedFix, String comments,
                        Pageable pageable);

        Long countByProblemSummaryIgnoreCaseContainingOrProblemDescriptionIgnoreCaseContainingOrSuggestedFixIgnoreCaseContainingOrCommentsIgnoreCaseContaining(
                        String problemSummary, String problemDescription, String suggestedFix, String comments);

        List<Bug> findByReportedByOrAssignedToEmployeeIdOrResolvedByOrResolutionTestedBy(
                        Long reportedBy,
                        Long assignedToEmployeeId,
                        Long resolvedBy,
                        Long resolutionTestedBy);

        List<Bug> findByProgramId(Long programId);

        List<Bug> findByFunctionalAreaId(Long functionalAreaId);

        List<Bug> findByAssignedToTeamId(Long teamId);
}
