class UserAccount < ActiveRecord::Base
  attr_accessible :account_auth, :account_id, :user_id

  belongs_to :user
  belongs_to :account

  validates :account_auth, :account_id, :user_id, presence: :true
end
