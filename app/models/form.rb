class Form < ActiveRecord::Base
  attr_accessible :account_id, :field_array, :form_text, :name

  belongs_to :account
  has_many :results
  has_many :user_forms
  has_many :users, through: :user_forms, source: :user

  validates :account_id, :name, presence: true

  # def set_name
 #    form_names = []
 #    @user_forms && @user_forms.each do |form|
 #      form_names << form.name
 #    end
 #
 #    return true unless (self.name.blank? || form_names.include?(self.name))
 #
 #    untitled = "Untitled Form 1"
 #    n = 2
 #
 #    while form_names.include?(untitled) do
 #      untitled.pop
 #      untitled << n.to_s
 #      n += 1
 #    end
 #
 #    self.name = untitled
 #    return true
 #  end

end
