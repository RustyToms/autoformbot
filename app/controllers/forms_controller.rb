class FormsController < ApplicationController
  before_filter :authenticate_user!

  def index
    @user = current_user
    @forms = @user.forms
    render :index
  end


  def show

  end


  def new

  end


  def create

  end


  def edit

  end


  def update

  end

  def destroy

  end


end
