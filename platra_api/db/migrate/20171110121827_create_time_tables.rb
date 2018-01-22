class CreateTimeTables < ActiveRecord::Migration[5.1]
  def change
    create_table :time_tables do |t|
      t.bigint :user_id, null:false
      t.string :name, null:false
      t.string :location, null:false
      t.timestamps
    end
    add_foreign_key :time_tables, :users
    add_index :time_tables, [:user_id,:name], unique: true, :name => 'my_time_table_index'
  end
end
