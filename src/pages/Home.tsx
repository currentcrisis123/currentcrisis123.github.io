import home from '../assets/logo_light.svg'

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-dark-default pt-36 pb-10 w-full">
            <div className='flex flex-row space-x-2'>
                <img src={home} className='size-20 md:size-48'/>
                <div className='flex flex-col font-mohave font-bold text-4xl md:text-8xl text-white'>
                    <h1>CURRENT</h1>
                    <h1>CRISIS</h1>
                </div>
            </div>
            {/* <iframe frameborder="0" src="https://itch.io/embed-upload/13943843?color=18181B" allowfullscreen="" className="w-full h-screen">
                <a href="https://currentcrisis.itch.io/current-crisis">Play Current Crisis on itch.io</a>
            </iframe> */}
            <div className="hidden md:flex w-full overflow-hidden py-20 px-4">
                <iframe
                    title="Unity WebGL"
                    src={`${import.meta.env.BASE_URL}unity/index.html`}
                    width="100%"
                    height="100%"
                    allowFullScreen
                    className="w-full h-screen"
                />
            </div>

            <div className='py-20 w-full flex justify-center px-4'>
            <iframe src="https://itch.io/embed/3311499?border_width=0&amp;bg_color=18181B&amp;fg_color=969bb6&amp;link_color=FFBE64&amp;border_color=464649" width="550" height="165">
                <a href="https://currentcrisis.itch.io/current-crisis">Current Crisis by Current Crisis</a>
            </iframe>
            </div>
        </div>
    );
}

export default Home;
