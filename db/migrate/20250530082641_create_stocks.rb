class CreateStocks < ActiveRecord::Migration[7.0]
  def change
    create_table :stocks, id: false do |t|
      t.references :item, null: false, foreign_key: true, primary_key: true
      t.integer :quantity
      t.timestamp :updated_at
    end

  end
end