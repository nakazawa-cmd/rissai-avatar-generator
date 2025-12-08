import { useState, useRef } from 'react';
import type { AvatarConfig } from './types';
import { generateRandomAvatar } from './utils/random';
import { downloadAvatarAsPNG } from './utils/download';
import { AvatarPreview, type AvatarPreviewHandle } from './components/AvatarPreview';
import {
  HairSelector,
  HairColorSelector,
  EyesSelector,
  MouthSelector,
  CheekSelector,
} from './components/PartSelector';

const DEFAULT_CONFIG: AvatarConfig = {
  hair: 'hair_1',
  hairColor: 'color_1',
  eyes: 'eyes_1',
  mouth: 'mouth_1',
  cheeks: 'no_blush',
};

function App() {
  const [config, setConfig] = useState<AvatarConfig>(DEFAULT_CONFIG);
  const previewRef = useRef<AvatarPreviewHandle>(null);

  const handleGacha = () => {
    setConfig(generateRandomAvatar());
  };

  const handleDownload = () => {
    const canvas = previewRef.current?.getCanvas();
    if (canvas) {
      downloadAvatarAsPNG(canvas);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ロジリカ 社員アイコンジェネレーター
          </h1>
          <p className="text-gray-600">
            パーツを組み合わせて、あなただけのアイコンを作成しましょう
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左側：プレビュー領域 */}
          <div className="flex flex-col items-center justify-start">
            <div className="bg-white rounded-lg shadow-md p-6 w-full">
              <AvatarPreview ref={previewRef} config={config} />
      </div>
            
            {/* アクションボタン */}
            <div className="mt-6 flex gap-4 w-full max-w-md">
              <button
                onClick={handleGacha}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                🎲 ガチャ
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                💾 ダウンロード
        </button>
            </div>
          </div>

          {/* 右側：コントロールパネル */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              パーツ選択
            </h2>
            
            <div className="space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
              <HairSelector
                selected={config.hair}
                onSelect={(hair) => setConfig({ ...config, hair })}
              />
              
              <HairColorSelector
                selected={config.hairColor}
                onSelect={(hairColor) => setConfig({ ...config, hairColor })}
              />
              
              <EyesSelector
                selected={config.eyes}
                onSelect={(eyes) => setConfig({ ...config, eyes })}
              />
              
              <MouthSelector
                selected={config.mouth}
                onSelect={(mouth) => setConfig({ ...config, mouth })}
              />
              
              <CheekSelector
                selected={config.cheeks}
                onSelect={(cheeks) => setConfig({ ...config, cheeks })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
