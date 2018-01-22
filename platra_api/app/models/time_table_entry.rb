class TimeTableEntry < ApplicationRecord
  belongs_to :point_of_interest
  belongs_to :time_table
end
