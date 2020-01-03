import React, { Component } from 'react'

export class Rating extends Component {
  render() {
    var page=[];
    for(var i=1; i<= 5; i++){
      page.push(i);
    }
    const Pages = page.map(x=>(
      <span className="rating active" key={x}><a style={{cursor:"pointer"}}>{x}</a></span>
    ));
    return (
      <div>
        {Pages}
      </div>
    )
  }
}

export default Rating
