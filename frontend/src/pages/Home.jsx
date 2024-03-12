import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import img4 from '../images/img4.jpg';
import img5 from '../images/img5.jpg';
import img6 from '../images/img6.jpg';
import '../design/HomePageStyle.css';

const Home = () => {
    return (<div>
            <Carousel>
                <Carousel.Item>
                    <img
                        style={{objectFit: 'cover', width: '100%', maxHeight: '100vh'}}
                        className="d-block w-100"
                        src={img4}
                        alt="First slide"
                    />
                    <Carousel.Caption style={{color: 'black', textShadow: '1px 1px 2px white'}}>
                        <h3>“People who love to eat are always the best people.”</h3>
                        <p>Julia Child</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{objectFit: 'cover', width: '100%', maxHeight: '100vh'}}
                        className="d-block w-100"
                        src={img5}
                        alt="Second slide"
                    />
                    <Carousel.Caption style={{color: 'black', textShadow: '1px 1px 2px white'}}>
                        <h3>“People who love to eat are always the best people.”</h3>
                        <p>Julia Child</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{objectFit: 'cover', width: '100%', maxHeight: '100vh'}}
                        className="d-block w-100"
                        src={img6}
                        alt="Third slide"
                    />
                    <Carousel.Caption style={{color: 'black', textShadow: '1px 1px 2px white'}}>
                        <h3>“People who love to eat are always the best people.”</h3>
                        <p>Julia Child</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>)
}

export default Home;
