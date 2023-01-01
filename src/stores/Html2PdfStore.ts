import { createSignal } from "solid-js";
import { Html2Pdf } from "html2pdf.js";

const [html2pdf, setHtml2pdf] = createSignal<Html2Pdf>();

export type Html2PdfStoreReturn = Html2Pdf;

const Html2PdfStore = async (): Promise<Html2PdfStoreReturn> => {
  const cached = html2pdf();
  if (!cached) {
    const { default: module } = await import("html2pdf.js");
    setHtml2pdf(() => module);
    return module;
  }

  return cached;
};

export default Html2PdfStore;
