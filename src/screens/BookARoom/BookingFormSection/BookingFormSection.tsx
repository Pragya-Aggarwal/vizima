import { ShieldIcon, XCircleIcon } from "lucide-react";

// Define the data for the policy items to enable mapping
const policyItems = [
    {
        title: "Cancellation Policy",
        icon: <XCircleIcon className="w-6 h-6 md:w-7 md:h-7 text-primary flex-shrink-0 mt-0.5" />,
        description: "Free Cancellation up to 24hrs before checkin",
    },
    {
        title: "Health & Safety",
        icon: <ShieldIcon className="w-6 h-6 md:w-7 md:h-7 text-primary flex-shrink-0 mt-0.5" />,
        description: "Cleaner in accordance with our COVID safe cleaning policy",
    },
];

export const BookingFormSection = (): JSX.Element => {
    return (
        <section className="w-full bg-gray-50 py-8 md:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {policyItems.map((item, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">
                                {item.title}
                            </h4>

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    {item.icon}
                                </div>
                                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
