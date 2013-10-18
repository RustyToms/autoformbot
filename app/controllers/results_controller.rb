class ResultsController < ApplicationController
  
  def index
    
  end
  
  def create
    @result = Result.new
    @result.form_id = params[:form_id]
    @result.result = params[:results]
    if @result.save
      flash[:notice] = "Form submitted!"
      render json: @result
      # redirect_to params[:redirect_url]
    else
      flash.now[:errors] = @result.errors.full_messages
      render json: @result
    end
  end
  
  def destroy
    
  end
  
end
