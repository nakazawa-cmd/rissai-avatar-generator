import type { 
  HairId, 
  EyesId, 
  MouthId,
  CheekId
} from '../types';

interface PartSelectorProps<T extends string> {
  title: string;
  options: T[];
  selected: T | null;
  onSelect: (value: T | null) => void;
  allowNone?: boolean;
  renderOption?: (option: T) => React.ReactNode;
}

/**
 * パーツ選択UIコンポーネント（汎用）
 */
export function PartSelector<T extends string>({
  title,
  options,
  selected,
  onSelect,
  allowNone = false,
  renderOption,
}: PartSelectorProps<T>) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {allowNone && (
          <button
            onClick={() => onSelect(null)}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${
              selected === null
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            なし
          </button>
        )}
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${
              selected === option
                ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            {renderOption ? renderOption(option) : option}
          </button>
        ))}
      </div>
    </div>
  );
}

interface HairSelectorProps {
  selected: HairId;
  onSelect: (value: HairId) => void;
}

/**
 * 髪型選択コンポーネント
 */
export function HairSelector({ selected, onSelect }: HairSelectorProps) {
  return (
    <PartSelector
      title="髪型"
      options={[
        'hair_1', 'hair_2', 'hair_3', 'hair_4', 'hair_5',
        'hair_6', 'hair_7', 'hair_8', 'hair_9', 'hair_10'
      ] as HairId[]}
      selected={selected}
      onSelect={(val) => val && onSelect(val)}
      renderOption={(option) => `スタイル ${option.replace('hair_', '')}`}
    />
  );
}

interface EyesSelectorProps {
  selected: EyesId;
  onSelect: (value: EyesId) => void;
}

/**
 * 目選択コンポーネント
 */
export function EyesSelector({ selected, onSelect }: EyesSelectorProps) {
  return (
    <PartSelector
      title="目"
      options={[
        'eyes_1', 'eyes_2', 'eyes_3', 'eyes_4', 'eyes_5',
        'eyes_6', 'eyes_7', 'eyes_8', 'eyes_9', 'eyes_10',
        'eyes_11', 'eyes_12', 'eyes_13', 'eyes_14', 'eyes_15',
        'eyes_16', 'eyes_17'
      ] as EyesId[]}
      selected={selected}
      onSelect={(val) => val && onSelect(val)}
      renderOption={(option) => `目 ${option.replace('eyes_', '')}`}
    />
  );
}

interface MouthSelectorProps {
  selected: MouthId;
  onSelect: (value: MouthId) => void;
}

/**
 * 口選択コンポーネント
 */
export function MouthSelector({ selected, onSelect }: MouthSelectorProps) {
  return (
    <PartSelector
      title="口"
      options={[
        'mouth_1', 'mouth_2', 'mouth_3', 'mouth_4', 'mouth_5',
        'mouth_6', 'mouth_7', 'mouth_8', 'mouth_9', 'mouth_10',
        'mouth_11', 'mouth_12', 'mouth_13', 'mouth_14', 'mouth_15',
        'mouth_16', 'mouth_17'
      ] as MouthId[]}
      selected={selected}
      onSelect={(val) => val && onSelect(val)}
      renderOption={(option) => `口 ${option.replace('mouth_', '')}`}
    />
  );
}

interface CheekSelectorProps {
  selected: CheekId;
  onSelect: (value: CheekId) => void;
}

/**
 * 頬選択コンポーネント
 */
export function CheekSelector({ selected, onSelect }: CheekSelectorProps) {
  const cheekLabels: Record<CheekId, string> = {
    blush: '😊 赤らめる',
    no_blush: '😐 赤らめない',
  };

  return (
    <PartSelector
      title="頬"
      options={['blush', 'no_blush'] as CheekId[]}
      selected={selected}
      onSelect={(val) => val && onSelect(val)}
      renderOption={(option) => cheekLabels[option]}
    />
  );
}

