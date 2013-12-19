class AddNotifyByAndEmailsToForms < ActiveRecord::Migration
  def change
    add_column :forms, :notify_by, :string
    add_column :forms, :emails, :text
  end
end
