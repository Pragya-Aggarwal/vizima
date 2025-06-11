import { Card, CardContent } from "../../../components/ui/card";

// Define the trust booster data for mapping
const trustBoosters = [
    {
        icon: "https://c.animaapp.com/mbi5x2be8VZzX7/img/eva-award-fill.svg",
        alt: "Eva award fill",
        text: "100% Verified Properties",
    },
    {
        icon: "https://c.animaapp.com/mbi5x2be8VZzX7/img/material-symbols-bed.svg",
        alt: "Material symbols bed",
        text: "Secure Online Payments",
    },
    {
        icon: "https://c.animaapp.com/mbi5x2be8VZzX7/img/bi-buildings-fill.svg",
        alt: "Bi buildings fill",
        text: "24x7 Support",
    },
    {
        id: 4,
        customIcon: true,
        iconSrc: "https://c.animaapp.com/mbi5x2be8VZzX7/img/group-1.png",
        alt: "Group",
        text: "Hassle-free Move-in Guarantee",
    },
];

export const HeaderSection = (): JSX.Element => {
    return (
        <section className="w-full py-12 md:py-20 bg-cover bg-center relative" 
            style={{
                backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%), url(https://c.animaapp.com/mbi5x2be8VZzX7/img/adkoghe.png)'
            }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-black drop-shadow-md">
                    Trust Boosters
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-4 sm:px-0">
                    {trustBoosters.map((booster, index) => (
                        <Card
                            key={index}
                            className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white/90 hover:bg-white transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl border-none"
                        >
                            <CardContent className="flex flex-col items-center p-0 w-full">
                                <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center mb-3 md:mb-4">
                                    {booster.customIcon ? (
                                        <img
                                            className="w-10 h-10 md:w-12 md:h-12"
                                            alt={booster.alt}
                                            src={booster.iconSrc}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <img
                                            className="w-10 h-10 md:w-12 md:h-12"
                                            alt={booster.alt}
                                            src={booster.icon}
                                            loading="lazy"
                                        />
                                    )}
                                </div>

                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-center text-gray-800 leading-tight px-2">
                                    {booster.text}
                                </h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
