class CreateItemCategories < ActiveRecord::Migration[7.2]
  def change
    create_table :item_categories do |t|
      t.string :name

      t.timestamps
    end
    add_index :item_categories, :name, unique: true
  end
end
