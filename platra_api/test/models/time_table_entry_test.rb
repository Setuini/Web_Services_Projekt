require 'date'
require 'test_helper'

class TimeTableEntryTest < ActiveSupport::TestCase
  test 'create timetableentry without timetable' do
    te = TimeTableEntry.new
    p = PointOfInterest.first
    te.point_of_interest_id = p.id
    te.begin = DateTime.new(2017,11,24,0,0,0)
    te.end = DateTime.new(2017,11,24,1,0,0)
    assert_raises(Exception) do
      te.save
    end
    puts("TimeTableEntry ohne TimeTable nicht angelegt.")
  end

  test 'create timetableentry without pointOfInterest' do
    te = TimeTableEntry.new
    t = TimeTable.first
    te.time_table_id = t.id
    te.begin = DateTime.new(2017,11,24,0,0,0)
    te.end = DateTime.new(2017,11,24,1,0,0)
    assert_raises(Exception) do
      te.save
    end
    puts("TimeTableEntry ohne PointOfInterest nicht angelegt.")
  end

  test 'create timetableentry without begin' do
    te = TimeTableEntry.new
    t = TimeTable.first
    te.time_table_id = t.id
    p = PointOfInterest.first
    te.point_of_interest_id = p.id
    te.end = DateTime.new(2017,11,24,1,0,0)
    assert_raises(Exception) do
      te.save
    end
    puts("TimeTableEntry ohne Start nicht angelegt.")
  end

  test 'create timetableentry without end' do
    te = TimeTableEntry.new
    t = TimeTable.first
    te.time_table_id = t.id
    p = PointOfInterest.first
    te.point_of_interest_id = p.id
    te.begin = DateTime.new(2017,11,24,0,0,0)
    assert_raises(Exception) do
      te.save
    end
    puts("TimeTableEntry ohne Ende nicht angelegt.")
  end

  test 'create timetableentry with same start,end and timetable' do
    te = TimeTableEntry.new
    t = TimeTable.first
    te.time_table_id = t.id
    p = PointOfInterest.first
    te.point_of_interest_id = p.id
    te.begin = DateTime.new(2017,11,24,0,0,0)
    te.end = DateTime.new(2017,11,24,1,0,0)
    assert_raises(Exception) do
      te.save
    end
    puts("TimeTableEntry mit gleichem Ende,Start und TimeTable nicht angelegt.")
  end

  test 'create timetableentry' do
    te = TimeTableEntry.new
    t = TimeTable.first
    te.time_table_id = t.id
    p = PointOfInterest.first
    te.point_of_interest_id = p.id
    te.begin = DateTime.new(2017,11,24,1,0,0)
    te.end = DateTime.new(2017,11,24,2,0,0)
    assert te.save
    puts("TimeTableEntry erfolgreich angelegt.")
  end
end
