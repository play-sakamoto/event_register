class CreateMemoryImages < ActiveRecord::Migration[7.2]
  def change
    create_table :memory_images do |t|
      t.references :memory, null: false, foreign_key: true
      t.string :image

      t.timestamps
    end
  end
end