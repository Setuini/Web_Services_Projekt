import React  from 'react';
import { UserTimetablePage } from './UserTimetablePage.js';

export class UserTimetable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activePage: 0,
            pages: 1,
            data: '',
            errors: '',
            fetchInProgress: false
        };
        this.jsonDataSaved;
        //this.getDay = this.getDay.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }


    componentWillMount(){
        var myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json')
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('jwt')));
        //console.log("Timetable.js - Fetch");

        this.setState({fetchInProgress: true});
        fetch("http://localhost:3000/api/v1/places",{
            method: 'GET',
            headers: myHeaders,
            mode: 'cors'
        })
            .then((res) => {
                return res.json();
            })
            .then((resdata) => {
                Object.keys(resdata).forEach(function(key) {
                });
                this.jsonDataSaved = resdata;
                this.setState({
                    data: resdata,
                    //desc: JSON.stringify(resdata.body),
                    //img: resdata.url,
                    fetchInProgress: false
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


    nextPage(){
        this.setState({
            activePage: this.state.activePage+1
        });
    }

    prevPage(){
        this.setState({
            activePage: this.state.activePage-1
        });
    }

    // create timetable according to days of the fetch
    render() {
        var pages=[];
        for (var i in this.jsonDataSaved) {
            pages.push(<UserTimetablePage key={i} pageNumber={i} prevPage={this.prevPage} nextPage={this.nextPage} jsonData={this.jsonDataSaved[i]}/>);
        }

        return (
            <div>
                {pages[this.state.activePage]}
            </div>
        );
    }

}
