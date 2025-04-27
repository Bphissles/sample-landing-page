/**
 * Carousel Store
 * Manages carousel image data with caching
 */
import { fetchCarouselImages } from '@/services/carouselApi';
import { createApiStore } from './apiStore';

/**
 * Carousel store for managing carousel images
 */
export const useCarouselStore = createApiStore('carousel', fetchCarouselImages);
