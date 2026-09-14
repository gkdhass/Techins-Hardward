import Article from '../models/Article.js';

export const getArticles = async (req, res, next) => {
  try {
    const { category, tags, search, featured, page = 1, limit = 12 } = req.query;
    
    const query = { published: true };
    
    if (category) query.category = category;
    if (tags) {
      const tagArray = tags.split(',');
      query.tags = { $in: tagArray };
    }
    if (featured) query.featured = featured === 'true';
    if (search) {
      query.$text = { $search: search };
    }
    
    const articles = await Article.find(query)
      .populate('author', 'name avatar username')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const count = await Article.countDocuments(query);
    
    res.status(200).json({
      success: true,
      message: 'Articles retrieved successfully',
      data: {
        articles,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        total: count
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getArticle = async (req, res, next) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug })
      .populate('author', 'name avatar username bio');
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found',
        error: 'Not found'
      });
    }
    
    // Increment views
    article.views += 1;
    await article.save();
    
    // Get related articles
    const relatedArticles = await Article.find({
      _id: { $ne: article._id },
      category: article.category,
      published: true
    })
      .limit(3)
      .select('title slug thumbnail excerpt author category readingTime');
    
    res.status(200).json({
      success: true,
      message: 'Article retrieved successfully',
      data: {
        article,
        relatedArticles
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createArticle = async (req, res, next) => {
  try {
    req.body.author = req.user.id;
    
    // Cloudinary stores URL in req.file.path, fallback to local path
    if (req.file) {
      req.body.thumbnail = req.file.path || req.file.location || `/uploads/articles/${req.file.filename}`;
    }
    
    const article = await Article.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      data: { article }
    });
  } catch (error) {
    next(error);
  }
};

export const updateArticle = async (req, res, next) => {
  try {
    let article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found',
        error: 'Not found'
      });
    }
    
    if (article.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
        error: 'Forbidden'
      });
    }
    
    // Cloudinary stores URL in req.file.path, fallback to local path
    if (req.file) {
      req.body.thumbnail = req.file.path || req.file.location || `/uploads/articles/${req.file.filename}`;
    }
    
    article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      message: 'Article updated successfully',
      data: { article }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found',
        error: 'Not found'
      });
    }
    
    if (article.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
        error: 'Forbidden'
      });
    }
    
    await article.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Article deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
