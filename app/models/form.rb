class Form < ActiveRecord::Base
  attr_accessible :account_id, :field_array, :form_text, :name

  belongs_to :account
  has_many :results
  has_many :user_forms
  has_many :users, through: :user_forms, source: :user

  validates :account_id, :name, presence: true
  validates_uniqueness_of :name, scope: :account_id


  # add method which automatically checks to see if name exists, and if not gives it a name of "untitled form", looping through account's forms to see if there is another with this name, adding an integer to the end each time.
  def set_name
    form_names = []
    @user_forms && @user_forms.each do |form|
      form_names << form.name
    end

    untitled = "Untitled Form 1"
    n = 2

    while form_names.include?(untitled) do
      untitled.pop
      untitled << n.to_s
      n += 1
    end

    self.name = untitled
  end

end
