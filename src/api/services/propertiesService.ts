import { apiService } from "../apiService";
import { ExtendedAccommodation } from "../../lib/types";

export interface PropertyTitle {
  id: string;
  title: string;
}

export interface PropertyTitlesResponse {
  data: PropertyTitle[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SimilarPropertiesResponse {
  data: ExtendedAccommodation[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const propertiesService = {
  getPropertyTitles: async (page: number = 1, limit: number = 10) => {
    const response = await apiService.get<PropertyTitlesResponse>('/properties/property-titles', {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  },

  getSimilarProperties: async (id: string, page: number = 1, limit: number = 4) => {
    const response = await apiService.get<SimilarPropertiesResponse>(`/properties/${id}/similar`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  },
};
