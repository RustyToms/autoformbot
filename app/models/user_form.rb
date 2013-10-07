class UserForm < ActiveRecord::Base
  attr_accessible :form_auth, :form_id, :user_id

  belongs_to :form
  belongs_to :user

  validates :form_auth, :form_id, :user_id, presence: true
end
