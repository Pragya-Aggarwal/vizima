import React from "react";
import { Utensils, Leaf, Droplets, ShieldCheck } from "lucide-react";

export const MealPlanSection = (): JSX.Element => {
    const features = [
        {
            icon: <Leaf className="w-8 h-8 text-green-600" />,
            title: "100% Pure Vegetarian",
            description: "Wholesome, plant-based meals prepared with fresh ingredients"
        },
        {
            icon: <Droplets className="w-8 h-8 text-blue-500" />,
            title: "RO Filtered Water",
            description: "Clean, purified drinking water available 24/7"
        },
        {
            icon: <Utensils className="w-8 h-8 text-amber-600" />,
            title: "Fresh & Hot Meals",
            description: "Delicious, home-style food served fresh daily"
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
            title: "Hygienic Kitchen",
            description: "Strict hygiene standards and clean cooking practices"
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                        <Utensils className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        🥗 Pure Veg Meal Plan at Vizima Hostels
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Nutritious. Hygienic. Homely.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                        >
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-opacity-10 mb-4"
                                style={{
                                    backgroundColor: index === 0 ? '#16a34a1a' : 
                                                  index === 1 ? '#3b82f61a' :
                                                  index === 2 ? '#d977061a' : '#0596691a'
                                }}
                            >
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
                        Enjoy healthy, home-style food every day—because good living starts with good eating.
                    </p>
                    
                </div>
            </div>
        </section>
    );
};

export default MealPlanSection;
