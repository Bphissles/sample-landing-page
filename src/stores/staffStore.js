/**
 * Staff Store
 * Manages staff member data with caching
 */
import { fetchStaff } from '@/services/staffApi';
import { createApiStore } from './apiStore';

/**
 * Staff store for managing staff member data
 */
export const useStaffStore = createApiStore('staff', fetchStaff);
