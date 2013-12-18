class Form < ActiveRecord::Base
  attr_accessible :account_id, :form_text, :name, :result_summary, :url
  attr_accessor :new_results

  belongs_to :account
  has_many :results, dependent: :destroy
  has_many :users, through: :account, source: :users

  validates :account_id, :name, presence: true

  def update_url
    unless self.url.blank?
      unless self.url[/\Ahttp:\/\//] || self.url[/\Ahttps:\/\//]
        self.url = "http://#{self.url}"
      end
    end
  end

  def make_form_wrapper
    form_wrapper_file = open("app/assets/templates/forms/form_wrapper.jst.ejs")
    form_wrapper = form_wrapper_file.read
    form_wrapper_file.close
    form_wrapper.sub('</div>', '')
  end

  def attributes
    super.merge('new_results' => self.new_results)
  end
end
