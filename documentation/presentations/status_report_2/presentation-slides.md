# Overview

- Class diagram

- Routes

- User scenarios

# Class diagram

```graphviz
digraph G {
        fontname = "Bitstream Vera Sans"
        fontsize = 8

        node [
                fontname = "Bitstream Vera Sans"
                fontsize = 8
                shape = "record"
        ]

        edge [
                fontname = "Bitstream Vera Sans"
                fontsize = 8
        ]

        PointOfInterest [
                label = "{PointOfInterest|+ id : int\l+ name : string\l+ longitude : float\l+ latitude : float
                            \l+ params : string\l+ created_at : datetime\l+ updated_at : datetime\l
                            | \l}"
        ]

        TimeTable [
                label = "{TimeTable|+ id : int\l+ user_id : int\l+ name : string
                            \l+ location : string\l+ created_at : datetime\l+ updated_at : datetime\l
                            | \l}"
        ]

        TimeTableEntry [
                label = "{TimeTableEntry|+ id : int\l+ time_table_id : int\l+ point_of_interest_id : int
                            \l+ begin : datetime\l+ end : datetime
                            \l+ created_at : datetime\l+ updated_at : datetime\l
                            | \l}"
        ]

        User [
                label = "{User|+ id : int\l+ email: string\l+ password : string 
                            \l+ created_at : datetime\l+ updated_at : datetime\l
                            | \l}"
        ]

        edge [
                arrowhead = "none"

                headlabel = "0..*"
                taillabel = "0..*"
        ]

        TimeTable -> TimeTableEntry 
        PointOfInterest -> TimeTableEntry

        edge [
                arrowhead = "none"

                headlabel = "0..*"
                taillabel = "1"
        ]
        User -> TimeTable 
}
```

# Routes - User

| Action                  | Example URI                |
|-------------------------|----------------------------|
| Login                   | POST /api/v1/user/login    |
| Logout                  | POST /api/v1/user/logout   |
| Register                | POST /api/v1/user/register |
| Get user information    | GET  /api/v1/user/[id]     |
| Update user information | PUT  /api/v1/user/[id]     |

# Routes - Travel plan

| Action                             | Example URI              |
|------------------------------------|--------------------------|
| Get travel plan based on location, | POST /api/v1/plan        |
| arrival and departure time         |                          |
| Save travel plan                   | POST /api/v1/plan/save   |
| Change travel plan                 | PUT /api/v1/plan/[id]    |
| Delete travel plan                 | DELETE /api/v1/plan/[id] |

# User scenarios 

- Initial travel planning    

- Change travel plan 

- 

# 

Thank you for your attention!



