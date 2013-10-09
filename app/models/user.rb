class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body

  has_one :user_account, dependent: :destroy
  has_many :user_forms
  has_one :account, through: :user_account, source: :account
  has_many :forms, through: :user_forms, source: :form
  has_many :results, through: :accounts, source: :results




  # ensure that the creator of an account is admin, and admin of all forms in account
  # ensure that the creator of a form is admin of that form
  # possibly make getter/setter methods for form ownership, reporting not just forms from UserForm join table, but all forms from associated accounts with admin authority.  These getter/setters would replace associations?  Would includes work with this?
end
