# Eventレジ

## サービス概要
年に数日だけ屋台・露天を出す小規模店舗が **スマホ／タブレット1台ですぐに使えるレジサービス**webアプリ
商品を選択すると合計金額表示され、販売ログを保存
イベント終了後はワンクリックで日報・売上レポートをエクスポートできる

---

## 想定されるユーザー層
- **地方の祭り・学園祭・フリマ** などで年に数回出店する個人商店主・自治会
- **年齢** : 30〜70歳  
- **ITリテラシー** : スマホ利用経験あり／POSアプリ未経験  
- **価値観** : 導入コスト最小・設定最短・現金回転率向上

---

## サービスコンセプト
### ユーザー課題と解決
| 課題 | 提供価値 |
|------|----------|
|そもそも帳簿をつけていない|会計ログをつけ、財務処理の負担軽減|
| 手書きメモと暗算で会計し、ミスが多い | 会計とログを同時処理 |
| 売上集計に時間がかかり、翌年に活かせない | 売り上げレポートの自動生成、CSV/PDFで即共有 |

### 開発動機
夏祭りで実家の露店の会計を担当した際、帳簿などを一切つけておらず、レジ金額ベースで集計しており、これを自動化したいと考えたから。

### 目指す姿
POSレジを導入するには少し重い、短期間のイベント事に導入しやすい会計サポートサービス

### 差別化ポイント
* 一般的な会計サービスのような複雑な設定が不要
* POSレジ等の追加機材が不要

---

## 実装を予定している機能


### MVP
| 機能 | 詳細 |
|------|------|
| **会員登録・ログイン** | メール + パスワード |
| **商品登録** | 名前,価格入力のCRUD |
| **会計画面** | 商品カードの±ボタンで数量選択 → 合計金額を計算 |
| **販売ログ保存** | 会計画面で販売ログを保存 |
| **当日日報自動生成** | PDF／CSVエクスポート |


### その後の機能
| 機能             | 詳細                   |
| -------------- | -------------------- |
| **イベントテンプレート** | 過去イベントを複製して一括セット     |
| **商品登録** | 商品画像、タグの追加、CSVインポート  |
| **在庫管理**           | 残り在庫に応じて商品表示         |
| **多端末リアルタイム同期**   | 会計用画面と受け渡し用画面の作成     |
| **簡易ダッシュボード**  | 売上合計・時間帯別売上・TOP商品を表示 |

## ■ 機能候補

### 【MVP リリース】
- 会員登録・ログイン  
  - メール／パスワード認証
- 商品登録 CRUD 
  - 名前・価格（＋任意でカテゴリー）
- 会計画面  
  - 商品カードの ± ボタンで数量変更 → 合計金額を即時計算
  - カードには単価と選択個数も表示
- 販売ログ保存  
  - 会計確定時にトランザクションを保存
- 当日日報自動生成
  - 売上・個数を集計を画面表示
  - 集計したデータをボタンを押して出力（csv）

---

### 【本リリース】
- イベントテンプレート複製 
  - 過去イベント設定・商品を一括コピー
- 商品画像アップロード 
  - 画像付カード表示
- 在庫管理 
  - 残数に応じた売り切れ表示・アラート
- 多端末リアルタイム同期（ペア画面モード） 
  - 会計用端末と受け渡し用端末を同期
- 簡易ダッシュボード 
  - 日別／時間帯別売上・TOP商品を表示
- 管理権限（オーナー／スタッフ） 
  - 権限による画面・操作制御
- 日報データエクスポート（PDF） 
  - レポートをメールで送信するボタンを追加
- データのメール送信機能 
- 

---

## ■ 機能の実装方針予定


### 会計画面
- React で仮想 POS。商品一覧を SWR でキャッシュ。  
- 合計金額は Zustand でグローバルステート管理、数値演算のみクライアント側。  
- 画面遷移無し／全体をコンポジット化してモバイルでもワンタップ。

### 販売ログ保存
- POST `/api/sales` で 1 会計分を JSON 送信。  
- 障害時のオフライン対応に IndexedDB へキュー → ネット復帰時に同期。  
- Rails で DB へ書き込み。外部整合性確保のためトランザクション & 楽観ロック。

### 当日日報自動生成
- Rails Active Job で Prawn（PDF）＋標準 CSV Builder。  
- 処理完了後に presigned URL を返し、React Toast でダウンロード案内。  
- 本リリースでは Sidekiq + sidekiq-scheduler で自動バッチも追加。

### イベントテンプレート複製
- `events` テーブルと `event_items` 中間テーブルを用意。  
- `Event#duplicate!` サービスクラスで子レコードを deep copy。

### 在庫管理
- `stocks` テーブル：`item_id`, `quantity`.  
- 会計確定時に残数を Decrement。0 で売り切れフラグ broadcast。  
- 低在庫閾値は環境変数 or UI で設定可能に。

### 多端末リアルタイム同期
- **Action Cable** + Redis。  
- チャネル: `SalesChannel`, `StockChannel`.  
- React 側は `@rails/actioncable` で接続、`useEffect` で state 更新。  
- モバイルとタブレットで同一コードベース（PWA 対応）。

### 簡易ダッシュボード
- Rails で集計 SQL（GROUP BY date_trunc, hour）。CacheStore にメモ化。  
- API `/api/analytics/summary` を作成し JSON 返却。  
- React で Recharts。カード／チャートは Tailwind Grid + Aspect-ratio。

### 管理権限
- `role` カラム＋ Pundit。  
- React Router で `PrivateRoute` 守衛を実装。  
- チーム招待は Magic Link (ActionMailer) + Token ベース。

### メール送信機能
- Action Mailer + SES もしくは SendGrid。  
- HTML テンプレートは MJML → Premailer でインライン化。  
- Active Job で非同期、sidekiq-scheduler で「イベント終了 5 分後に日報」を自動送信。

---



# サイトマップ（本リリース）


- **ホーム**


- **アカウント**
  - 新規登録
  - ログイン
  - パスワード再設定


- **イベント管理**
  - イベント一覧
  - 新規イベント作成
  - テンプレートから複製
  - **イベント詳細**
    - 商品設定
    - 在庫状況

- **ダッシュボード**
  - 売上サマリー
  - 時間帯別売上
  - TOP商品
  - 低在庫アラート

- **会計（POS）**
  - メイン会計画面
  - 受け渡し画面（ペア端末）

- **商品管理**
  - 商品一覧
  - 商品追加／編集
  - 画像アップロード
  - CSVインポート／エクスポート

- **在庫管理**
  - 在庫一覧
  - 在庫調整
  - 売り切れ設定
  - アラート閾値設定

- **販売ログ**
  - 会計履歴
  - 日別集計
  - 詳細検索
  - **レポート**
    - 日報PDF出力
    - CSVエクスポート
    - メール送信


- **チーム管理**
  - メンバー一覧
  - 役割設定（オーナー／スタッフ）


- **法務関連**
  - 利用規約
  - プライバシーポリシー

- **問い合わせ**


# 画面遷移図
https://www.figma.com/board/pU5HUkmnktmMabQC9c12Eb/Event%E3%83%AC%E3%82%B8?node-id=0-1&t=2fwiZLm8uyC3iyLE-1

# 画面設計デモ
https://v0.dev/chat/pos-system-design-omoaZLrkM6Y


# ER図
https://dbdiagram.io/d/event%E3%83%AC%E3%82%B8-682fe17cb9f7446da3c8fcde
