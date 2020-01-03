import React, { Component } from 'react'
import { productsAPI } from '../../../../../services/util'

export class NewReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      review: '',
      rating: '',
    }
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var rating = parseInt(this.state.rating);
    const review = {
      id: this.props.productId,
      name: this.state.review,
      rating: rating
    }

    fetch(productsAPI + 'products/' + review.id + '/reviews', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(review)
    }).catch(err => {
      console.log('Could not post review.', err);
    });
  }

  render() {
    return (
      <div className="reivews-form">
        <form onSubmit={this.handleSubmit}>
          <h4>Add a review</h4>
          <div className="d-flex flex-wrap">
            <div className="col-3 col-xs-12">
              <label>Choose Nickname</label>
            </div>
            <div className="col-9 col-xs-12">
              <input type="text" name="name" value={this.state.name} onChange={this.handleInput} />
            </div>
          

            <div className="col-3 col-xs-12">
              <label>Add Review</label>  
            </div>
            <div className="col-9 col-xs-12">
              <textarea name="review" value={this.state.review} onChange={this.handleInput} />
            </div>
            <div className="col-3 col-xs-12">
          <label>Rating:</label>
          </div>
          <div className="col-9 col-xs-12">
          <input type="number" name="rating" value={this.state.rating} onChange={this.handleInput} />
          <br />
          <button type="submit">Submit</button>
          </div>
          
          </div>
        </form>
      </div>
    )
  }
}

export default NewReview;
