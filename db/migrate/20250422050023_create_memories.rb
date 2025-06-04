class CreateMemories < ActiveRecord::Migration[7.2]
  def change
    create_table :memories do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false
      t.text :body, null: false
      t.boolean :public_flag, default: false, null: false
      t.string :image
      t.timestamps
    end
  end
end
