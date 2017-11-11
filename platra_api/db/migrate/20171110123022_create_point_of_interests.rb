class CreatePointOfInterests < ActiveRecord::Migration[5.1]
  def change
    create_table :point_of_interests do |t|
      t.bigint :time_table_id
      t.string :longitude
      t.string :latitude
      t.string :begin
      t.string :end
      t.string :params
      t.timestamps
    end
    add_foreign_key :point_of_interests, :time_tables
  end
end
