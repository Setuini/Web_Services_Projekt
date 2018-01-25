# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
users = User.create(name: 'Max Muster', email: 'max.muster@uibk.at', password: '1234')
timetable = TimeTable.create(user_id: users.id, name: 'Innsbruck2016', location: 'Innsbruck')
timetable2 = TimeTable.create(user_id: users.id, name: 'Innsbruck2017', location: 'Innsbruck')
pointointerest = PointOfInterest.create(location: "Innsbruck",name: "Uni Innsbruck",longitude: 1, latitude:1,types:"Uni",place_id:"Abc")
pointointerest2 = PointOfInterest.create(location: "Innsbruck",name: "Technik",longitude: 2, latitude:2,types:"Uni",place_id:"Abcd")
pointointerest3 = PointOfInterest.create(location: "Innsbruck",name: "InNoTrip",longitude: 3, latitude:3,types:"Uni",place_id:"Abcde")

timetableentry = TimeTableEntry.create(time_table_id: timetable.id,point_of_interest_id: pointointerest.id,begin: DateTime.new(2017,11,24,0,0,0), end: DateTime.new(2017,11,24,1,0,0), types: "I dont know")
timetableentry = TimeTableEntry.create(time_table_id: timetable.id,point_of_interest_id: pointointerest2.id,begin: DateTime.new(2017,11,24,2,0,0), end: DateTime.new(2017,11,24,3,0,0), types: "I dont know")

timetableentry = TimeTableEntry.create(time_table_id: timetable2.id,point_of_interest_id: pointointerest.id,begin: DateTime.new(2018,11,24,0,0,0), end: DateTime.new(2018,11,24,1,0,0), types: "I dont know")
timetableentry = TimeTableEntry.create(time_table_id: timetable2.id,point_of_interest_id: pointointerest2.id,begin: DateTime.new(2018,11,24,2,0,0), end: DateTime.new(2018,11,24,3,0,0), types: "I dont know")

