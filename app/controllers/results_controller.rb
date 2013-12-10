class ResultsController < ApplicationController

  def index
    @form = Form.includes(:results).joins(:users).readonly(false).
      where(users: {id: current_user.id}).find(params[:form_id])
    @results = @form.results
    @form.results_checked_at = Time.now
    @form.save
    render json: @results
  end

  def create
    @result = Result.new
    @result.form_id = params[:form_id]
    @result.result = request.request_parameters.to_json.to_s
    @form = Form.includes(:users).find(@result.form_id)

    if @result.save
      respond_to do |format|
        format.json { render json: @result }
        format.html {
          if @form.url
            redirect_to @form.url
          else
            redirect_to thank_you_url
          end
        }
      end
      @hash = request.request_parameters
      @form.users.each do |user|
        begin
          result_msg = UserMailer.new_result(user, @result, @form,
            request.request_parameters)
          result_msg.deliver!
        rescue
          p "Problem sending result to #{user.email}"
        end
      end
    else
      render json: @result, status: :unprocessable_entity
    end
  end

  def destroy
    @result = current_user.results.where(id: params[:id])
    if @result.destroy
      render json: @result
    else
      render json: @result, status: :unprocessable_entity
    end
  end

end