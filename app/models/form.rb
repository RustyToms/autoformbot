class Form < ActiveRecord::Base
  attr_accessible :account_id, :form_text, :name

  belongs_to :account
  has_many :results
  has_many :user_forms, dependent: :destroy
  has_many :users, through: :user_forms, source: :user

  validates :account_id, :name, presence: true


end
