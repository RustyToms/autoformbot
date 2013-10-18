class AccountsController < ApplicationController
  # before_filter :authenticate_user!

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
    @account = Account.new(params[:account])
    @account.user_accounts.build(
      user_id: current_user.id,
      account: @account.id,
      account_auth: "admin")

    if @account.save
      flash[:notice] = "Account #{@account.url_name} created!"
      redirect_to account_url(current_user.account.url_name)
    else
      @plan_types = Account.plan_types
      flash.now[:errors] = @account.errors.full_messages
      render :new
    end
  end


  def edit

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
    if current_user.account
      redirect_to account_url(current_user.account.url_name)
    else
      redirect_to new_account_url
    end
  end

  def destroy

  end

end
