class ResultsController < ApplicationController
  
  def index
    
  end
  
  def create
    @result = Result.new
    @result.form_id = params[:id]
    @result.result = params[:results]
    if @result.save
      flash[:notice] = "Form submitted!"
      redirect_to params[:redirect_url]
    else
      flash.now[:errors] = @account.errors.full_messages
      render text: "form submission unsuccessful"
    end
  end
  
  def destroy
    
  end
  
end
