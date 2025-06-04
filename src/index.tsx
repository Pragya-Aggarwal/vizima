import React from "react";
import { createRoot } from "react-dom/client";
import { Homepage } from "./screens/Homepage/Homepage";
import { NavigationMenuSection } from "./screens/Homepage/NavigationMenuSection/NavigationMenuSection";
import { BulkAccommodationSection } from "./screens/Homepage/BulkAccommodationSection/BulkAccommodationSection";
import { ChevronDownIcon } from "lucide-react";
import { ProductPage } from "./screens/Product/Productpage";
import App from "./Routes/Route";

createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>

    <App />

  </React.StrictMode>,
);
