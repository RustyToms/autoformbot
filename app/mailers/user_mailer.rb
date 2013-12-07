class UserMailer < ActionMailer::Base
  default from: "notifications@form-itable.com"

  def welcome_email(user)
    @user = user
    mail(
      to: user.email,
      subject: 'Welcome to Form-itable.com!'
    )
  end

  def new_result(user, result)
    @user = user
    @result = result
    mail(
      to: user.email,
      subject: 'New submission for form "#{@result.form.name}"'
    )
  end
end
