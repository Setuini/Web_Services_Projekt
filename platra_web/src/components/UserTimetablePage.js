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

    render() {
        console.log(this.state.jsonData.time_table_entries);
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
        var i = 0;
        for(var key in map){
            var date = new Date(key);
            var date = moment(date).format("DD/MM/YYYY");
            var day = this.getDay(moment(date).day());
            timetableDays.push(<UserTimetableDay day={day} date={date} key={i} dayData={map.get(key)}/>);
            i++;
        }
        /*var timetableDays = [];
        for (var i = 0; i < 3; i++) {
            var date = moment(this.state.startDate).add(i,'days').format("DD/MM/YYYY");
            var day = this.getDay(moment(this.state.startDate).add(i,'days').day());
            timetableDays.push(<TimetableDay day={day} date={date} key={i} jsonData={this.state.jsonData}/>);
        }*/
        return (
            <div>
                <Container>
                    <Row>
                        <Button onClick={this.prevPage}>Prev</Button>
                        <Button onClick={this.nextPage}>Next</Button>
                        UserTimetableDay {this.state.pageNumber} Start {this.startDate} End {this.endDate}
                        {timetableDays}
                    </Row>
                </Container>
            </div>
        );
    }

}
