class AddFieldsToForm < ActiveRecord::Migration
  def change
    add_column :forms, :fields, :text
  end
end
