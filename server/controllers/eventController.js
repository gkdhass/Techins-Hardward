import Event from '../models/Event.js';

export const getEvents = async (req, res, next) => {
  try {
    const { type, featured, upcoming, page = 1, limit = 12 } = req.query;
    
    const query = { published: true };
    
    if (type) query.type = type;
    if (featured) query.featured = featured === 'true';
    if (upcoming) {
      query.date = { $gte: new Date() };
    }
    
    const events = await Event.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ date: 1 });
    
    const count = await Event.countDocuments(query);
    
    res.status(200).json({
      success: true,
      message: 'Events retrieved successfully',
      data: {
        events,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        total: count
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getEvent = async (req, res, next) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug })
      .populate('organizer', 'name avatar')
      .populate('participants', 'name avatar username');
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
        error: 'Not found'
      });
    }
    
    let isRegistered = false;
    if (req.user) {
      isRegistered = event.participants.some(p => p._id.toString() === req.user.id);
    }
    
    res.status(200).json({
      success: true,
      message: 'Event retrieved successfully',
      data: {
        event,
        isRegistered
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    req.body.organizer = req.user.id;
    
    // Cloudinary stores URL in req.file.path, fallback to local path
    if (req.file) {
      req.body.banner = req.file.path || req.file.location || `/uploads/events/${req.file.filename}`;
    }
    
    const event = await Event.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: { event }
    });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
        error: 'Not found'
      });
    }
    
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
        error: 'Forbidden'
      });
    }
    
    // Cloudinary stores URL in req.file.path, fallback to local path
    if (req.file) {
      req.body.banner = req.file.path || req.file.location || `/uploads/events/${req.file.filename}`;
    }
    
    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: { event }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
        error: 'Not found'
      });
    }
    
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
        error: 'Forbidden'
      });
    }
    
    await event.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

export const registerForEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
        error: 'Not found'
      });
    }
    
    if (event.registrationStatus !== 'Open') {
      return res.status(400).json({
        success: false,
        message: 'Registration is closed',
        error: 'Registration closed'
      });
    }
    
    if (event.participants.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Already registered',
        error: 'Duplicate registration'
      });
    }
    
    if (event.maxParticipants > 0 && event.participants.length >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Event is full',
        error: 'Max participants reached'
      });
    }
    
    event.participants.push(req.user.id);
    await event.save();
    
    res.status(200).json({
      success: true,
      message: 'Registered successfully',
      data: { event }
    });
  } catch (error) {
    next(error);
  }
};
