class ResultsController < ApplicationController
  
  def index
    
  end
  
  def create
    @result = Result.new
    @result.form_id = params[:form_id]
    @result.result = params[:results]
    sleep 3
    if @result.save
      fail
      flash[:notice] = "Form submitted!"
      render json: @result      # 
      # redirect_to 'google.com'
    else      # 
      # fail
      # flash.now[:errors] = @result.errors.full_messages
      render json: @result, status: :unprocessable_entity
    end
  end
  
  def destroy
    
  end
  
end
