package com.og.bughound.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "\"Attachment\"")
public class Attachment {

    @Id
    @Column(name = "\"Attachment_ID\"")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attachmentId;

    @Column(name = "\"Problem_Report_Number\"")
    private Long problemReportNumber;

    @Column(name = "\"File_Name\"", length = 300)
    private String fileName;

    @Column(name = "\"Attachment_Content\"", columnDefinition = "bytea")
    private byte[] attachmentContent;

    public Attachment() {
    }

    public Attachment(Long attachmentId, Long problemReportNumber, String fileName, byte[] attachmentContent) {
        this.attachmentId = attachmentId;
        this.problemReportNumber = problemReportNumber;
        this.fileName = fileName;
        this.attachmentContent = attachmentContent;
    }

    public Long getAttachmentId() {
        return this.attachmentId;
    }

    public void setAttachmentId(Long attachmentId) {
        this.attachmentId = attachmentId;
    }

    public Long getProblemReportNumber() {
        return this.problemReportNumber;
    }

    public void setProblemReportNumber(Long problemReportNumber) {
        this.problemReportNumber = problemReportNumber;
    }

    public String getFileName() {
        return this.fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getAttachmentContent() {
        return this.attachmentContent;
    }

    public void setAttachmentContent(byte[] attachmentContent) {
        this.attachmentContent = attachmentContent;
    }

    @Override
    public String toString() {
        return "{" +
                " attachmentId='" + getAttachmentId() + "'" +
                ", problemReportNumber='" + getProblemReportNumber() + "'" +
                ", fileName='" + getFileName() + "'" +
                ", attachmentContent='" + getAttachmentContent() + "'" +
                "}";
    }

}
