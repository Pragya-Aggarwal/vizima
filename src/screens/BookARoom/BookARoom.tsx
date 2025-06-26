import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { BookAForm } from "./BookForm/BookAForm";
import { ScheduleAForm } from "./ScheduleAForm/ScheduleAForm";
import { HeaderSection } from "./HeaderSection/HeaderSection";
import { TrustBoostersSection } from "./TrustBoostersSection/TrustBoostersSection";
import { BookingFormSection } from "./BookingFormSection/BookingFormSection";
import { Home, Calendar, MapPin, Phone, Mail, Star, Shield, Check, Zap, Wifi } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { accommodationService } from '../../api/services/accommodationService';
import { home } from "../../assets";
import { ExtendedAccommodation, transformToExtended } from "../../lib/types";

export const BookARoom = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<ExtendedAccommodation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperty = async () => {
            if (!id) {
                setError("No property ID provided");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await accommodationService.getAccommodations();
                const foundProperty = data.find(p => p.id === id);

                if (!foundProperty) {
                    throw new Error("Property not found");
                }

                setProperty(transformToExtended(foundProperty));
                setError(null);
            } catch (err) {
                console.error('Error fetching property details:', err);
                setError('Failed to load property details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500">
                {error}
            </div>
        );
    }

    if (!property) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Property not found.
            </div>
        );
    }

    const ratingAverage = typeof property.rating === 'object' ? property.rating.average : property.rating;
    const reviewCount = typeof property.rating === 'object' ? property.rating.count : property.reviews;

    const propertyPrice = property.price || property.rent || 0;
    const serviceFee = 1500;
    const totalPrice = Number(propertyPrice) + serviceFee;


    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gradient-to-b from-white to-gray-50 mt-12">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-2/3 space-y-6">
                                <div>
                                    <Badge className="bg-green text-green hover:bg-green mb-3">
                                        <Star className="w-3.5 h-3.5 mr-1.5 fill-yellow-400 text-yellow-400" />
                                        Top Rated Property • {ratingAverage?.toFixed(1) || 'N/A'} ({reviewCount || 0} reviews)
                                    </Badge>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                        {property.name}
                                    </h1>
                                    <div className="flex items-center text-gray-600 mt-2">
                                        <MapPin className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                                        <span>{property.location}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {property.amenities?.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2 text-gray-700">
                                            <div className="text-green">
                                                <item.icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                    <h3 className="font-medium text-blue-800 mb-2">Why book with us?</h3>
                                    <ul className="space-y-1.5 text-sm text-blue-700">
                                        <li className="flex items-start gap-2">
                                            <Check className="w-4 h-4 mt-0.5 text-green flex-shrink-0" />
                                            <span>Free cancellation until 48 hours before check-in</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="w-4 h-4 mt-0.5 text-green flex-shrink-0" />
                                            <span>No booking fees or hidden charges</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="w-4 h-4 mt-0.5 text-green flex-shrink-0" />
                                            <span>Best price guaranteed or we'll match it</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="md:w-1/3 bg-gray-100 rounded-xl overflow-hidden h-64 md:h-auto">
                                <img
                                    src={(property.images && property.images[0]) || property.image || home}
                                    alt={property.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                        <div className="lg:col-span-8">
                            <Card className="overflow-hidden border border-gray-200 shadow-sm">
                                <div className="bg-gray-50 border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Complete Your Booking</h2>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Secure your stay in just a few steps</p>
                                </div>
                                <Tabs defaultValue="book" className="w-full">
                                    <TabsList className="w-full h-14 sm:h-16 bg-white border-b rounded-none flex">
                                        <TabsTrigger
                                            value="book"
                                            className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-green data-[state=active]:bg-transparent data-[state=active]:text-green data-[state=active]:font-semibold data-[state=active]:shadow-none text-sm sm:text-base font-medium text-gray-600 hover:text-gray-900 transition-colors px-2 sm:px-4"
                                        >
                                            Book a Room
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="schedule"
                                            className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-green data-[state=active]:bg-transparent data-[state=active]:text-green data-[state=active]:font-semibold data-[state=active]:shadow-none text-sm sm:text-base font-medium text-gray-600 hover:text-gray-900 transition-colors px-2 sm:px-4"
                                        >
                                            Schedule Visit
                                        </TabsTrigger>
                                    </TabsList>

                                    <div className="p-4 sm:p-6 md:p-8">
                                        <TabsContent value="book" className="mt-0">
                                            <div className="space-y-1 mb-6 sm:mb-8">
                                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                                                    Booking Details
                                                </h2>
                                                <p className="text-xs sm:text-sm text-gray-500">
                                                    Fill in your details to secure your booking
                                                </p>
                                            </div>
                                            <div className="-mx-2 sm:mx-0">
                                                <BookAForm propertyId={id} />
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="schedule" className="mt-0">
                                            <div className="space-y-1 mb-6 sm:mb-8">
                                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                                                    Schedule a Visit
                                                </h2>
                                                <p className="text-xs sm:text-sm text-gray-500">
                                                    Book a time to visit our property
                                                </p>
                                            </div>
                                            <div className="-mx-2 sm:mx-0">
                                                <ScheduleAForm propertyId={id} />
                                            </div>
                                        </TabsContent>
                                    </div>
                                </Tabs>
                            </Card>
                        </div>
                        <div className="lg:col-span-4 space-y-4 sm:space-y-6 sticky top-6">
                            <Card className="border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-4 sm:p-6">
                                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                                        <div>
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Your Stay</h3>
                                            <p className="text-xs sm:text-sm text-gray-500 mt-1">Review your booking details</p>
                                        </div>
                                        <div className="bg-green p-1.5 sm:p-2 rounded-lg">
                                            <Home className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                        </div>
                                    </div>

                                    <div className="space-y-5">
                                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                                <Home className="w-5 h-5 text-green" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">{property.name}</h4>
                                                <p className="text-sm text-gray-500 mt-0.5">1 Bed, 1 Bath, 32 sq.m</p>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    <span className="inline-flex items-center gap-1.5 bg-green text-white text-xs px-2.5 py-1 rounded-full">
                                                        <Check className="w-3 h-3" />
                                                        Free WiFi
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full">
                                                        <Check className="w-3 h-3" />
                                                        AC
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <div className="bg-white p-2 rounded-lg shadow-sm">
                                                    <Calendar className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">Stay Duration</h4>
                                                    <p className="text-sm text-gray-500">1 Month • Jul 1 - Jul 31, 2025</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                                <span className="text-sm font-medium text-gray-700">Monthly Rate</span>
                                                <span className="text-base font-semibold text-gray-900">₹{propertyPrice}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">Service Fee</span>
                                                <span className="text-sm text-gray-700">₹{serviceFee}</span>
                                            </div>
                                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                                <span className="text-base font-semibold text-gray-900">Total</span>
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-gray-900">₹{totalPrice}</div>
                                                    <div className="text-xs text-gray-500">Including all taxes</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                                            <div className="bg-amber-100 p-1.5 rounded-full">
                                                <Zap className="w-4 h-4 text-amber-600" />
                                            </div>
                                            <p className="text-sm text-amber-700">
                                                <span className="font-medium">Only 2 rooms left</span> at this price
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <Card className="border border-gray-200 shadow-sm">
                                <div className="p-6">
                                    <div className="flex items-start gap-3 mb-5">
                                        <div className="bg-blue-50 p-2 rounded-lg">
                                            <Phone className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Need help with your booking?</h3>
                                            <p className="text-sm text-gray-500 mt-1">Our team is available 24/7 to assist you</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <a
                                            href="tel:+919876543210"
                                            className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                                        >
                                            <div className="bg-white p-2 rounded-lg shadow-sm group-hover:shadow transition-shadow">
                                                <Phone className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">Call us</div>
                                                <div className="text-sm text-blue-600">+91 98765 43210</div>
                                            </div>
                                        </a>
                                        <a
                                            href="mailto:bookings@example.com"
                                            className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                                        >
                                            <div className="bg-white p-2 rounded-lg shadow-sm group-hover:shadow transition-shadow">
                                                <Mail className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">Email us</div>
                                                <div className="text-sm text-blue-600">bookings@example.com</div>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                            <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Secure booking</span> with SSL encryption. Your information is safe with us.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white pt-16 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <HeaderSection />
                </div>
            </div>
            <div className="bg-white pt-16">
                <div className="container mx-auto px-4">
                    <TrustBoostersSection />
                </div>
            </div>
            <div className="bg-gray-50">
                <div className="container mx-auto px-4">
                    <BookingFormSection />
                </div>
            </div>
        </div>
    );
};
