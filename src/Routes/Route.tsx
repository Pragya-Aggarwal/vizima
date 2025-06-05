import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage } from '../screens/Homepage/Homepage';
import { ProductPage } from '../screens/Product/Productpage';
import { NavigationMenuSection } from '../screens/Homepage/NavigationMenuSection/NavigationMenuSection';
import { BulkAccommodationSection } from '../screens/Homepage/BulkAccommodationSection/BulkAccommodationSection';
import { ChevronDownIcon } from 'lucide-react';
import { BookARoom } from '../screens/BookARoom/BookARoom';
import { Blog } from '../screens/Blog/Blog';
import PropertyDetails from '../screens/PropertyDetails/PropertyDetails';


const App = () => {
    return (

        <Router>
            <div className="min-h-screen flex flex-col">
                <NavigationMenuSection />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/product" element={<ProductPage />} />
                        <Route path="/book" element={<BookARoom />} />
                        <Route path="/aboutUs" element={<Blog />} />
                        <Route path="/property-details" element={<PropertyDetails />} />
                        {/* <Route path="/contact" element={<Contact />} /> */}
                        <Route path="*" element={<Homepage />} />
                    </Routes>
                </main>
                <BulkAccommodationSection />

                {/* Dropdown Icon - Using Lucide Icon instead of image */}
                <div className="fixed top-[30px] left-[834px]">
                    <ChevronDownIcon className="w-6 h-6" />
                </div>
            </div>
        </Router>
    );
};

export default App;