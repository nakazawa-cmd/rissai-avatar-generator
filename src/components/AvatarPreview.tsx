import { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import type { AvatarConfig, HairColorId } from '../types';
import { loadPartImage } from '../utils/imageLoader';

/**
 * 髪色のカラーコード定義
 * - ブラウン: やんちゃな明るい茶髪（赤みがかった）
 * - ブロンド: 外人のような明るい金髪（黄色みがかった）
 * - ブラック: 真っ黒
 */
const HAIR_COLORS: Record<HairColorId, string> = {
  color_1: '#B8860B', // ブラウン（やんちゃな明るい茶髪）
  color_2: '#FFD700', // ブロンド（明るい金髪）
  color_3: '#000000', // ブラック（真っ黒）
};

interface AvatarPreviewProps {
  config: AvatarConfig;
  size?: number;
  backgroundColor?: string;
}

export interface AvatarPreviewHandle {
  getCanvas: () => HTMLCanvasElement | null;
}

/**
 * 画像ファイルのパスを取得する
 * PNGとSVGの両方に対応（PNGを優先）
 */
function getPartImagePath(partId: string, category: string): string {
  const basePath = '/assets';
  
  switch (category) {
    case 'hair':
      return `${basePath}/hair/${partId}.png`;
    case 'eyes':
      return `${basePath}/eyes/${partId}.png`;
    case 'mouth':
      return `${basePath}/mouth/${partId}.png`;
    case 'cheeks':
      return `${basePath}/cheeks/${partId}.png`;
    default:
      return '';
  }
}

/**
 * 画像を読み込むヘルパー関数
 * PNGを試してダメならSVG、それもダメならnullを返す
 */
async function loadPart(partId: string, category: string): Promise<HTMLImageElement | null> {
  const basePath = getPartImagePath(partId, category);
  
  // PNGを試す
  const pngPath = basePath.replace(/\.(svg|png)$/, '.png');
  try {
    return await loadPartImage(pngPath);
  } catch {
    // PNGが失敗したらSVGを試す
    const svgPath = basePath.replace(/\.(svg|png)$/, '.svg');
    try {
      return await loadPartImage(svgPath);
    } catch (error) {
      console.warn(`Failed to load image for ${category}/${partId}`, error);
      return null;
    }
  }
}

/**
 * アバターのプレビューを表示するコンポーネント
 * パーツをレイヤーとして重ねて表示
 */
export const AvatarPreview = forwardRef<AvatarPreviewHandle, AvatarPreviewProps>(
  function AvatarPreview({ 
    config, 
    size = 512, 
    backgroundColor = '#f0f0f0' 
  }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => ({
      getCanvas: () => canvasRef.current,
    }));

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawAvatar = async () => {
      try {
        setImagesLoaded(false);
        setError(null);
        
        // 全ての画像を並列で読み込む
        const [hairImg, eyesImg, mouthImg, cheekImg] = await Promise.all([
          loadPart(config.hair, 'hair'),
          loadPart(config.eyes, 'eyes'),
          loadPart(config.mouth, 'mouth'),
          loadPart(config.cheeks, 'cheeks'),
        ]);

        // コンポーネントがアンマウントされたり、configが変わっていたら描画しない
        if (!active) return;

        // エラーチェック
        if (!hairImg || !eyesImg || !mouthImg || !cheekImg) {
           const missingParts = [];
           if (!hairImg) missingParts.push(`髪(${config.hair})`);
           if (!eyesImg) missingParts.push(`目(${config.eyes})`);
           if (!mouthImg) missingParts.push(`口(${config.mouth})`);
           if (!cheekImg) missingParts.push(`頬(${config.cheeks})`);
           setError(`画像の読み込みに失敗: ${missingParts.join(', ')}`);
        }

        // キャンバスをクリアして背景を塗る
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, size, size);

        // 画像を描画するヘルパー
        const drawImg = (img: HTMLImageElement | null) => {
          if (!img) return;
          ctx.drawImage(img, 0, 0, size, size);
        };

        // 髪型を髪色付きで描画するヘルパー
        const drawHairWithColor = (img: HTMLImageElement | null, colorId: HairColorId) => {
          if (!img) return;
          
          // オフスクリーンキャンバスを作成
          const offscreen = document.createElement('canvas');
          offscreen.width = size;
          offscreen.height = size;
          const offCtx = offscreen.getContext('2d');
          if (!offCtx) return;
          
          // 1. 元の画像を描画
          offCtx.drawImage(img, 0, 0, size, size);
          
          // 2. 元の画像データを保存（肌色復元用）
          const originalImageData = offCtx.getImageData(0, 0, size, size);
          const originalData = new Uint8ClampedArray(originalImageData.data);
          
          // 3. 画像データを取得
          const imageData = offCtx.getImageData(0, 0, size, size);
          const data = imageData.data;
          
          // 4. 選択した髪色を取得
          const hairColor = HAIR_COLORS[colorId];
          const targetR = parseInt(hairColor.slice(1, 3), 16);
          const targetG = parseInt(hairColor.slice(3, 5), 16);
          const targetB = parseInt(hairColor.slice(5, 7), 16);
          
          // 5. 各ピクセルを処理
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            
            // 透明ならスキップ
            if (a === 0) continue;
            
            // 肌色判定（緩和版）
            const isSkinTone = (r > 160 && g > 120 && b > 80 && r > b);
            
            if (!isSkinTone) {
              // 肌色以外はグレースケール化してから髪色を適用
              const luminance = r * 0.299 + g * 0.587 + b * 0.114;
              const ratio = Math.min(luminance / 255, 1);
              
              // 髪色を適用
              data[i] = Math.round(targetR * ratio);
              data[i + 1] = Math.round(targetG * ratio);
              data[i + 2] = Math.round(targetB * ratio);
            } else {
              // 肌色部分は元の色を保持
              data[i] = originalData[i];
              data[i + 1] = originalData[i + 1];
              data[i + 2] = originalData[i + 2];
            }
          }
          
          // 6. 処理した画像データを描画
          offCtx.putImageData(imageData, 0, 0);
          
          // 7. メインキャンバスに描画
          ctx.drawImage(offscreen, 0, 0);
        };

        // 描画順序（重要）：背面 -> 前面
        
        // 1. 頬（最背面）
        drawImg(cheekImg);

        // 2. 目
        drawImg(eyesImg);
        
        // 3. 口
        drawImg(mouthImg);
        
        // 4. 髪型（最前面）- 髪色を適用
        drawHairWithColor(hairImg, config.hairColor);
        
        // デバッグ用：赤い枠線を描画してCanvasが動いているか確認
        // ctx.strokeStyle = 'red';
        // ctx.lineWidth = 10;
        // ctx.strokeRect(0, 0, size, size);

        setImagesLoaded(true);

      } catch (error) {
        console.error('Failed to draw avatar:', error);
      }
    };

    drawAvatar();

    // クリーンアップ関数
    return () => {
      active = false;
    };
  }, [config, size, backgroundColor]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="relative border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg"
        style={{ width: size, height: size }}
      >
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="block"
        />
        {!imagesLoaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
            <span className="text-gray-500">Loading...</span>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-100 bg-opacity-90 p-4 text-center">
            <span className="text-red-600 text-sm font-bold">{error}</span>
          </div>
        )}
      </div>
      <div className="text-sm text-gray-600">
        {size} × {size}px
      </div>
    </div>
  );
  }
);
