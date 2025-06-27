import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from '../components/ScrollToTop'; // Moved to components root
import { Homepage } from '../screens/Homepage/Homepage';
import { ProductPage } from '../screens/Product/Productpage';
import { NavigationMenuSection } from '../screens/Homepage/NavigationMenuSection/NavigationMenuSection';
import { BulkAccommodationSection } from '../screens/Homepage/BulkAccommodationSection/BulkAccommodationSection';
import { ChevronDownIcon } from 'lucide-react';
import { BookARoom } from '../screens/BookARoom/BookARoom';
import { Blog } from '../screens/Blog/Blog';
import PropertyDetails from '../screens/PropertyDetails/PropertyDetails';
import Contact from '../screens/Contact/Contact';
import { Login } from '../screens/Login/Login';
import { BookingsPage } from '../screens/UserProfile/BookingsPage';
import { DocumentsPage } from '../screens/UserProfile/DocumentPage';
import { ProfilePage } from '../screens/UserProfile/ProfilePage';
import WhatsAppButton from '../components/WhatsAppButton';

const App = () => {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <ScrollToTop />
                <NavigationMenuSection />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/product" element={<ProductPage />} />
                        <Route path="/book/:id" element={<BookARoom />} />
                        <Route path="/aboutUs" element={<Blog />} />
                        <Route path="/property-details/:id" element={<PropertyDetails />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/booking" element={<BookingsPage />} />
                        <Route path="/documents" element={<DocumentsPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="*" element={<Homepage />} />
                    </Routes>
                </main>
                <BulkAccommodationSection />

                {/* WhatsApp Floating Button */}
                <WhatsAppButton />

                {/* Dropdown Icon - Using Lucide Icon instead of image */}
                <div className="fixed top-[30px] left-[834px]">
                    <ChevronDownIcon className="w-6 h-6" />
                </div>
            </div>
        </Router>
    );
};

export default App;