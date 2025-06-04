class CreateSales < ActiveRecord::Migration[7.2]
  def change
    create_table :sales do |t|
      t.references :event, null: false, foreign_key: true
      t.integer :subtotal_amount
      t.boolean :is_discount, default: false
      t.decimal :discount_rate, precision: 5, scale: 2, default: 0.00
      t.integer :discount_amount, default: 0
      t.integer :discounted_subtotal
      t.decimal :tax_rate, precision: 5, scale: 2, default: 0.00
      t.integer :tax_amount
      t.integer :total_amount, null: false
      t.boolean :is_reservation
      t.datetime :sold_at
      t.timestamps
    end
  end
end
