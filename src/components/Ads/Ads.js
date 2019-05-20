import React from 'react';
import { Card, Image, Row, Col} from 'react-bootstrap';
import AdsBanner from '../../images/advertise_banner.png';
import './Ads.css'


export default function () {
    return (
        <Row className="col-md-12" style={{clear : "both"}}>
            <Col md={8}>
                <img src={AdsBanner} alt="image" className="advert__img"/>
            </Col>
            <Col md={4}>
                <img class="img-responsive" src={`/ads/?r=${Math.floor(Math.random() * 1000)}`} />
            </Col>
        </Row>
    );
}