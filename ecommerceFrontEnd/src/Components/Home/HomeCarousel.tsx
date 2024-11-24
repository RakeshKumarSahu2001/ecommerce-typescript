import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function HomeCarousel() {
    const slides = [
        "https://img.freepik.com/free-vector/snapshot-templates-wooden-background_52683-2318.jpg?t=st=1732370198~exp=1732373798~hmac=c830e4a4b9f456e359203bb2b715ccbc0492e28978c20de761b3868c3bbc9a03&w=740",
        "https://img.freepik.com/free-vector/border-design-with-butterflies-leaf_1308-3862.jpg?t=st=1732370240~exp=1732373840~hmac=69eeb294c9501ecaf6a780cbb58c868372e1a536ac24d5c4e822b26a42b52f2e&w=740",
        "https://img.freepik.com/free-vector/flat-summer-holiday-postcard-template_23-2148185514.jpg?t=st=1732370269~exp=1732373869~hmac=ac6b6414a78d3b0b7ea4f6a15392d1113fa0f3f3b55292f7951523c80bbc90e3&w=740",
    ];

    const [visibleSlide, setVisibleSlide] = useState(0);

    const prev = () => {
        setVisibleSlide((prv) => (prv === 0 ? slides.length - 1 : prv - 1));
    };

    const next = () => {
        setVisibleSlide((prv) => (prv === slides.length - 1 ? 0 : prv + 1));
    };

    return (
        <div className="max-w-lg mx-auto">
            <div className="relative overflow-hidden w-full h-60">
                <div
                    className="flex transition-transform ease-out duration-500"
                    style={{ transform: `translateX(-${visibleSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <img
                            key={index}
                            src={slide}
                            alt={`Slide ${index}`}
                            className="w-full h-full object-cover"
                        />
                    ))}
                </div>

                <div className="absolute inset-0 flex items-center justify-between px-4">
                    <button
                        onClick={prev}
                        className="bg-gray-800 text-white p-2 rounded-full"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={next}
                        className="bg-gray-800 text-white p-2 rounded-full"
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HomeCarousel;
