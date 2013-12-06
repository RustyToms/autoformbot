class ResultsController < ApplicationController

  def index
    @form = Form.includes(:results).joins(:users).
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
    @url = Form.find(@result.form_id).url

    if @result.save
      respond_to do |format|
        format.json { render json: @result }
        format.html {
          if @url
            redirect_to @url
          else
            redirect_to thank_you_url
          end
        }
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