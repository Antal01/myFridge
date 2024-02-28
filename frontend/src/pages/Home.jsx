import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';
import '../design/HomePageStyle.css';

const Home = () => {
    return (<div>
            <Carousel>
                <Carousel.Item>
                    <img
                        style={{objectFit: 'cover', width: '100%', maxHeight: '100vh'}}
                        className="d-block w-100"
                        src={img1}
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
                        src={img2}
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
                        src={img3}
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
