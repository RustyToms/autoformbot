class Result < ActiveRecord::Base
  attr_accessible :form_id, :result

  belongs_to :form, inverse_of: :results

  validates :form, :result, presence: true
end
