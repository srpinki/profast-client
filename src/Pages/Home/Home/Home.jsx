import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import ClientCarousel from '../../ClientCarousel/ClientCarousel ';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Services></Services>
           <ClientCarousel></ClientCarousel>
        </div>
    );
};

export default Home;