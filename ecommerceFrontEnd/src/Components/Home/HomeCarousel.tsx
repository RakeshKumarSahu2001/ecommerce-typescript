import homeImg from "../../assets/images/homeImg.png"

function HomeCarousel() {

    return (
        <div className="h-screen">
            <div className="flex flex-col md:flex-row items-center sm-flex-col w-full pt-32 lg:py-10">
                <div className="w-[50%] flex justify-center items-center">
                    <h1 className="text-5xl font-extrabold font-serif">Welcome to <br /><span className="text-blue-600">Shopnow</span></h1>
                </div>
                <div className="w-[50%] h-[100%]">
                    <img src={homeImg} alt="home img" />
                </div>
            </div>
        </div>
    );
}

export default HomeCarousel;
