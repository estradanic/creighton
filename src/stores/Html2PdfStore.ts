import { createSignal } from "solid-js";
import { Html2Pdf } from "html2pdf.js";

const [_html2pdf, setHtml2pdf] = createSignal<Html2Pdf>();

const html2pdf = async (): Promise<Html2Pdf> => {
  const cached = _html2pdf();
  if (!cached) {
    const { default: module } = await import("html2pdf.js");
    setHtml2pdf(() => module);
    return module;
  }

  return cached;
};

export default html2pdf;
