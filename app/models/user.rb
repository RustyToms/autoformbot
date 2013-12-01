class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me

  has_one :user_account, dependent: :destroy
  has_one :account, through: :user_account, source: :account
  has_many :forms, through: :account, source: :forms
  has_many :results, through: :account, source: :results



#Todo
  # ensure that the creator of an account is admin, and admin of all forms in account
  # ensure that the creator of a form is admin of that form
end
