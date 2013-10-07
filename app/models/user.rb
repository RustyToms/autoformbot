
class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :email, presence: true

  has_many :user_accounts
  has_many :accounts, through: :user_accounts, source: :accounts
  has_many :forms, through: :accounts, source: :forms
  has_many :form_authority
  has_many :results, through: :accounts, source: :results


  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body

end

