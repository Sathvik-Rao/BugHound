package com.og.bughound.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.og.bughound.model.Attachment;
import com.og.bughound.repo.AttachmentRepo;

import jakarta.transaction.Transactional;

@Service
public class AttachmentService {
    private final AttachmentRepo attachmentRepo;

    public AttachmentService(AttachmentRepo attachmentRepo) {
        this.attachmentRepo = attachmentRepo;
    }

    @Transactional
    public Attachment saveAttachment(MultipartFile file, Long problemReportNumber) throws IOException {
        if (file != null &&
                problemReportNumber != null &&
                getAttachment(problemReportNumber, file) == null) {
            Attachment attachment = new Attachment();
            attachment.setProblemReportNumber(problemReportNumber);
            attachment.setFileName(file.getOriginalFilename());
            attachment.setAttachmentContent(file.getBytes());
            return attachmentRepo.save(attachment);
        }
        return null;
    }

    public List<Attachment> getAttachment(Long problemReportNumber) {
        return problemReportNumber == null ? null : attachmentRepo.findByProblemReportNumber(problemReportNumber);
    }

    public Attachment getAttachment(Long problemReportNumber, MultipartFile file) {
        return problemReportNumber == null || file == null ? null
                : attachmentRepo.findOneByProblemReportNumberAndFileName(problemReportNumber,
                        file.getOriginalFilename());
    }

    public Attachment getAttachment(Long attachmentId, Long problemReportNumber) {
        return attachmentId == null || problemReportNumber == null ? null
                : attachmentRepo.findOneByAttachmentIdAndProblemReportNumber(attachmentId, problemReportNumber);
    }

    public List<Attachment> getFileNames(Long problemReportNumber) {
        return problemReportNumber == null ? null
                : attachmentRepo.findAttachmentFilesByProblemReportNumber(problemReportNumber);
    }

    @Transactional
    public void deleteAttachment(Long attachmentId) {
        if (attachmentId == null) {
            return;
        }
        attachmentRepo.deleteById(attachmentId);
    }

    @Transactional
    public Long deleteAttachmentByProblemReportNumber(Long problemReportNumber) {
        if (problemReportNumber == null) {
            return 0L;
        }
        return attachmentRepo.removeByProblemReportNumber(problemReportNumber);
    }
}
