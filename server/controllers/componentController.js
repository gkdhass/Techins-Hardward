import Component from '../models/Component.js';

// @desc    Get all components
// @route   GET /api/components
// @access  Public
export const getComponents = async (req, res, next) => {
  try {
    const { category, voltage, interface: iface, manufacturer, package: pkg, availability, search, page = 1, limit = 20 } = req.query;
    
    const query = {};
    
    if (category) query.category = category;
    if (voltage) query.voltage = voltage;
    if (iface) query.interface = iface;
    if (manufacturer) query.manufacturer = manufacturer;
    if (pkg) query.package = pkg;
    if (availability) query.availability = availability;
    if (search) {
      query.$text = { $search: search };
    }
    
    const components = await Component.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const count = await Component.countDocuments(query);
    
    res.status(200).json({
      success: true,
      message: 'Components retrieved successfully',
      data: {
        components,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        total: count
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single component
// @route   GET /api/components/:slug
// @access  Public
export const getComponent = async (req, res, next) => {
  try {
    const component = await Component.findOne({ slug: req.params.slug })
      .populate('relatedProjects', 'title slug thumbnail');
    
    if (!component) {
      return res.status(404).json({
        success: false,
        message: 'Component not found',
        error: 'Not found'
      });
    }
    
    // Increment views
    component.views += 1;
    await component.save();
    
    res.status(200).json({
      success: true,
      message: 'Component retrieved successfully',
      data: { component }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create component
// @route   POST /api/components
// @access  Private (Admin)
export const createComponent = async (req, res, next) => {
  try {
    // Cloudinary stores URL in req.file.path, fallback to local path
    if (req.file) {
      req.body.image = req.file.path || req.file.location || `/uploads/components/${req.file.filename}`;
    }
    
    const component = await Component.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Component created successfully',
      data: { component }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update component
// @route   PUT /api/components/:id
// @access  Private (Admin)
export const updateComponent = async (req, res, next) => {
  try {
    let component = await Component.findById(req.params.id);
    
    if (!component) {
      return res.status(404).json({
        success: false,
        message: 'Component not found',
        error: 'Not found'
      });
    }
    
    // Cloudinary stores URL in req.file.path, fallback to local path
    if (req.file) {
      req.body.image = req.file.path || req.file.location || `/uploads/components/${req.file.filename}`;
    }
    
    component = await Component.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      message: 'Component updated successfully',
      data: { component }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete component
// @route   DELETE /api/components/:id
// @access  Private (Admin)
export const deleteComponent = async (req, res, next) => {
  try {
    const component = await Component.findById(req.params.id);
    
    if (!component) {
      return res.status(404).json({
        success: false,
        message: 'Component not found',
        error: 'Not found'
      });
    }
    
    await component.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Component deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get component categories
// @route   GET /api/components/meta/categories
// @access  Public
export const getComponentCategories = async (req, res, next) => {
  try {
    const categories = await Component.distinct('category');
    
    res.status(200).json({
      success: true,
      message: 'Component categories retrieved',
      data: { categories }
    });
  } catch (error) {
    next(error);
  }
};
