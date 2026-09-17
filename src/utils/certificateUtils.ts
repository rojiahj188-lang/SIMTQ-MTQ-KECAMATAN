import QRCode from 'qrcode';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export async function generateQrDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: 256,
      margin: 1,
      color: {
        dark: '#064e3b', // Emerald-900 Islamic theme
        light: '#ffffff'
      }
    });
  } catch (err) {
    console.error('Failed to generate QR code', err);
    return '';
  }
}

export function formatDateIndonesian(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d);
  } catch {
    return dateString;
  }
}

/**
 * Clean string for safe file name
 */
export function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9_\- ]/g, '').trim().replace(/\s+/g, '_');
}

/**
 * Export any HTML element as an official A4 PDF (Portrait or Landscape)
 */
export async function downloadElementAsPdf(
  element: HTMLElement,
  fileName: string = 'Dokumen_MTQ.pdf',
  orientation: 'portrait' | 'landscape' = 'landscape'
): Promise<boolean> {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    
    // A4 dimensions: 210mm x 297mm (portrait) or 297mm x 210mm (landscape)
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pageWidth = orientation === 'landscape' ? 297 : 210;
    const pageHeight = orientation === 'landscape' ? 210 : 297;

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    if (imgHeight <= pageHeight) {
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
    } else {
      // Multi-page rendering if content exceeds 1 page
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = position - pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
      }
    }

    pdf.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}

/**
 * Export any HTML element as a high-resolution PNG image
 */
export async function downloadElementAsImage(
  element: HTMLElement,
  fileName: string = 'Piagam_MTQ.png'
): Promise<boolean> {
  try {
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0
    });

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (error) {
    console.error('Error generating image:', error);
    return false;
  }
}

