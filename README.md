# Bouncing Ball
画面内で複数の円が動きます。円どうしは衝突すると跳ね返ります。

## 使い方
### 1. nodeとyarnをインストール
```bash
yarn --version
```
でエラーが起きないことを確認してください。

### 2. 依存関係のあるライブラリをインストール
以下のコマンドは、すべてこのREADMEと同じディレクトリで実行してください。
```bash
yarn
```

### 3. 開発用サーバーを起動
```bash
yarn dev
```
`scripts/main.js`の`balls`を編集することで、円の数や初速度、色、大きさなどを変えられます。

ブラウザで`http://localhost:5173/`を開くと、アプリをプレビューすることができます。

### 4. コードをバンドル
アプリを運用する際は、
```bash
yarn build
```
で`./dist`以下に必要なファイルをまとめられます。

```bash
yarn start
```
でWebサーバーを起動し、ビルド済みアプリに`localhost`からアクセスできるようにします。