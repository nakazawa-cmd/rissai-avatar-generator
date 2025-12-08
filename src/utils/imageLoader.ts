/**
 * 画像ファイルを読み込んでImageオブジェクトを返す
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // CORSエラーを防ぐ
    img.onload = () => {
      console.log(`Image loaded successfully: ${src}`);
      resolve(img);
    };
    img.onerror = (error) => {
      console.error(`Failed to load image: ${src}`, error);
      // エラーをリジェクトするが、再試行ロジックのためにエラーオブジェクトを返す
      reject(new Error(`Failed to load image: ${src}`));
    };
    // キャッシュバスターを追加して、確実にサーバーから取得する
    img.src = `${src}?t=${new Date().getTime()}`;
  });
}

/**
 * SVGファイルを読み込んでImageオブジェクトを返す
 */
export async function loadSVG(src: string): Promise<HTMLImageElement> {
  try {
    const response = await fetch(src);
    const svgText = await response.text();
    const blob = new Blob([svgText], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = await loadImage(url);
    URL.revokeObjectURL(url);
    return img;
  } catch (error) {
    console.error(`Failed to load SVG: ${src}`, error);
    throw error;
  }
}

/**
 * 画像ファイル（PNG/SVG）を読み込む
 * 拡張子に応じて適切な方法で読み込む
 */
export async function loadPartImage(src: string): Promise<HTMLImageElement> {
  if (src.endsWith('.svg')) {
    return loadSVG(src);
  } else {
    return loadImage(src);
  }
}

/**
 * Canvasに画像を描画する
 */
export function drawImageOnCanvas(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  ctx.drawImage(img, x, y, width, height);
}

