class StaticPagesController < ApplicationController

  def home
    if current_user
      @url = current_user.account.url_name
    else
      @url = ''
    end
    render :home
  end

  def thank_you
    @url = ''
    render :thank_you
  end

  def resume
    render :resume, layout: false
  end
end
