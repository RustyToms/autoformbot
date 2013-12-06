class RemoveResultSummaryFromForms < ActiveRecord::Migration
  def up
    remove_column :forms, :result_summary
  end

  def down
    add_column :forms, :result_summary, :text
  end
end
