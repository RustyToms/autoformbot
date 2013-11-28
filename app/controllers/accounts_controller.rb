class AccountsController < ApplicationController
  before_filter :authenticate_user!, only: [:show, :edit, :update, :destroy]

  def index

  end


  def show
    @account = Account.find_by_url_name(params[:id])
    @forms = @account.forms
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
      flash[:notice] = "#{@user.email} joined account #{@account.url_name}!"
    else
      @account = Account.new(params[:account])
      @account.url_name = @account.url_name.gsub(' ', '')
      flash[:notice] = "Account #{@account.url_name} created by #{@user.email}!"
    end

    @account.user_accounts.build(
      user_id: @user.id,
      account: @account,
      account_auth: "admin")

    if @account.save
      sign_in(@user)
      redirect_to account_url(@account.url_name)
    else
      User.find(@user.id).delete
      flash.delete(:notice)
      @plan_types = Account.plan_types
      flash.now[:errors] = @account.errors.full_messages
      render :fail
    end
  end

  def update
    @account = Account.find(params[:id])
    @account.update_attributes(params[:account])
    if @account && @account.save
      render json: @account
    else
      if @account
        render json: @account.errors.full_messages,
          status: :unprocessable_entity
      else
        render json: params, status: :unprocessable_entity, status: :not_found
      end
    end
  end

  def check_for_account
    if current_user && current_user.account
      redirect_to account_url(current_user.account.url_name)
    else
      redirect_to new_account_url
    end
  end

end
