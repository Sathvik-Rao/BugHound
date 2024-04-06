package com.og.bughound.repo;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.og.bughound.model.Attachment;

public interface AttachmentRepo extends JpaRepository<Attachment, Long> {
    List<Attachment> findByProblemReportNumber(Long problemReportNumber);

    Attachment findOneByProblemReportNumberAndFileName(Long problemReportNumber, String fileName);

    Attachment findOneByAttachmentIdAndProblemReportNumber(Long attachmentId, Long problemReportNumber);

    @Query("SELECT NEW com.og.bughound.model.Attachment(a.attachmentId, a.problemReportNumber, a.fileName) " +
            "FROM Attachment a " +
            "WHERE a.problemReportNumber = :problemReportNumber")
    List<Attachment> findAttachmentFilesByProblemReportNumber(@Param("problemReportNumber") Long problemReportNumber);

    Long removeByProblemReportNumber(Long problemReportNumber);
}
