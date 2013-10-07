class CreateFormAuthorities < ActiveRecord::Migration
  def change
    create_table :form_authorities do |t|
      t.integer :form_id, null: false
      t.integer :user_id, null: false
      t.string :form_auth, null: false

      t.timestamps
    end
  end
end
