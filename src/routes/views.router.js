import { Router } from 'express';
import { servicesService } from '../services/services.service.js';
import { bookingsService } from '../services/bookings.service.js';
const serviceService = servicesService;
const bookingService = bookingsService;


const router = Router();
router.get('/services', async (req, res) => {
  try {
    const services = await serviceService.getAll();
    res.render('services', { services });
  } catch (error) {
    res.status(500).render('error', { message: error.message });
  }
});

router.get('/bookings', async (req, res) => {
  try {
    const bookings = await bookingService.getAll();
    res.render('bookings', { bookings });
  } catch (error) {
    res.status(500).render('error', { message: error.message });
  }
});



// router.get('/messages', async (req, res) => {
//   res.render('socket');
// });

export default router;
