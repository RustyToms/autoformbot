class Account < ActiveRecord::Base
  attr_accessible :plan_type, :url_name

  has_many :forms, inverse_of: :account, dependent: :destroy
  has_many :user_accounts, dependent: :destroy, inverse_of: :account
  has_many :users, through: :user_accounts, source: :user
  has_many :results, through: :forms, source: :results

  before_validation :chomp_url_name
  validates :url_name, :plan_type, presence: true
  validates_uniqueness_of :url_name

  def self.plan_types
    {entry: 9.99, mid: 29.99, pro: 99.99, ultimate: 999999.99}
  end

  def chomp_url_name
    self.url_name = self.url_name.chomp
    true
  end
end
