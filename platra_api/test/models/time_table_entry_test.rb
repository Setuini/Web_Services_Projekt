require 'date'
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
  end

  test 'create timetableentry' do
    te = TimeTableEntry.new
    t = TimeTable.first
    te.time_table_id = t.id
    p = PointOfInterest.first
    te.point_of_interest_id = p.id
    te.begin = DateTime.new(2017,11,24,0,0,0)
    te.end = DateTime.new(2017,11,24,1,0,0)
    assert te.save, "TimeTableEntry erfolgreich erstellt"
  end
end
