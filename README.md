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




追加要件
* 割引
  * ボタンで0.8掛け


# ==================================================
# Rails実行コマンド一覧（順番に実行）
# ==================================================

# ============== 1. 基本設定・Gem追加 ==============

# Deviseがまだインストールされていない場合
# Gemfileに以下を追加してからbundle install
echo "gem 'devise'" >> Gemfile
bundle install

# Deviseの初期設定（まだの場合）
rails generate devise:install
rails generate devise User

# ============== 2. マイグレーションファイル生成 ==============

# ロール（roles）テーブル
rails generate migration CreateRoles name:string:uniq

# 商品カテゴリ（item_categories）テーブル
rails generate migration CreateItemCategories name:string:uniq

# イベント（events）テーブル
rails generate migration CreateEvents name:string date:date

# イベントメンバー（event_members）テーブル - 複合主キー
rails generate migration CreateEventMembers event:references user:references role:references

# 商品（items）テーブル
rails generate migration CreateItems event:references item_category:references name:string price:integer image_url:string jan_code:string

# 在庫（stocks）テーブル
rails generate migration CreateStocks item:references quantity:integer

# 売上（sales）テーブル
rails generate migration CreateSales event:references subtotal_amount:integer is_discount:boolean discount_rate:decimal discount_amount:integer discounted_subtotal:integer tax_rate:decimal tax_amount:integer total_amount:integer is_reservation:boolean sold_at:datetime

# 売上明細（sale_items）テーブル
rails generate migration CreateSaleItems sale:references item:references quantity:integer unit_price:integer line_subtotal:integer

# 税込フラグ追加
rails generate migration AddTaxIncludedToSales is_tax_included:boolean

# ============== 3. マイグレーションファイル手動修正 ==============

# 生成されたマイグレーションファイルを以下のように修正する必要があります
echo "以下のマイグレーションファイルを手動で修正してください："

echo "
# db/migrate/xxx_create_event_members.rb
class CreateEventMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :event_members, primary_key: [:event_id, :user_id] do |t|
      t.references :event, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :role, null: false, foreign_key: true
      t.timestamps
    end
  end
end
"

echo "
# db/migrate/xxx_create_stocks.rb
class CreateStocks < ActiveRecord::Migration[7.0]
  def change
    create_table :stocks, id: false do |t|
      t.references :item, null: false, foreign_key: true, primary_key: true
      t.integer :quantity
      t.timestamp :updated_at
    end
    
    add_index :stocks, :item_id, unique: true
  end
end
"

echo "
# db/migrate/xxx_create_sales.rb で以下の属性にデフォルト値を設定：
# t.boolean :is_discount, null: false, default: false
# t.decimal :discount_rate, precision: 5, scale: 2, default: 0.00
# t.integer :discount_amount, default: 0
# t.decimal :tax_rate, precision: 5, scale: 2, default: 10.00
# t.boolean :is_reservation, null: false, default: false
# t.datetime :sold_at, default: -> { 'CURRENT_TIMESTAMP' }
"

echo "
# db/migrate/xxx_add_tax_included_to_sales.rb
class AddTaxIncludedToSales < ActiveRecord::Migration[7.0]
  def change
    add_column :sales, :is_tax_included, :boolean, default: false, null: false
  end
end
"

# ============== 4. モデルファイル生成 ==============

# モデル生成（関連付けは手動で追加）
rails generate model Role --skip-migration
rails generate model ItemCategory --skip-migration
rails generate model Event --skip-migration
rails generate model EventMember --skip-migration
rails generate model Item --skip-migration
rails generate model Stock --skip-migration
rails generate model Sale --skip-migration
rails generate model SaleItem --skip-migration

# ============== 5. コントローラー生成 ==============

# API用コントローラー生成
rails generate controller Api::Events --skip-routes
rails generate controller Api::Items --skip-routes
rails generate controller Api::Sales --skip-routes
rails generate controller Api::Stocks --skip-routes

# 通常のコントローラー（管理画面用）
rails generate controller Events
rails generate controller Items
rails generate controller Sales

# ============== 6. ルーティング設定 ==============

echo "config/routes.rbに以下を追加してください："

