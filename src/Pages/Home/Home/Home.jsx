import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import ClientCarousel from '../../ClientCarousel/ClientCarousel ';
import FeatureHighlights from '../../FeatureHighlights/FeatureHighlights';
import BeMarchant from '../../BeMarchant/BeMarchant';
import Reviews from '../../Reviews/Reviews';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Services></Services>
           <ClientCarousel></ClientCarousel>
           <FeatureHighlights></FeatureHighlights>
           <BeMarchant></BeMarchant>
           <Reviews></Reviews>
        </div>
    );
};

export default Home;