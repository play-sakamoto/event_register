## 環境構築
### 1. 本リポジトリをcloneします。
git cloneコマンドでcloneを行ってください

### 2. Dockerコンテナの起動
以下のコマンドでDockerコンテナを起動します。
```bash
$ docker compose build
```

```bash
$ docker compose up -d
```

### 3. 環境変数ファイルの準備
.env.example から .env ファイルをコピーします。
```bash
$ cp .env.example .env
```

### 4. JWT認証用の秘密鍵の設定
Webコンテナ内でセキュアな秘密鍵を生成します。
```bash
$ docker compose exec web bash
$ rails secret
```
出力された長いランダム文字列を .env ファイルの JWT_SECRET= の部分に貼り付けてください。
```env
JWT_SECRET=生成されたランダム文字列をここに貼り付ける
```
.env が Git 管理に含まれていないか確認してください。
.envに定義されている `JWT_SECRET` は、ユーザー認証時に使用されます。
