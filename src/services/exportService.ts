import html2pdf from 'html2pdf.js';
import pptxgen from 'pptxgenjs';
import { Presentation, Slide } from '../types';

// Helper to fetch image directly and convert to base64.
// This is more reliable as it removes the dependency on external CORS proxies.
const urlToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error(`Error converting image to base64: ${url}`, error);
    return ''; // Return empty string on failure, allowing export to continue.
  }
};

export const exportToPDF = async (presentation: Presentation) => {
  const element = document.getElementById('slides-container');
  if (!element) return;

  const opt = {
    margin: 0,
    filename: `${presentation.topic.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_slides.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
    },
    jsPDF: { 
      unit: 'in', 
      format: [11, 8.5], // Landscape Letter
      orientation: 'landscape' 
    },
    pagebreak: { mode: 'css', after: '.print-page-break' }
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('Error exporting PDF:', error);
  }
};

export const exportToPPT = async (presentation: Presentation) => {
  const pptx = new pptxgen();
  pptx.defineLayout({ name: 'LAYOUT_WIDE', width: 13.33, height: 7.5 });
  pptx.layout = 'LAYOUT_WIDE';

  for (const slide of presentation.slides) {
    const pptSlide = pptx.addSlide();
    
    if (slide.backgroundColor) {
      pptSlide.background = { color: slide.backgroundColor.replace('#', '') };
    }

    const imageBase64 = slide.imageUrl ? await urlToBase64(slide.imageUrl) : null;
    const isDarkBg = !!slide.backgroundColor;

    switch (slide.layout) {
      case 'title':
        if (imageBase64) {
          pptSlide.addImage({ data: imageBase64, w: '100%', h: '100%' });
          pptSlide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: '100%', fill: { color: '000000', transparency: 50 } });
        }
        pptSlide.addText(slide.title, { x: 1, y: 2, w: 11.33, h: 2, fontSize: 44, bold: true, align: 'center', color: imageBase64 || isDarkBg ? 'FFFFFF' : '363636' });
        if (slide.subtitle) {
          pptSlide.addText(slide.subtitle, { x: 1, y: 4, w: 11.33, h: 1, fontSize: 24, align: 'center', color: imageBase64 || isDarkBg ? 'EEEEEE' : '666666' });
        }
        break;

      case 'split':
        pptSlide.addText(slide.title, { x: 0.5, y: 0.5, w: 6, h: 1, fontSize: 28, bold: true, color: '363636' });
        pptSlide.addText(slide.bulletPoints.map(p => ({ text: p, options: { bullet: true } })), { x: 0.5, y: 1.5, w: 6, h: 5.5, fontSize: 14, color: '444444' });
        if (imageBase64) {
          pptSlide.addImage({ data: imageBase64, x: 7, y: 1.5, w: 5.83, h: 4.5 });
        }
        break;

      case 'image':
        pptSlide.addText(slide.title, { x: 0.5, y: 0.5, w: 12.33, h: 1, fontSize: 32, bold: true, color: '363636' });
        if (imageBase64) {
          pptSlide.addImage({ data: imageBase64, x: 1, y: 1.5, w: 11.33, h: 5 });
        }
        break;

      case 'detailed':
        pptSlide.addText(slide.title, { x: 0.5, y: 0.25, w: 9, h: 0.75, fontSize: 28, bold: true, color: '363636' });
        pptSlide.addText(slide.detailedContent || '', { x: 0.5, y: 1, w: 9, h: 6, fontSize: 11, color: '444444' });
        if (imageBase64) {
          pptSlide.addImage({ data: imageBase64, x: 9.83, y: 1.5, w: 3, h: 2.25 });
        }
        const secondaryImageBase64 = slide.secondaryImageUrl ? await urlToBase64(slide.secondaryImageUrl) : null;
        if (secondaryImageBase64) {
          pptSlide.addImage({ data: secondaryImageBase64, x: 9.83, y: 4.25, w: 3, h: 2.25 });
        }
        break;

      case 'conclusion':
        if (imageBase64) {
          pptSlide.addImage({ data: imageBase64, w: '100%', h: '100%' });
          pptSlide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: '100%', fill: { color: '000000', transparency: 50 } });
        }
        pptSlide.addText(slide.title, { x: 1, y: 1, w: 11.33, h: 1.5, fontSize: 36, bold: true, align: 'center', color: imageBase64 || isDarkBg ? 'FFFFFF' : '363636' });
        pptSlide.addText(slide.bulletPoints.map(p => ({ text: p, options: { bullet: { type: 'star' } } })), { x: 2, y: 3, w: 9.33, h: 4, fontSize: 18, color: imageBase64 || isDarkBg ? 'EEEEEE' : '444444' });
        break;

      default: // content layout
        pptSlide.addText(slide.title, { x: 0.5, y: 0.5, w: 12.33, h: 1, fontSize: 32, bold: true, color: '363636' });
        const midpoint = Math.ceil(slide.bulletPoints.length / 2);
        const leftPoints = slide.bulletPoints.slice(0, midpoint);
        const rightPoints = slide.bulletPoints.slice(midpoint);
        pptSlide.addText(leftPoints.map(p => ({ text: p, options: { bullet: true } })), { x: 0.5, y: 1.5, w: 6, h: 5.5, fontSize: 14, color: '444444' });
        if (rightPoints.length > 0) {
          pptSlide.addText(rightPoints.map(p => ({ text: p, options: { bullet: true } })), { x: 7, y: 1.5, w: 6, h: 5.5, fontSize: 14, color: '444444' });
        }
        break;
    }
  }

  try {
    await pptx.writeFile({ fileName: `${presentation.topic.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_slides.pptx` });
  } catch (error) {
    console.error('Error exporting PPT:', error);
  }
};
