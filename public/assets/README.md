# アセットファイル配置ガイド

このフォルダに、イラストレーターから提供された画像ファイルを配置してください。

## フォルダ構造

```
public/assets/
├── face/          # 顔のパーツ（複数種類）
├── hair/          # 髪型のパーツ（hair_1.png 〜 hair_10.png など）
├── mouth/         # 口のパーツ（mouth_1.png 〜 mouth_10.png など）
├── eyes/          # 目のパーツ（eyes_1.png 〜 eyes_10.png など）
└── cheeks/        # 頬のパーツ（blush.png, no_blush.png など）
```

## ファイル命名規則

### 髪型
- `hair_1.png`, `hair_2.png`, ... `hair_10.png`
- または `hair_1.svg`, `hair_2.svg`, ... `hair_10.svg`

### 髪色
髪色は画像ではなく、コード内で色を適用する想定です。
もし髪色ごとに別ファイルがある場合は、以下の命名規則で：
- `hair_1_color_1.png`, `hair_1_color_2.png`, `hair_1_color_3.png` など

### 目
- `eyes_1.png`, `eyes_2.png`, ... `eyes_10.png`
- または `eyes_1.svg`, `eyes_2.svg`, ... `eyes_10.svg`

### 口
- `mouth_1.png`, `mouth_2.png`, ... `mouth_10.png`
- または `mouth_1.svg`, `mouth_2.svg`, ... `mouth_10.svg`

### 頬
- `blush.png` または `blush.svg` （赤らめるパターン）
- `no_blush.png` または `no_blush.svg` （赤らめないパターン）

### 顔
- `face_base.png` または `face_base.svg` （顔のベース）

## ファイル形式

- SVG形式を推奨（拡大縮小しても品質が保たれる）
- PNG形式も対応可能

## 配置手順

1. Google Driveから各フォルダのファイルをダウンロード
2. 上記の命名規則に従ってファイル名を変更（必要に応じて）
3. 対応するフォルダに配置

## 注意事項

- ファイル名は正確に一致させる必要があります
- 大文字小文字は区別されます
- 囲み（食べ物等）は後で手書きで用意するため、今は配置不要です


