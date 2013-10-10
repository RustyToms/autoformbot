class UserAccount < ActiveRecord::Base
  attr_accessible :account_auth, :account_id, :user_id, :account

  belongs_to :user
  belongs_to :account, inverse_of: :user_accounts

  validates :account_auth, :user_id, :account, presence: :true


end
