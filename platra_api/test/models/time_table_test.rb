

class TimeTableTest < ActiveSupport::TestCase
  test 'create timetable without user' do
    t = TimeTable.new
    t.location = "Innsbruck"
    t.name ="Trip2017"
    assert_raises(Exception) do
      t.save
    end
  end

  test 'create timetable without location' do
    t = TimeTable.new
    u = User.first
    t.user_id = u.id
    t.name ="Trip2017"
    assert_raises(Exception) do
      t.save
    end
  end

  test 'create timetable without name' do
    t = TimeTable.new
    u = User.first
    t.user_id = u.id
    t.location = "Innsbruck"
    assert_raises(Exception) do
      t.save
    end
  end

  test 'create timetable' do
    t = TimeTable.new
    u = User.first
    t.user_id = u.id
    t.location = "Innsbruck"
    t.name ="Trip2017"
    assert t.save, "Timetable erfolgreich angelegt"
  end

end
