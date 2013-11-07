class ResultsController < ApplicationController

  def index

  end

  def create
    @result = Result.new
    @result.form_id = params[:dsjo98432j3j39fp31joifed83jg03j0u9j4f98]
    @result.result = params
    @result.result.delete("dsjo98432j3j39fp31joifed83jg03j0u9j4f98")
    if @result.save
      render json: @result
    else
      render json: @result, status: :unprocessable_entity
    end
  end

  def destroy

  end

end
