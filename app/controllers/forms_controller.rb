class FormsController < ApplicationController
  before_filter :authenticate_user!, except: [:show]

  def show
    @form = Form.find(params[:id])

    @form_wrapper = @form.make_form_wrapper
    if params[:download]
      send_data render_to_string(:show),
        type: "text/html",
        :disposition => "attachment; filename=#{@form.name}.html"
    else
      render :show
    end
  end

  def create
    @form = Form.new(params[:form])
    if @form.save
      render json: @form
    else
      render json: @form.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @form = get_form(params[:id])
    unless @form
      render json: params, status: :not_found
    end
    @form.update_attributes(params[:form])
    @form.update_url
    @form.updated_at = DateTime.now

    if @form.save
      render json: @form
    else
      render json: @form.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @form = get_form(params[:id])
    if @form && @form.destroy
      render json: @form
    else
      render json: @form, status: :unprocessable_entity
    end
  end

  def get_form(form_id)
    # only finds a form if it is in the current user's account
    Form.joins(:users).readonly(false).where(users: {id: current_user.id}).
      find(form_id)
  end
end
