interface Attachment {
  attachmentId?: number;
  problemReportNumber?: number;
  fileName?: string | null;
  attachmentContent?: ArrayBuffer | null;
}

export default Attachment;
