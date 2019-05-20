import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { timeFormat } from '../../utility';
import Ads from '../Ads/Ads';
import './ProductCards.css';

class ProductView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            filteredItems: [],
            loader: true,
            isScrollingLoader: false,
            nothingToShow: false,
        }
        this.scrollHandle = this.scrollHandle.bind(this);
        this.filterStart = 0;
        this.itemsPerFilter = 20;
        this.filterEnd = this.itemsPerFilter;
    }
    componentDidMount() {
        this.getProductItems(`${API_URL}/products`);
        window.addEventListener("scroll", this.scrollHandle);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollHandle);
    }
    getProductItems(url) {
        axios.get(url).then(response => {
            this.setState({
                loader: false,
                items: response.data
            })
            this.filterProductItems();
        })
    }
    sortingOutData(event) {
        this.setState({ loader: true, isScrollingLoader: false, nothingToShow: false })
        let { name, value } = event.target;
        axios.get(`${API_URL}/api/products?_sort=${value}`).then(response => {
            this.setState({
                loader: false,
                items: response.data
            })
            this.filterProductItems();
        })
    }
    filterProductItems() {
        if (this.state.items.length < this.filterEnd) {
            this.setState({
                nothingToShow: true
            })
        }
        this.setState({
            filteredItems: this.state.items.slice(0, this.filterEnd),
            filterStart: this.filterStart += this.itemsPerFilter,
            filterEnd: this.filterEnd += this.itemsPerFilter
        })
    }
    scrollHandle() {
        setTimeout(() => {
            this.setState({ isScrollingLoader: true, nothingToShow: false })
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300) && this.filterStart > 0) {
                this.filterProductItems();
                this.setState({ isScrollingLoader: false })
            }
        }, 0);
    }
    showAdvert() {
        return (
            <Ads />
        );
    }
    viewProductItems(product) {
        return (

            product.map((items, index) => {
                if (index !== 0 && (index % 19) === 0) {
                    return this.showAdvert()
                } else {
                    return <Col key={index} id={index} sm={3}>
                        <Card className="product__card__wrapper">
                            <div>
                                <span className="date1">{timeFormat(items.date)}</span>
                            </div>
                            <Card.Body className="coverProduct" style={{ textAlign: "center", fontSize: items.size }}>
                                <div className="ascii__face">{items.face}</div>
                            </Card.Body>
                            <div>
                                <div>
                                    <div className="product__item__sort">
                                        <div>
                                        <b>Size</b>: <span>{items.size}</span>
                                        </div>
                                        <br />
                                        <div>
                                        <b>Price</b>: <span>${items.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                }
            }
            )
        );
    }
    render() {
        let { isScrollingLoader, filteredItems, nothingToShow, loader} = this.state
        return (
            <Container>
                <section>
                    <Row>
                        <Col sm={12} ref="card">
                            <Card>
                                <Card.Header className="card__header">
                                    <div>
                                        <span>ASCII FACES</span>
                                    </div>
                                    <div>
                                        <select
                                            style={{
                                                width: 210,
                                                height: 35
                                            }}
                                            className="form-control"
                                            onChange={this.sortingOutData.bind(this)}
                                            name="sort"
                                        >
                                            <option>Filter Products</option>
                                            <option value="price">price</option>
                                            <option value="size">size</option>
                                            <option value="id">id</option>
                                        </select>
                                    </div>
                                </Card.Header>
                                <Row style={{ padding: 35, flex: 1, justifyContent: "center" }}>
                                    {
                                        loader ? <h3 style={{ textAlign: "center" }}><span>Fetching data...</span></h3> : this.viewProductItems(this.state.filteredItems)
                                    }
                                </Row>
                                {
                                    isScrollingLoader && filteredItems.length > 0 ? <p><h3 style={{ textAlign: "center" }}><span>Fetching data...</span></h3></p> : null
                                }
                                {
                                    nothingToShow && filteredItems.length > 0 ? <p><h3 style={{ textAlign: "center", color: "#B22222" }}>Nothing else to show</h3></p> : null
                                }
                            </Card>
                        </Col>
                    </Row>
                </section>
            </Container>
        );
    }
}

export default ProductView;