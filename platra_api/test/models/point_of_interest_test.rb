require 'test_helper'

class PointOfInterestTest < ActiveSupport::TestCase
  test 'create pointOfInterest without latitude' do
    p = PointOfInterest.new
    p.longitude = 1
    assert_raises(Exception) do
      t.save
    end
    puts("PointOfInterest ohne Längengrad nicht angelegt.")
  end

  test 'create pointOfInterest without longitude' do
    p = PointOfInterest.new
    p.latitude = 1
    assert_raises(Exception) do
      t.save
    end
    puts("PointOfInterest ohne Breitengrad nicht angelegt.")
  end

  test 'create pointOfInterest' do
    p = PointOfInterest.new
    p.longitude = 1
    p.latitude = 1
    assert p.save
    puts("PointOfInterest erfolgreich angelegt.")
  end
end
