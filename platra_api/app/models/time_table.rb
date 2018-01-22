class TimeTable < ApplicationRecord
  belongs_to :user
  has_many :time_table_entries
end
