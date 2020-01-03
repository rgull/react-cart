import React from 'react';
import { connect } from 'react-redux';
import {pageChanged} from '../../services/shelf/actions';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: props.productLength/props.products.length
    };
  }

  handlePaging = (e) => {
    console.log('E',e);
    this.props.pageChanged('products/page/', e);
  }

  render() {
    var page=[];
    for(var i=1; i<= this.state.pages; i++){
      page.push(i);
    }
    if(page.length<this.state.pages){
      page.push(page.length +1);
    }
    const Pages = page.map(x=>(
      <span key={x}><a style={{cursor:"pointer"}} onClick={this.handlePaging.bind(this,x)}>{x}</a></span>
    ));

    return (
      <div className="page">
        <div className="interactions">
        {Pages}
        </div>
      </div>
    );
  }
}

export default connect(null, {pageChanged})(Page);
