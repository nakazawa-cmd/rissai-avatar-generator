# ロジリカ 社員アイコンジェネレーター

ロジリカの全社員向けに、統一テイストの「プロフィールアイコン」を作るためのWebツールです。

## 機能

- **パーツ選択**: 被り物、髪型、髪色、目、口を組み合わせてアイコンを作成
- **ガチャ機能**: ワンクリックでランダムなアイコンを生成
- **PNGダウンロード**: 作成したアイコンを512×512pxのPNGとしてダウンロード

## 技術スタック

- **ビルドツール**: Vite
- **フレームワーク**: React 19
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **アイコン生成**: HTML5 Canvas API

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   ├── AvatarPreview.tsx    # アバタープレビュー表示
│   └── PartSelector.tsx     # パーツ選択UI
├── types.ts            # TypeScript型定義
├── utils/              # ユーティリティ関数
│   ├── random.ts       # ランダム生成ロジック
│   └── download.ts     # PNGダウンロード機能
├── App.tsx             # メインアプリコンポーネント
└── main.tsx            # エントリーポイント
```

## デザインデータの差し替えについて

現在の実装では、パーツは仮実装としてCanvas APIでシンプルな図形を描画しています。

デザイナーが本番用のSVGや画像に差し替える場合は、以下のファイルを編集してください：

- `src/components/AvatarPreview.tsx` の `drawPart` 関数
- 各パーツのSVG/画像ファイルを `public/` または `src/assets/` に配置し、読み込む処理を追加

パーツごとの差し替えがしやすいよう、`drawPart` 関数内でカテゴリごとに分岐している構造になっています。

## カスタマイズ

### パーツの追加

1. `src/types.ts` で型定義を追加
2. `src/components/PartSelector.tsx` で選択UIを追加
3. `src/components/AvatarPreview.tsx` の `drawPart` 関数で描画ロジックを追加

### 背景色の変更

`src/App.tsx` の `AvatarPreview` コンポーネントに `backgroundColor` プロップを渡すことで変更可能です。

## ライセンス

このプロジェクトはロジリカの社内ツールです。
