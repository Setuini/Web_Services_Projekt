class CreateTimeTableEntries < ActiveRecord::Migration[5.1]
  def change
    create_table :time_table_entries do |t|
      t.bigint :time_table_id
      t.datetime :begin
      t.datetime :end
      t.timestamps
    end
    add_foreign_key :time_table_entries, :time_tables
  end
end
