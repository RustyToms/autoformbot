class Result < ActiveRecord::Base
  attr_accessible :form_id, :result

  belongs_to :form, inverse_of: :results

  delegate :account, to: :form
  delegate :users, to: :account

  validates :form, :result, presence: true
end
