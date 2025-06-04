class CreateEventMembers < ActiveRecord::Migration[7.2]
  def change
    create_table :event_members, primary_key: [:event_id, :user_id] do |t|
      t.references :event, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :role, null: false, foreign_key: true
      t.timestamps
    end
  end
end