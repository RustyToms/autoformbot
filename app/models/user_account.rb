class UserAccount < ActiveRecord::Base
  attr_accessible :account_auth, :account_id, :user_id
end