echo "
Rails.application.routes.draw do
  devise_for :users
  root 'events#index'

  # 通常のルート
  resources :events do
    resources :items
    resources :sales
    member do
      get :pos # POSシステム画面
    end
  end

  # APIルート
  namespace :api do
    resources :events, only: [:index, :show] do
      resources :items, only: [:index, :show]
      resources :sales, only: [:create, :show, :index]
      resources :stocks, only: [:show, :update]
    end
  end
end
"

# ============== 7. データベース作成・マイグレーション実行 ==============

# データベース作成（初回のみ）
rails db:create

# マイグレーション実行
rails db:migrate

# ============== 8. シードデータ作成・実行 ==============

echo "db/seeds.rbに基本データを追加してください（前回のartifactを参照）"

# シードデータ実行
rails db:seed

# ============== 9. テストデータ作成（開発用） ==============

# Railsコンソールでテストデータ作成
rails console

# コンソール内で実行するコード例
echo "
# Railsコンソール内で以下を実行してテストデータを作成：

# ユーザー作成
user = User.create!(
  email: 'admin@example.com',
  password: 'password',
  password_confirmation: 'password',
  name: '管理者'
)

# イベント作成
event = Event.create!(
  name: '春祭り2025',
  date: Date.current + 1.month
)

# ユーザーをイベントに追加
role = Role.find_by(name: '管理者')
EventMember.create!(event: event, user: user, role: role)

# 商品作成
drink_category = ItemCategory.find_by(name: '飲み物')
food_category = ItemCategory.find_by(name: '食べ物')

items = [
  { name: 'たこ焼き', price: 500, category: food_category },
  { name: '焼きそば', price: 600, category: food_category },
  { name: 'かき氷', price: 300, category: drink_category },
  { name: 'ビール', price: 400, category: drink_category },
  { name: 'フランクフルト', price: 350, category: food_category },
  { name: 'ジュース', price: 200, category: drink_category },
  { name: 'お好み焼き', price: 550, category: food_category },
  { name: '綿あめ', price: 250, category: nil }
]

items.each do |item_data|
  item = event.items.create!(
    name: item_data[:name],
    price: item_data[:price],
    item_category: item_data[:category]
  )
  
  # 在庫設定
  item.create_stock!(quantity: 50)
end

puts 'テストデータの作成が完了しました'
exit
"

# ============== 10. サーバー起動 ==============

# 開発サーバー起動
rails server

# または
rails s

# ============== 11. 確認用コマンド ==============

# データベース状態確認
rails db:migrate:status

# ルート確認
rails routes

# モデル確認
rails console
# > User.count
# > Event.count
# > Item.count

# ============== 12. 本番環境用コマンド ==============

# 本番環境でのマイグレーション
RAILS_ENV=production rails db:migrate

# 本番環境でのシード実行
RAILS_ENV=production rails db:seed

# アセットのプリコンパイル（必要に応じて）
RAILS_ENV=production rails assets:precompile

# ============== 注意事項 ==============

echo "
⚠️  重要な注意事項：

1. マイグレーションファイルは生成後に手動修正が必要です
2. モデルファイルに関連付けとバリデーションを追加してください
3. コントローラーにアクションを実装してください
4. ビューファイルを作成してください
5. 認証・認可の実装を忘れずに

📝 次のステップ：
1. 上記コマンドを順番に実行
2. マイグレーションファイルを修正
3. モデルファイルを前回のartifactの内容で更新
4. コントローラーを実装
5. フロントエンドとの連携テスト
"

# ============== デバッグ用コマンド ==============

# ログ確認
tail -f log/development.log

# データベース内容確認
rails dbconsole
# または
rails db

# テスト実行
rails test

# RuboCopでコード品質チェック（gem 'rubocop'が必要）
bundle exec rubocop

echo "全てのコマンドの準備が完了しました！順番に実行してください。"

dce web rails generate model Role --skip-migration
dce web rails generate model ItemCategory --skip-migration
dce web rails generate model Event --skip-migration
dce web rails generate model EventMember --skip-migration
dce web rails generate model Item --skip-migration
dce web rails generate model Stock --skip-migration
dce web rails generate model Sale --skip-migration
dce web rails generate model SaleItem --skip-migration

dce web rails generate controller Api::v1::Events --skip-routes
dce web rails generate controller Api::v1::Items --skip-routes
dce web rails generate controller Api::v1::Sales --skip-routes
dce web rails generate controller Api::v1::Stocks --skip-routes

dce web rails generate controller Events
dce web rails generate controller Items
dce web rails generate controller Sales