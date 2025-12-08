/**
 * アバターをPNGとしてダウンロードする
 */
export function downloadAvatarAsPNG(
  canvas: HTMLCanvasElement,
  filename?: string
): void {
  canvas.toBlob((blob) => {
    if (!blob) {
      console.error('Failed to create blob');
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `rissai-avatar-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 'image/png');
}


