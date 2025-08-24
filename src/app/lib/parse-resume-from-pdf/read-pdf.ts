// pdfjs-dist worker setup for Webpack/Next.js (v4+ has removed pdf.worker.entry)
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
// Use a CDN worker to avoid bundler-specific URL handling issues
if (typeof window !== "undefined") {
  const PDFJS_VERSION = "5.1.91"; // keep in sync with package.json
  GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;
}

import type { TextItem as PdfjsTextItem } from "pdfjs-dist/types/src/display/api";
import type { TextItem, TextItems } from "lib/parse-resume-from-pdf/types";

/**
 * Step 1: Read pdf and output textItems by concatenating results from each page.
 *
 * To make processing easier, it returns a new TextItem type, which removes unused
 * attributes (dir, transform), adds x and y positions, and replaces loaded font
 * name with original font name.
 *
 * @example
 * const onFileChange = async (e) => {
 *     const fileUrl = URL.createObjectURL(e.target.files[0]);
 *     const textItems = await readPdf(fileUrl);
 * }
 */
export const readPdf = async (fileUrl: string): Promise<TextItems> => {
  const pdfFile = await getDocument(fileUrl).promise;
  let textItems: TextItems = [];

  for (let i = 1; i <= pdfFile.numPages; i++) {
    // Parse each page into text content
    const page = await pdfFile.getPage(i);
  const textContent = await page.getTextContent();

    // Wait for font data to be loaded
    await page.getOperatorList();
    const commonObjs = page.commonObjs;

    // Convert Pdfjs TextItem type to new TextItem type
    const pageTextItems = textContent.items
      .map((raw) => {
        // Defensive guards: ensure we only process valid TextItem objects
        const item = raw as unknown as Partial<PdfjsTextItem> | undefined | null;
        if (!item || typeof item !== "object") return undefined;
        const text = (item as Partial<PdfjsTextItem>).str as unknown as string;
        const transform = (item as Partial<PdfjsTextItem>).transform as unknown as number[] | undefined;
        if (typeof text !== "string" || !Array.isArray(transform) || transform.length < 6) {
          return undefined;
        }
        const pdfFontName = (item as Partial<PdfjsTextItem>).fontName as unknown as string | undefined;

        // Extract x, y position of text item from transform.
        // As a side note, origin (0, 0) is bottom left.
        // Reference: https://github.com/mozilla/pdf.js/issues/5643#issuecomment-496648719
        const x = transform[4];
        const y = transform[5];

        // Use commonObjs to convert font name to original name (e.g. "GVDLYI+Arial-BoldMT")
        // since non system font name by default is a loaded name, e.g. "g_d8_f1"
        // Reference: https://github.com/mozilla/pdf.js/pull/15659
        let fontName = typeof pdfFontName === "string" ? pdfFontName : "";
        try {
          const fontObj = pdfFontName ? (commonObjs as any)?.get?.(pdfFontName) : undefined;
          if (fontObj && typeof fontObj.name === "string") {
            fontName = fontObj.name;
          }
        } catch {
          // Fallback to loaded font name if commonObjs lookup fails
        }

        // pdfjs reads a "-" as "-­‐" in the resume example. This is to revert it.
        // Note "-­‐" is "-&#x00AD;‐" with a soft hyphen in between. It is not the same as "--"
        const newText = text.replace(/-­‐/g, "-");

        // Pick only the fields we actually need; avoid object rest/spread on pdfjs objects
        const width = (item as any)?.width ?? 0;
        const height = (item as any)?.height ?? 0;
        const hasEOL = Boolean((item as any)?.hasEOL);

        const newItem: TextItem = {
          text: newText,
          x,
          y,
          width,
          height,
          fontName,
          hasEOL,
        };
        return newItem;
      })
      .filter((v): v is TextItem => Boolean(v));

    // Some pdf's text items are not in order. This is most likely a result of creating it
    // from design softwares, e.g. canvas. The commented out method can sort pageTextItems
    // by y position to put them back in order. But it is not used since it might be more
    // helpful to let users know that the pdf is not in order.
    // pageTextItems.sort((a, b) => Math.round(b.y) - Math.round(a.y));

    // Add text items of each page to total
    textItems.push(...pageTextItems);
  }

  // Filter out empty space textItem noise
  const isEmptySpace = (textItem: TextItem) =>
    !textItem.hasEOL && textItem.text.trim() === "";
  textItems = textItems.filter((textItem) => !isEmptySpace(textItem));

  return textItems;
};
