import React, { Component } from 'react';
import moment from 'moment';
import Header from './Header';
import Data from './Data';
import Request from 'superagent';
import Lo from 'lodash';

import DayPicker, { DateUtils } from "react-day-picker";

import 'react-day-picker/lib/style.css';
import styles from './style.css';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: moment().format('YYYY-M-D'), // The value of the input field
      month: new Date(), // The month to display in the calendar
      //month: moment().subtract(3, 'days').calendar();
    };
    this.handleDayClick = this.handleDayClick.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.search();
  }



  updateSearch(event){
    this.setState( {query: this.refs.query.value});
    this.setState({value: event.target.value});
  }


  handleDayClick(e, day) {
    this.setState({
      value: moment(day).format('YYYY-M-D'),
      month: day,
    });
    this.search(this.refs.query.value);
  }



  render(){

    const selectedDay = moment(this.state.value, 'YYYY-M-D', true).toDate();


    var photos = _.map(this.state.photos, (photo) =>{
      //if (photo.camera.name == "FHAZ"){
        var chemcam_photos = [];
        chemcam_photos.push(<li className="photos" key={photo.id}><img src={photo.img_src} /><figcaption>{photo.camera.name}</figcaption><p></p></li>)
          return chemcam_photos;
      //}
    });
    var tot = photos.length;


      return (

        <div>
        <p>
        <input
            ref="query"
            type="text"
            value={ this.state.value }
            onChange={ this.updateSearch }
          />

        </p>
        <DayPicker
          ref="daypicker"
          numberOfMonths={ 2 }
          initialMonth={ this.state.month }
          selectedDays={ day => DateUtils.isSameDay(selectedDay, day) }
          onDayClick={ this.handleDayClick }
        />

        <ul className="wrapper">{ photos }</ul>

        </div>
      );
  }



  search(query = "2016-9-20"){
    var today = new Date();

  var url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${query}&api_key=qidPkewtXuEFNxTbml2GIOzpVU91yIRoPYcGzcgk`;
    Request.get(url).then( (response) => {
      this.setState ( {
        photos: response.body.photos
      });
    });

  }


}

