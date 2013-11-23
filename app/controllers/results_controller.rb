class ResultsController < ApplicationController

  def index
    @results = Result.find_all_by_form_id(params[:form_id])
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
    @result = Result.find(params[:id]);
    if @result.destroy
      render json: @result
    else
      render json: @result, status: :unprocessable_entity
    end
  end

end
