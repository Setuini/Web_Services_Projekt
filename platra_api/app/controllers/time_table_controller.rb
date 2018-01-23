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
      timetable = TimeTabele.new(:user_id => current_user.id, :name => params[:name], :location => params[:location]);
      timetable.save
      msg.push('TimeTable created successfully');
      render json: { msg: msg.map(&:inspect).join(', ') }, status: 201
    else
      msg.push('TimeTable not created');
      render json: { msg: msg.map(&:inspect).join(', ') }, status: 422
    end
  end

  #here pointofinterest is saved
  def savePoI
    msg = [];
    if !(PointOfInterest.exists?(name: params[:name], longitude: params[:longitude], latitude: params[:latitude]))
      poi = PointOfInterest.new(:location => params[:location],:name => params[:name], :longitude => params[:longitude], :latitude => params[:latitude], :params => params[:params]);
      poi.save
      msg.push('PointOfInterest created successfully');
      render json: { msg: msg.map(&:inspect).join(', ') }, status: 201
    else
      msg.push('PointOfInterest not created');
      render json: { msg: msg.map(&:inspect).join(', ') }, status: 422
    end
  end

  #if entry is older than 2 weeks, delete all poi of this location
  def isOlderTwoWeeks(name)
    if PointOfInterest.exists?(name: name)
      poi = PointOfInterest.find_by location: name
      time = DateTime.now.to_i - poi.created_at.to_i
      if time > 60*60*24*14
        PointOfInterest.where(:location => "Innsbruck").destroy_all
        true
      else
        false
      end
    else
      true
    end
  end

  def timeTableEntry
    msg = [];
    if !(PointOfInterest.exists?(name: params[:nameP], longitude: params[:longitude], latitude: params[:latitude])) || !(TimeTable.exists?(name: params[:nameT], user_id: current_user.id))
      table = TimeTable.find_by name: params[:nameT], user_id: current_user.id;
      poi = PointOfInterest.find_by name: params[:name], longitude: params[:longitude], latitude: params[:latitude]
      td = TimeTableEntry.new(:point_of_interest_id => poi.id,time_table_id => table.id,:begin => params[:begin], :end => params[:end]);
      td.save
      msg.push('PointOfInterest created successfully');
      render json: { msg: msg.map(&:inspect).join(', ') }, status: 201
    else
      msg.push('TimeTableEntry not created');
      render json: { msg: msg.map(&:inspect).join(', ') }, status: 422
    end
  end
end