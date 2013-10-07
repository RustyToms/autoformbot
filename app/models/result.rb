class Result < ActiveRecord::Base
  attr_accessible :account_id, :form_id, :json_results

  belongs_to :form
  belongs_to :account

  validates :account_id, :form_id, :json_results, presence: true
end
