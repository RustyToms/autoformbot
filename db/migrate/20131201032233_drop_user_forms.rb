class DropUserForms < ActiveRecord::Migration
  def up
    drop_table :user_forms
  end

  def down
    create_table :user_forms do |t|
      t.integer :form_id
      t.integer :user_id, null: false
      t.string :form_auth, null: false

      t.timestamps
    end
    add_index :user_forms, :form_id
    add_index :user_forms, :user_id
  end
end
