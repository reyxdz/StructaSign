import Form from '../models/Form.js';
import FormResponse from '../models/FormResponse.js';

export const getAllForms = async (req, res, next) => {
  try {
    const forms = await Form.find({ owner: req.user.id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      forms,
    });
  } catch (error) {
    next(error);
  }
};

export const getFormById = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    // Check ownership or shared access
    if (form.owner.toString() !== req.user.id && !form.sharedWith.find((s) => s.userId.toString() === req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({
      success: true,
      form,
    });
  } catch (error) {
    next(error);
  }
};

export const createForm = async (req, res, next) => {
  try {
    const { title, description, fields, template, settings } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Form title is required' });
    }

    const form = await Form.create({
      title,
      description,
      owner: req.user.id,
      fields: fields || [],
      template,
      settings: settings || {},
    });

    res.status(201).json({
      success: true,
      message: 'Form created successfully',
      form,
    });
  } catch (error) {
    next(error);
  }
};

export const updateForm = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    if (form.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      message: 'Form updated successfully',
      form: updatedForm,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteForm = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    if (form.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Form.deleteOne({ _id: req.params.id });

    res.json({
      success: true,
      message: 'Form deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const publishForm = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    if (form.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    form.status = 'published';
    await form.save();

    res.json({
      success: true,
      message: 'Form published successfully',
      form,
    });
  } catch (error) {
    next(error);
  }
};

export const getFormResponses = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.formId);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    if (form.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const responses = await FormResponse.find({ form: req.params.formId });

    res.json({
      success: true,
      responses,
      count: responses.length,
    });
  } catch (error) {
    next(error);
  }
};

export const submitFormResponse = async (req, res, next) => {
  try {
    const { responses, respondent } = req.body;

    const form = await Form.findById(req.params.formId);

    if (!form || form.status !== 'published') {
      return res.status(404).json({ message: 'Form not found or not published' });
    }

    const response = await FormResponse.create({
      form: req.params.formId,
      respondent: respondent || {},
      responses,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    form.responseCount = (form.responseCount || 0) + 1;
    await form.save();

    res.status(201).json({
      success: true,
      message: 'Response submitted successfully',
      response,
    });
  } catch (error) {
    next(error);
  }
};

export const getFormStats = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.formId);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    if (form.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const responses = await FormResponse.find({ form: req.params.formId });

    res.json({
      success: true,
      stats: {
        totalResponses: responses.length,
        submittedResponses: responses.filter((r) => r.status === 'submitted').length,
        draftResponses: responses.filter((r) => r.status === 'draft').length,
        responseRate: form.responseCount || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};
