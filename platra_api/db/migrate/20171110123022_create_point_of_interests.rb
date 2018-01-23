class CreatePointOfInterests < ActiveRecord::Migration[5.1]
  def change
    create_table :point_of_interests do |t|
      t.string :location, null:false
      t.string :name, null:false
      t.string :longitude, null:false
      t.string :latitude, null:false
      t.string :params
      t.timestamps
    end
    add_index :point_of_interests, [:location,:name,:longitude,:latitude], unique: true, :name => 'my_uq_index'
  end
end
