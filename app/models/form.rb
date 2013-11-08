class Form < ActiveRecord::Base
  attr_accessible :account_id, :form_text, :name, :result_summary, :url

  belongs_to :account
  has_many :results, dependent: :destroy
  has_many :user_forms, dependent: :destroy
  has_many :users, through: :user_forms, source: :user

  validates :account_id, :name, presence: true

def update_url
  unless self.url[/\Ahttp:\/\//] || self.url[/\Ahttps:\/\//]
  self.url = "http://#{self.url}"
  end
end


end
