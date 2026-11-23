import Hero from '../../components/Hero/Hero'
import DeviceSection from '../../components/DeviceSection/DeviceSection'
import Faq from '../../components/Faq/Faq'
import CallToAction from '../../components/CallToAction/CallToAction'
import PhotoCircles from '../../components/PhotoCircles/PhotoCircles'
import { usePageTitle } from '../../hooks/usePageTitle'

export default function Home() {
    // Título da aba do navegador: "Início | LiBraille"
    usePageTitle('Início')

    return (
        <>
            <Hero />
            <DeviceSection />
            <Faq />
            <CallToAction />
            <PhotoCircles />
        </>
    )
}