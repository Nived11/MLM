import { useState } from "react";
import api from "../../../lib/api";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";

export const useDownloads = () => {
  const [downloadPDFLoading, setDownloadPDFLoading] = useState(false);
  const [downloadCSVLoading, setDownloadCSVLoading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  const fetchFile = async (
    endpoint: string,
    filename: string,
    mimeType: string,
    type: string
  ) => {
    try {
      type === "pdf"
        ? setDownloadPDFLoading(true)
        : setDownloadCSVLoading(true);
      setDownloadError("");

      const response = await api.get(endpoint, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: mimeType });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setDownloadError(extractErrorMessages(error));
    } finally {
      type === "pdf"
        ? setDownloadPDFLoading(false)
        : setDownloadCSVLoading(false);
    }
  };

  const fetchPdf = () =>
    fetchFile(
      "/payments/export-pdf/",
      "payments.pdf",
      "application/pdf",
      "pdf"
    );

  const fetchCsv = () =>
    fetchFile("/payments/export-csv/", "payments.csv", "text/csv", "csv");

  return {
    downloadPDFLoading,
    downloadCSVLoading,
    downloadError,
    fetchPdf,
    fetchCsv,
  };
};
