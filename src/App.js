import React from 'react';
import Navbar from './components/header/Navbar';
import Body from './components/productCards/ProductCards';
import Router from './router';
// import Footer from './components/footer/Footer';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Router/>
                {/* <Navbar />
                <br />
                <Body /> */}
                {/* <Footer /> */}
            </div>
        );
    }
}