import Hero from '../../components/Hero/Hero'
import './home.css'
import DeviceSection from '../../components/DeviceSection/DeviceSection'
import Faq from '../../components/Faq/Faq'
import CallToAction from '../../components/CallToAction/CallToAction'
import PhotoCircles from '../../components/PhotoCircles/PhotoCircles'
import Footer from '../../components/Footer/Footer'
import BrailleCell from '../../components/BrailleCell/BrailleCell'


export default function Home() {
    return (
        <>
            <Hero />
            <DeviceSection />
            <BrailleCell className="device__reveal" />
            <Faq />
            <CallToAction />
            <PhotoCircles />
            <Footer />
        </>
    );
}