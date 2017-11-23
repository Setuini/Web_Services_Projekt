class CreatePointOfInterests < ActiveRecord::Migration[5.1]
  def change
    create_table :point_of_interests do |t|
      t.string :longitude
      t.string :latitude
      t.string :params
      t.timestamps
    end
  end
end
