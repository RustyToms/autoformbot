class CreateForms < ActiveRecord::Migration
  def change
    create_table :forms do |t|
      t.integer :account_id, null: false
      t.text :field_array
      t.text :form_text
      t.string :name, null: false

      t.timestamps
    end
    add_index :forms, :account_id
    add_index :forms, :name
  end
end
