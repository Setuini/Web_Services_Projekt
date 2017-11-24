# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171111171059) do

  create_table "point_of_interests", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "longitude", null: false
    t.string "latitude", null: false
    t.string "params"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "time_table_entries", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "time_table_id", null: false
    t.bigint "point_of_interest_id", null: false
    t.datetime "begin", null: false
    t.datetime "end", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["point_of_interest_id", "begin", "end"], name: "my_index", unique: true
    t.index ["time_table_id"], name: "fk_rails_950a206353"
  end

  create_table "time_tables", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.string "location", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "fk_rails_4669d9d4d1"
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "email", null: false
    t.string "password", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "time_table_entries", "point_of_interests"
  add_foreign_key "time_table_entries", "time_tables"
  add_foreign_key "time_tables", "users"
end
