class AddUrlToForms < ActiveRecord::Migration
  def change
    add_column :forms, :url, :string
  end
end
