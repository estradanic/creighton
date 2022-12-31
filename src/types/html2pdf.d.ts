declare module "html2pdf.js" {
  type Html2PdfOptions = {
    margin?: number | [number, number] | [number, number, number, number]
    filename?: string
    image?: { type: "jpeg" | "png" | "bmp", quality: number }
    enableLinks?: boolean
    html2canvas?: {
      allowTaint?: boolean
      backgroundColor?: string
      canvas?: HTMLCanvasElement
      foreignObjectRendering?: boolean
      imageTimeout?: number
      ignoreElements?: (e: HTMLElement) => boolean
      logging?: boolean
      onclone?: (doc: any) => void
      proxy?: string
      removeContainer?: boolean
      scale?: number
      useCORS?: boolean
      width?: number
      height?: number
      x?: number
      y?: number
      scrollX?: number
      scrollY?: number
      windowWidth?: number
      windowHeight?: number
    }
    jsPDF?: {
      orientation?: "portrait" | "landscape"
      unit?: "pt" | "mm" | "cm" | "in" | "px" | "pc" | "em" | "ex"
      format?: "a0" | "a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7"
      | "a8" | "a9" | "a10" | "b0" | "b1" | "b2" | "b3" | "b4" | "b5"
      | "b6" | "b7" | "b8" | "b9" | "b10" | "c0" | "c1" | "c2" | "c3"
      | "c4" | "c5" | "c6" | "c7" | "c8" | "c9" | "c10" | "d1" | "letter"
      | "government-letter" | "legal" | "junior-legal" | "ledger" | "tabloid" | "credit-card"
      putOnlyUsedFonts?: boolean
      compress?: boolean
      precision?: number
      userUnit?: number
      hotfixes?: string[]
      encryption?: {
        userPassword?: string
        ownerPassword?: string
        userPermissions?: string[]
      }
      floatPrecision?: number | "smart"
    }
  };

  class Html2Pdf {
    constructor (options?: Html2PdfOptions);
    from (element: Element): Html2Pdf;
    set (options: Html2PdfOptions): Html2Pdf;
    save (filename?: string): void;
  }
  export default function html2pdf (): Html2Pdf;
}
