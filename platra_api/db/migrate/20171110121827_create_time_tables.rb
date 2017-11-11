class CreateTimeTables < ActiveRecord::Migration[5.1]
  def change
    create_table :time_tables do |t|
      t.string :name
      t.bigint :user_id
      t.timestamps
    end
    add_foreign_key :time_tables, :users
  end
end
