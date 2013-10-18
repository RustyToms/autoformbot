class Result < ActiveRecord::Base
  attr_accessible :form_id, :result

  belongs_to :form
  belongs_to :account

  validates :form_id, :result, presence: true
end
