import React, { Component } from 'react';
import { productsAPI } from '../../../../../services/util'



export class Attributes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attributes: []
    }
  }
  componentDidMount = () => {
    // fetch(productsAPI+'attributes/inProduct/'+this.props.productId).then(response=>response.json())
    // .then(attributes => this.setState({attributes: attributes}))
    fetch('https://backendapi.turing.com/attributes/inProduct/' + this.props.productId).then(response => response.json())
      .then(attributes => this.setState({ attributes: attributes }, () => console.log('Attributes', this.state.attributes)))
  }

  render() {
    // const Color = this.state.attributes.filter(x => x.name == 'Color');
    const Color = this.state.attributes.filter(x => x.attribute_name == 'Color');

    const colorAttribute = Color.map(x => (
      <label className="container" key={x.attribute_value_id}>
        {/* <input type="radio" name="color" onClick={this.props.selectedColor.bind(this, x)} />{x.value} */}
        <input type="radio" name="color" onClick={this.props.selectedColor.bind(this, x)} />{x.attribute_value}
        <span class="checkmark" style={{ background: `${x.attribute_value}` }}></span>
      </label>
    ));

    // const Size = this.state.attributes.filter(x => x.name == 'Size');
    const Size = this.state.attributes.filter(x => x.attribute_name == 'Size');

    const sizeAttribute = Size.map(x => (
      <label className="size" key={x.attribute_value_id}>
        {/* <input type="radio" name="size" onClick={this.props.selectedSize.bind(this, x)} />{x.value} */}
        <input type="radio" name="size" onClick={this.props.selectedColor.bind(this, x)} />
        <span>{x.attribute_value}</span>
      </label>
    ))


    return (
      <div>
        <p>Color</p>
        <div className="d-flex flex-wrap align-items-center color-cont">
          {colorAttribute}
        </div>
        <br />
        <p>Size</p>
        <div className="d-flex flex-wrap align-items-center color-cont">
          {sizeAttribute}
        </div>
      </div>
    )
  }
}


export default Attributes;
