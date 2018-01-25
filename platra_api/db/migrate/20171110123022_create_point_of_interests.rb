class CreatePointOfInterests < ActiveRecord::Migration[5.1]
  def change
    create_table :point_of_interests do |t|
      t.string :location, null:false
      t.string :name, null:false
      t.string :longitude, null:false
      t.string :latitude, null:false
      t.text :params
      t.string :place_id
      t.string :types
      t.timestamps
    end
    add_index :point_of_interests, [:place_id], unique: true, :name => 'my_uq_index'
  end
end
