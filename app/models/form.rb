class Form < ActiveRecord::Base
  attr_accessible :account_id, :field_array, :form_text, :name

  has_many :accounts
  has_many :results
  has_many :form_authorities
  has_many :users, through: :form_authorities, source: :users

end
