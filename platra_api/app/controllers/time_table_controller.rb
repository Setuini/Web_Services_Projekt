class TimeTableController < ApplicationController
  before_action :authenticate_user

  #all timetables for the specific user are shown
  def indexTimeTables
    @time_tables = TimeTable.find_by user_id: current_user.id
    render :json => @time_tables, :include => {:time_table_entries => {:include => {:point_of_interest => {:except => [:id]}}, :except => [:id,:time_table_id,:point_of_interest_id]}}, :except => [:id,:user_id, :created_at, :updated_at];
  end

  #here a new timetable is created
  def saveTimeTable
    msg = [];
    if !(TimeTable.exists?(name: params[:name], user_id: current_user.id))
      timetable = TimeTable.new(:user_id => current_user.id, :name => params[:name], :location => params[:location]);
      timetable.save
      msg.push('TimeTable created successfully');
      render json: { msg: msg.map(&:inspect).join(', ') }, status: 201
    else
      msg.push('TimeTable not created');
      render json: { msg: msg.map(&:inspect).join(', ') }, status: 422
    end
  end

  def deleteTimeTable
    msg[];
    if (TimeTable.exists?(name: params[:name], user_id: current_user.id))
      timetable = TimeTable.find_by user_id: current_user.id, name: params[:name]
      timetable.delete;
      msg.push('TimeTable deleted successfully');
      render json: { msg: msg.map(&:inspect).join(', ') }, status: 201
    else
      msg.push('TimeTable not created');
      render json: { msg: msg.map(&:inspect).join(', ') }, status: 422
    end
  end

  def changeTimeTable
    msg[];
    if (TimeTable.exists?(name: params[:name], user_id: current_user.id))
      timetable = TimeTable.find_by user_id: current_user.id, name: params[:name]
      timetable.name = params[:name];
      timetable.location = params[:location];
      timetable.save;
      msg.push('TimeTable changed successfully');
      render json: { msg: msg.map(&:inspect).join(', ') }, status: 201
    else
      msg.push('TimeTable not created');
      render json: { msg: msg.map(&:inspect).join(', ') }, status: 422
    end
  end

  def saveTimeTableEntry
    msg = [];
    if (PointOfInterest.exists?(place_id: params[:place_id])) && (TimeTable.exists?(name: params[:name], user_id: current_user.id))
      table = TimeTable.find_by place_id: params[:name], user_id: current_user.id;
      poi = PointOfInterest.find_by place_id: params[:place_id]
      if !TimeTableEntry.exists?(time_table_id: table.id, begin: params[:begin], end: params[:end])
        td = TimeTableEntry.new(:point_of_interest_id => poi.id,time_table_id => table.id,:begin => params[:begin], :end => params[:end], :types => params[:types]);
        td.save
        msg.push('TimeTableEntry created successfully');
        render json: { msg: msg.map(&:inspect).join(', ') }, status: 201
      else
        msg.push('TimeTableEntry already there');
        render json: { msg: msg.map(&:inspect).join(', ') }, status: 201
      end
    else
      msg.push('TimeTable or PointOfInterest not created');
      render json: { msg: msg.map(&:inspect).join(', ') }, status: 422
    end
  end

  def deleteTimeTableEntry
    msg = [];
    if (PointOfInterest.exists?(place_id: params[:place_id])) && (TimeTable.exists?(name: params[:name], user_id: current_user.id))
      table = TimeTable.find_by place_id: params[:name], user_id: current_user.id;
      poi = PointOfInterest.find_by place_id: params[:place_id]
      if TimeTableEntry.exists?(time_table_id: table.id, begin: params[:begin], end: params[:end])
        td = TimeTableEntry.find_by time_table_id: table.id, begin: params[:begin], end: params[:end]
        td.delete
        msg.push('TimeTableEntry deleted successfully');
        render json: { msg: msg.map(&:inspect).join(', ') }, status: 201
      else
        msg.push('TimeTableEntry not there');
        render json: { msg: msg.map(&:inspect).join(', ') }, status: 201
      end
    else
      msg.push('TimeTable or PointOfInterest not created');
      render json: { msg: msg.map(&:inspect).join(', ') }, status: 422
    end
  end

  def changeTimeTableEntry
    msg = [];
    if (PointOfInterest.exists?(place_id: params[:place_id])) && (TimeTable.exists?(name: params[:name], user_id: current_user.id))
      table = TimeTable.find_by place_id: params[:name], user_id: current_user.id;
      poi = PointOfInterest.find_by place_id: params[:place_id]
      if TimeTableEntry.exists?(time_table_id: table.id, begin: params[:begin], end: params[:end])
        td = TimeTableEntry.find_by time_table_id: table.id, begin: params[:begin], end: params[:end]

        td.point_of_interest_id = poi.id;
        td.begin = params[:new_begin];
        td.end = params[:new_end];
        td.types = params[:types];

        td.save;

        msg.push('TimeTableEntry changed successfully');
        render json: { msg: msg.map(&:inspect).join(', ') }, status: 201
      else
        msg.push('TimeTableEntry not there');
        render json: { msg: msg.map(&:inspect).join(', ') }, status: 201
      end
    else
      msg.push('TimeTable or PointOfInterest not created');
      render json: { msg: msg.map(&:inspect).join(', ') }, status: 422
    end
  end

end
