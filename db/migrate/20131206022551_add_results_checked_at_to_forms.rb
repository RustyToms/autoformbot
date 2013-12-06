class AddResultsCheckedAtToForms < ActiveRecord::Migration
  def change
    add_column :forms, :results_checked_at, :datetime
  end
end
