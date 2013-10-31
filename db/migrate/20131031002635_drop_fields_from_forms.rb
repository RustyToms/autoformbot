class DropFieldsFromForms < ActiveRecord::Migration
  def up
    change_table :forms do |t|
      t.remove :fields
    end
  end

  def down
    change_table :forms do |t|
      t.text :fields
    end
  end
end
