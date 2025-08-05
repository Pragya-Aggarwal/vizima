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
import { useSearchParams } from 'react-router-dom';
import { accommodationService } from '../../api/services/accommodationService';
import { home } from "../../assets";
import { ExtendedAccommodation, transformToExtended } from "../../lib/types";

export const BookARoom = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const defaultTab = searchParams.get('tab') || 'book';
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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green"></div>
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
    const serviceFee = 0;
    const totalPrice = Number(propertyPrice) + serviceFee;


    return (
        <div className="min-h-screen bg-white">
            {/* <div className="bg-gradient-to-b from-white to-gray-50 mt-12">
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
                                        {property.title}
                                    </h1>
                                    <div className="flex items-center text-gray-600 mt-2">
                                        <MapPin className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                                        <span>{
                                            typeof property.location === 'string' 
                                                ? property.location 
                                                : property.location?.address || property.location?.city || 'Location not specified'
                                        }</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {property.amenities?.slice(0, 6).map((item, index) => (
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
                                    alt={property.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="container mx-auto px-3 mt-12 sm:px-4 py-8 sm:py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                        <div className="lg:col-span-8">
                            {/* <Card className="overflow-hidden "> */}
                                <div className="px-4 bg-gray-50 sm:px-6 py-3 sm:py-4">
                                    <p className="md:text-4xl sm:text-xl font-bold text-green">Schedule a Visit</p>
                                    <p className="text-[14px] sm:text-sm text-green mt-1">Book a time to visit our property</p>
                                </div>
                                {/* <Tabs defaultValue={defaultTab} className="w-full">
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
                                                <ScheduleAForm propertyId={id} propertyName={property.title} />
                                            </div>
                                        </TabsContent>
                                    </div>
                                </Tabs> */}
                                <div className="mt-6">
                                    <ScheduleAForm propertyId={id} propertyName={property.title} />
                                </div>
                            {/* </Card> */}
                        </div>
                        <div className="lg:col-span-4 space-y-4 sm:space-y-6 sticky top-6">
                            <Card className="border border-gray-200 shadow-sm overflow-hidden bg-green">
                                <div className="p-4 sm:p-6">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">Schedule a Visit</h3>
                                            <p className="text-sm text-white mt-1">Choose your preferred way to explore the property</p>
                                        </div>
                                        <div className="bg-teal-100 p-2 rounded-lg">
                                            <Calendar className="w-5 h-5 text-green" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Physical Visit Option */}
                                        <div className="p-4 border border-teal-100 rounded-lg hover:bg-white hover:border-teal-200 transition-colors cursor-pointer group">
                                            <div className="flex items-start gap-4">
                                                <div className="bg-teal-50 p-2.5 rounded-lg group-hover:bg-teal-100 transition-colors">
                                                    <MapPin className="w-5 h-5 text-teal-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-white group-hover:text-gray-900">In-Person Visit</h4>
                                                    <p className="text-sm text-white group-hover:text-gray-900 mt-1">
                                                        Visit the property in person and take a guided tour
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Virtual Tour Option */}
                                        <div className="p-4 border border-teal-100 rounded-lg hover:bg-white hover:border-teal-200 transition-colors cursor-pointer group">
                                            <div className="flex items-start gap-4">
                                                <div className="bg-teal-50 p-2.5 rounded-lg group-hover:bg-teal-100 transition-colors">
                                                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-white group-hover:text-gray-900">Virtual Tour</h4>
                                                    <p className="text-sm text-white group-hover:text-gray-900 mt-1">
                                                        Take a live virtual tour from the comfort of your home
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="bg-teal-50 p-1.5 rounded-full mt-0.5">
                                                <svg className="w-4 h-4 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Need to reschedule?</span> You can call to <a className="text-green hover:underline" href={`tel:${property?.phone}`}>{property?.phone}</a> on this no, and reschedule your appointment up to 2 hours before the scheduled time.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <div className="bg-gradient-to-br from-[#064749] to-[#0a6c6f] p-6 rounded-xl shadow-lg text-white overflow-hidden relative">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
                                
                                <div className="relative z-10">
                                    <h2 className="text-xl font-bold mb-2">Need help with your booking?</h2>
                                    <p className="text-white/80 text-sm mb-6">Our dedicated support team is available 24/7 to assist you with any questions or concerns</p>
                                    
                                    <div className="space-y-4">
                                        <a
                                            href={`tel:${property?.phone}`}
                                            className="flex items-center gap-4 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
                                        >
                                            <div className="bg-white/10 p-2.5 rounded-lg flex-shrink-0">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white/80">Call us</div>
                                                <div className="text-lg font-semibold">{property?.phone}</div>
                                            </div>
                                        </a>
                                        <a
                                            href="mailto:bookings@example.com"
                                            className="flex items-center gap-4 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
                                        >
                                            <div className="bg-white/10 p-2.5 rounded-lg flex-shrink-0">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white/80">Email us</div>
                                                <div className="text-lg font-semibold">bookings@example.com</div>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-white/10">
                                        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                                            <Shield className="w-5 h-5 text-white flex-shrink-0" />
                                            <p className="text-sm text-white/90">
                                                <span className="font-medium">Secure booking</span> with SSL encryption. Your information is safe with us.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
            {/* <div className="bg-gray-50">
                <div className="container mx-auto px-4">
                    <BookingFormSection />
                </div>
            </div> */}
        </div>
    );
};
