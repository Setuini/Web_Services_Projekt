class TimeTableController < ApplicationController
  before_action :authenticate_user

  #all timetables for the specific user are shown
  def indexTimeTables
    @time_tables = TimeTable.find_by user_id: current_user.id
    render :json => @time_tables, :include => {:time_table_entries => {:include => :point_of_interest}}, :except => [:id, :created_at, :updated_at];
  end

  #here a new timetable is created
  def saveTimeTable

  end

  #here the entries are saved
  def saveEntry
    if (TimeTable.exists?(id: params[:timeTableId], user_id: current_user.id))

    else

    end
  end
end