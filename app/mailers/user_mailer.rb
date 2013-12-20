class UserMailer < ActionMailer::Base
  default from: "notifications@form-itable.com"

  def welcome_email(user)
    @user = user
    mail(
      to: user.email,
      subject: 'Welcome to Form-itable.com!'
    )
  end

  def new_result(email, result, form, hash)
    @result = result
    @form = form
    @hash = hash
    mail(
      to: email,
      subject: "New submission for form \"#{@form.name}\""
    )
  end
end
