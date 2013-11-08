class ResultsController < ApplicationController

  def index

  end

  def create
    @result = Result.new
    @result.form_id = params[:form_id]
    # @result.result = params
    # @result.result.delete("dsjo98432j3j39fp31joifed83jg03j0u9j4f98")
    # @result.form_id = request.query_parameters[:dsjo98432j3j39fp31joifed83jg03j0u9j4f98]
    # request.encode_params(request.request_parameters).with_indifferent_access
    @result.result = request.request_parameters
    if @result.save
      render json: @result
    else
      render json: @result, status: :unprocessable_entity
    end
  end

  def destroy

  end

end
