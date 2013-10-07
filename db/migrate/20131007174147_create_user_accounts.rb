class CreateUserAccounts < ActiveRecord::Migration
  def change
    create_table :user_accounts do |t|
      t.integer :user_id, null: false
      t.integer :account_id, null: false
      t.string :account_auth, null: false

      t.timestamps
    end
    add_index :user_accounts, :user_id
    add_index :user_accounts, :account_id
  end
end
