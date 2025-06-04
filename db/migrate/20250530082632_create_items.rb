class CreateItems < ActiveRecord::Migration[7.2]
  def change
    create_table :items do |t|
      t.references :event, null: false, foreign_key: true
      t.references :item_category, null: false, foreign_key: true
      t.string :name
      t.integer :price
      t.string :image_url
      t.string :jan_code

      t.timestamps
    end
  end
end
