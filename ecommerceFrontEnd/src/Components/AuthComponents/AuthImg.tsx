import homeImg from "../../assets/images/homeImg.png"

function AuthImg() {
    return (
        <div className="hidden md:block !w-[50%] !h-[100%]">
            <div className="flex justify-center items-center !h-[100vh]">
                <img src={homeImg} alt="home img" />
            </div>
        </div>
    )
}

export default AuthImg