class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string :url_name, null: false
      t.string :plan_type, null: false

      t.timestamps
    end
    add_index :accounts, :url_name
  end
end
