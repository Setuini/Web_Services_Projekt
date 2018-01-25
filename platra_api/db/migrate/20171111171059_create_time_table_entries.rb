class CreateTimeTableEntries < ActiveRecord::Migration[5.1]
  def change
    create_table :time_table_entries do |t|
      t.bigint :time_table_id, null:false
      t.bigint :point_of_interest_id, null:false
      t.datetime :begin, null:false
      t.datetime :end, null:false
      t.string :types
      t.timestamps
    end
    add_foreign_key :time_table_entries, :time_tables
    add_foreign_key :time_table_entries, :point_of_interests
    add_index :time_table_entries, [:time_table_id,:begin,:end], unique: true, :name => 'my_index'

  end
end
