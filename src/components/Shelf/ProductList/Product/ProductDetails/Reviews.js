import React, { Component } from 'react'
import { productsAPI } from '../../../../../services/util'
import Rating from './Rating';

export class ProductReviews extends Component {
  constructor(props){
    super(props);
    this.state = {
      reviews: []
    }
  }
  componentWillMount = () => {
    // fetch(productsAPI+'products/'+this.props.productId+'/reviews').then(response=>response.json())
    // .then(reviews => this.setState({reviews: reviews}))
    fetch('https://backendapi.turing.com/products/' +this.props.productId+'/reviews').then(response=>response.json())
    .then(reviews => this.setState({reviews: reviews}, () => console.log('Reviews', this.state.reviews)))
  }
  render() {
    const {reviews} = this.state;
    const displayReviews = reviews.slice(0,3).map(review => (
      <div className="d-flex reviews" key={review.created_on}>
      <div className="col-3 col-xs-12">
        <h4>{review.name}</h4>
        <p><Rating /> {review.rating}</p>
        <h4>Review Date:</h4>
        <p>{review.created_on}</p>
      </div>
      <div className="col-7 col-xs-12">
        <p>Review: {review.review}</p>
      </div>
        
        
        
      </div>
    ))
    return (
      <div>
        {displayReviews}
      </div>
    )
  }
}


export default ProductReviews;
