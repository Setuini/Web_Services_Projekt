import React  from 'react';
import { Container, Row, Button } from 'reactstrap';
import { UserTimetableDay } from './UserTimetableDay.js';
import moment from 'moment';

export class UserTimetablePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pageNumber: this.props.pageNumber,
            location: this.props.location,
            jsonData: this.props.jsonData,
            errors: '',
            fetchInProgress: false
        };
        this.prevPage = this.props.prevPage;
        this.nextPage = this.props.nextPage;
        this.deletePage = this.deletePage.bind(this);
        this.getDay = this.getDay.bind(this);
    }

    getDay(weekday){
        if (weekday === 1) {
            return "Monday";
        }else if(weekday === 2){
            return "Tuesday";
        }else if(weekday === 3){
            return "Wednesday";
        }else if(weekday === 4){
            return "Thursday";
        }else if(weekday === 5){
            return "Friday";
        }else if(weekday === 6){
            return "Saturday";
        }else if(weekday === 0){
            return "Sunday";
        }else{
            return undefined;
        }
    }

    deletePage(){
        var myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json')
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('jwt')));
        //console.log("Timetable.js - Fetch");

        this.setState({fetchInProgress: true});
        fetch("http://localhost:3000/api/v1/deletePage",{
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            body: JSON.stringify({
                name: this.state.jsonData.name,
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((resdata) => {
                Object.keys(resdata).forEach(function(key) {
                });
            })
            .catch( (ex) => {
                console.log("Timetable - Fetch failed: " + ex);
                this.setState({
                    errors : ex,
                    fetchInProgress: false
                });
            });
    }

    render() {
        var map = new Map();
        for (var i in this.state.jsonData.time_table_entries) {
            var datetime = new Date(this.state.jsonData.time_table_entries[i].begin);
            if(map.has(datetime.toDateString())){
                var list = map.get(datetime.toDateString());
                list.push(this.state.jsonData.time_table_entries[i]);
                map[datetime.toDateString()] = list;
            } else {
                var list = new Array(this.state.jsonData.time_table_entries[i]);
                map.set(datetime.toDateString(),list);
            }
        }
        var timetableDays = [];
        var self = this;
        map.forEach(function(value,key,m){
            var date = new Date(key);
            var date = moment(date).format("DD/MM/YYYY");
            var day = self.getDay(moment(date).day());
            timetableDays.push(<UserTimetableDay day={day} date={date} key={key} dayData={value} name={self.state.jsonData.name}/>);
        })

        return (
            <div>
                <Container>
                    <Row>
                        <Button onClick={this.prevPage}>Prev</Button>
                        <Button onClick={this.nextPage}>Next</Button>
                        <Button onClick={this.deletePage}>Delete</Button>
                        UserTimetableDay {this.state.pageNumber} Start {this.startDate} End {this.endDate}
                        {timetableDays}
                    </Row>
                </Container>
            </div>
        );
    }

}
