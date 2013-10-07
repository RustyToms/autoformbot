class FormAuthority < ActiveRecord::Base
  attr_accessible :form_auth, :form_id, :user_id

  belongs_to :user
  belongs_to :form
end
