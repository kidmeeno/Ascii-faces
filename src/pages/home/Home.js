import React from 'react';
import './Home.css';
import {Container,Row,Col,Card} from 'react-bootstrap';
import ProductView from '../../components/productCards/ProductCards';
import Navbar from '../../components/header/Navbar';



class Home extends React.Component{

    render(){
        return(
            <div className="home__body">
                <Row>
                    <Container>
                        <Col md={8}>
                            <Navbar/>
                        </Col>
                        <Col md={12}>
                            <ProductView/>
                        </Col>
                    </Container>
                </Row>
            </div>
        )
    }
}

export default Home