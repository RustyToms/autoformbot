class Account < ActiveRecord::Base
  attr_accessible :plan_type, :url_name

  has_many :forms
  has_many :results
  has_many :user_accounts
  has_many :users, through: :user_accounts, source: :user

  validates :url_name, :plan_type, presence: true
  validates_uniqueness_of :url_name

end
