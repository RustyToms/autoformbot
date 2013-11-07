class ResultsController < ApplicationController

  def index

  end

  def create
    @result = Result.new
    @result.form_id = params[:form_id]
    @result.result = params[:results]
    if @result.save
      render json: @result
    else
      render json: @result, status: :unprocessable_entity
    end
  end

  def destroy

  end

end
