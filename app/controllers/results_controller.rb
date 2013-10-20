class ResultsController < ApplicationController
  
  def index
    
  end
  
  def create
    @result = Result.new
    @result.form_id = params[:form_id]
    @result.result = params[:results]
    @params = params
    if @result.save
      # render json: @result      
      render text: ""
    else  
      render json: @params
      # render json: @result, status: :unprocessable_entity, @result.errors.full_messages
    end
  end
  
  def destroy
    
  end
  
end
