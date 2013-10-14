class FormsController < ApplicationController
  before_filter :authenticate_user!

  def index
  end


  def show

  end


  def new
    @form = Form.new
    @form.account_id = current_user.account.id
    @form.set_name
    render :new
  end


  def create
    @form = Form.new(params[:form])
    if @form.save
      render json: @form
    else
      render json: @form.errors.full_messages, status: :unprocessable_entity
    end
  end


  def edit

  end


  def update
    @form = Form.find(params[:id])
    @form.update_attributes(params[:form])
    if @form && @form.save
      render json: @form
    else
      if @form
        render json: @form.errors.full_messages, status: :unprocessable_entity
      else
        render json: params, status: :unprocessable_entity, status: :not_found
      end
    end
  end

  def destroy
    @form = Form.find(params[:id])
    if @form.destroy
      render json: @form
    else
      render json: @form, status: :unprocessable_entity
    end
  end


end
