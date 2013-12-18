class AccountsController < ApplicationController
  before_filter :authenticate_user!, only: [:show, :edit, :update, :destroy]

  def show
    @account = current_user.account
     unless @account.url_name == params[:id]
      flash.now[:notice] = "Access Denied"
      redirect_to home_static_page_url
      return
    end

    @forms = @account.forms.includes(:results)
    count_new_results

    render :show
  end


  def new
    @account = Account.new
    @plan_types = Account.plan_types
    render :new
  end


  def create
    @user = User.new(params[:user])
    unless @user.save
      flash.now[:errors] = @user.errors.full_messages
      render :fail
      return
    end

    @account = Account.find_by_url_name(params[:account][:url_name])
    if @account
      flash.now[:notice] = "#{@user.email} joined account #{@account.url_name}!"
    else
      @account = Account.new(params[:account])
      @account.url_name = @account.url_name.gsub(' ', '')
      flash.now[:notice] = "Account #{@account.url_name} created by #{@user.email}!"
    end

    @account.user_accounts.build(
      user_id: @user.id,
      account: @account,
      account_auth: "admin")

    if @account.save
      sign_in(@user)
      redirect_to account_url(@account.url_name)
      begin
        welcome_msg = UserMailer.welcome_email(@user)
        welcome_msg.deliver!
      rescue
        p "Problem sending welcome message to #{@user.email}"
      end
    else
      User.find(@user.id).delete
      flash.delete(:notice)
      @plan_types = Account.plan_types
      flash.now[:errors] = @account.errors.full_messages
      render :fail
    end
  end


  def update
    @account = current_user.account
     unless @account.id == params[:id]
      flash.now[:notice] = "Access Denied"
      redirect_to home_static_page_url
      return
    end

    if @account.update_attributes(params[:account])
      render json: @account
    else
      render json: @account.errors.full_messages, status: :unprocessable_entity
    end
  end


  def check_for_account
    if current_user && current_user.account
      redirect_to account_url(current_user.account.url_name)
    else
      redirect_to new_account_url
    end
  end

  def count_new_results
    @forms.each do |form|
      form.new_results = 0
      form.results.each do |result|
        unless form.results_checked_at &&
          result.created_at < form.results_checked_at
          form.new_results += 1
        end
      end
    end
  end

end
