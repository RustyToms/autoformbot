class ResultsController < ApplicationController

  def index

  end

  def create
    @result = Result.new
    @result.form_id = params[:form_id]
    @result.result = request.request_parameters

    @url = Form.find(@result.form_id).url
    @url = thank_you_url unless @url

    if @result.save
      respond_to do |format|
        format.json { render json: @result }
        format.html { redirect_to @url}
      end
    else
      render json: @result, status: :unprocessable_entity
    end
  end

  def destroy

  end

end
