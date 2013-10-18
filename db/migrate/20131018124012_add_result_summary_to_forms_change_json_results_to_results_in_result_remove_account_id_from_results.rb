class AddResultSummaryToFormsChangeJsonResultsToResultsInResultRemoveAccountIdFromResults < ActiveRecord::Migration
  def change
    
    change_table :results do |t|
      t.remove :account_id
      t.rename :json_results, :result
    end
    
    change_table :forms do |t|
      t.text :result_summary
    end
    
  end
end
