require 'test_helper'

class TimeTableTest < ActiveSupport::TestCase
  test 'create timetable without user' do
    t = TimeTable.new
    t.location = "Innsbruck"
    t.name ="Trip2017"
    assert_raises(Exception) do
      t.save
    end
    puts("TimeTable ohne User nicht angelegt.")
  end

  test 'create timetable without location' do
    t = TimeTable.new
    u = User.first
    t.user_id = u.id
    t.name ="Trip2017"
    assert_raises(Exception) do
      t.save
    end
    puts("TimeTable ohne Location nicht angelegt.")
  end

  test 'create timetable without name' do
    t = TimeTable.new
    u = User.first
    t.user_id = u.id
    t.location = "Innsbruck"
    assert_raises(Exception) do
      t.save
    end
    puts("TimeTable ohne Name nicht angelegt.")
  end

  test 'create timetable' do
    t = TimeTable.new
    u = User.first
    t.user_id = u.id
    t.location = "Innsbruck"
    t.name ="Trip2017"
    assert t.save
    puts("TimeTable erfolgreich angelegt.")
  end

end
