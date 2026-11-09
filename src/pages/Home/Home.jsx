import Hero from '../../components/Hero/Hero'
import './home.css'
import DeviceSection from '../../components/DeviceSection/DeviceSection'
import Faq from '../../components/Faq/Faq'
import CallToAction from '../../components/CallToAction/CallToAction'
import PhotoCircles from '../../components/PhotoCircles/PhotoCircles'
import Footer from '../../components/footer/Footer'


export default function Home() {
    return (
        <>
            <Hero />
            
            <DeviceSection />
            <Faq />
            <CallToAction />
            <PhotoCircles />
            <Footer />
        </>
    );
}