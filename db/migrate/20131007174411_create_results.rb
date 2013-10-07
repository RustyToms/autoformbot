class CreateResults < ActiveRecord::Migration
  def change
    create_table :results do |t|
      t.integer :form_id, null: false
      t.integer :account_id, null: false
      t.text :json_results, null: false

      t.timestamps
    end
    add_index :results, :form_id
    add_index :results, :account_id
  end
end
