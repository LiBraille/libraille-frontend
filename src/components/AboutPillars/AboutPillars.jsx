import './AboutPillars.css'

function AboutPillars() {
    return (
        <section className="pillars-container">
            <div className="mvv-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36">
                    <path d="M0 0h36v36H0z" fill="none" />
                    <path fill="currentColor" d="M20.82 15.31L10.46 9c-.46-.26-1.11.37-.86.84l6.15 10.56l10.56 6.15a.66.66 0 0 0 .84-.86Zm-4 4l3-3l4.55 7.44Z" class="clr-i-outline clr-i-outline-path-1" />
                    <path fill="currentColor" d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2m1 29.95v-2.42h-2v2.42A14 14 0 0 1 4.05 19h2.42v-2H4.05A14 14 0 0 1 17 4.05v2.42h2V4.05A14 14 0 0 1 31.95 17h-2.42v2h2.42A14 14 0 0 1 19 31.95" class="clr-i-outline clr-i-outline-path-2" />
                    <path fill="none" d="M0 0h36v36H0z" />
                </svg>

                <h3>Missão</h3>
                <p>Possibilitar que pessoas com deficiência visual tenham maior acesso aos livros através da tecnologia.</p>
            </div>
            <div className="mvv-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="currentColor" d="M12 5c-7.63 0-9.93 6.62-9.95 6.68c-.07.21-.07.43 0 .63c.02.07 2.32 6.68 9.95 6.68s9.93-6.62 9.95-6.68c.07-.21.07-.43 0-.63C21.93 11.61 19.63 5 12 5m0 12c-5.35 0-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5s7.42 3.85 7.93 5c-.5 1.16-2.58 5-7.93 5" />
                    <path fill="currentColor" d="M13.5 12c-.83 0-1.5-.67-1.5-1.5c0-.6.36-1.12.87-1.35c-.28-.09-.56-.15-.87-.15c-1.64 0-3 1.36-3 3s1.36 3 3 3s3-1.36 3-3c0-.3-.06-.59-.15-.87c-.24.51-.75.87-1.35.87" />
                </svg>

                <h3>Visão</h3>
                <p>Democratizar o acesso ao conhecimento para pessoas com deficiência visual por meio de tecnologias inovadoras e acessíveis.</p>
            </div>
            <div className="mvv-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.13em" height="1em" viewBox="0 0 576 512">
                    <path d="M0 0h576v512H0z" fill="none" />
                    <path fill="currentColor" d="M275.3 250.5c7 7.4 18.4 7.4 25.5 0l108.9-114.2c31.6-33.2 29.8-88.2-5.6-118.8c-30.8-26.7-76.7-21.9-104.9 7.7L288 36.9l-11.1-11.6C248.7-4.4 202.8-9.2 172 17.5c-35.3 30.6-37.2 85.6-5.6 118.8zm290 77.6c-11.8-10.7-30.2-10-42.6 0L430.3 402c-11.3 9.1-25.4 14-40 14H272c-8.8 0-16-7.2-16-16s7.2-16 16-16h78.3c15.9 0 30.7-10.9 33.3-26.6c3.3-20-12.1-37.4-31.6-37.4H192c-27 0-53.1 9.3-74.1 26.3L71.4 384H16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h356.8c14.5 0 28.6-4.9 40-14L564 377c15.2-12.1 16.4-35.3 1.3-48.9" />
                </svg>

                <h3>Valores</h3>
                <ul>
                    <li>Democratização da informação</li>
                    <li>Empatia</li>
                    <li>Diversidade</li>
                    <li>Respeito</li>
                    <li>Inovação</li>
                </ul>
            </div>
        </section>
    )
}
export default AboutPillars