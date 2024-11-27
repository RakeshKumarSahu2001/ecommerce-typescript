
function HomeCarousel() {

    return (
        <div className="h-screen">
            <div className="flex flex-row sm-flex-col w-full">
                <div className="w-[50%] flex justify-center items-center">
                    <h1 className="text-5xl font-extrabold font-serif">Welcome to <br /><span className="text-blue-600">Shopnow</span></h1>
                </div>
                <div className="w-[50%] h-[100%]">
                    <img src="https://img.freepik.com/free-vector/snapshot-templates-wooden-background_52683-2318.jpg?t=st=1732370198~exp=1732373798~hmac=c830e4a4b9f456e359203bb2b715ccbc0492e28978c20de761b3868c3bbc9a03&w=740" alt="" />
                </div>
            </div>
        </div>
    );
}

export default HomeCarousel;
