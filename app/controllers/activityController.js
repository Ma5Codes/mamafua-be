import activities from '../models/activities.js';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

export const getAllActivities = async (req, res) => {
  const { role } = req.user || {};
  const { limit, page, sortBy, sortType, isExport, param } = req.query;

  try {
    if (role === 'user') {
      throw new ApiError(403, 'Anda tidak memiliki akses.');
    }
    const limitFilter = Number(limit ? limit : 10);
    const pageFilter = Number(page ? page : 1);
    const isExportFilter = Boolean(isExport);
    const paramFilter = param || '';

    const filter = {
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${paramFilter}%` } },
          { notaId: { [Op.like]: `%${paramFilter}%` } },
        ],
      },
      limit: limitFilter,
      offset: (pageFilter - 1) * limitFilter,
      order: [[sortBy || 'id', sortType || 'DESC']],
    };

    const data = await activities.findAll(isExportFilter ? {} : filter);

    const total = await activities.count(filter);

    res.status(200).json({
      message: 'Data berhasil didapatkan.',
      data: data,
      total,
      currentPages: pageFilter,
      limit: limitFilter,
      maxPages: Math.ceil(total / limitFilter),
      from: pageFilter ? (pageFilter - 1) * limitFilter + 1 : 1,
      to: pageFilter
        ? (pageFilter - 1) * limitFilter + data.length
        : data.length,
      sortBy: sortBy || 'id',
      sortType: sortType || 'desc',
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export const postActivity = async (req, res) => {
  const { name, action, notaId } = req;
  try {
    const data = await activities.create({
      name,
      action,
      notaId,
      time: Sequelize.fn('NOW'),
    });
  } catch (error) {
    console.log(error);
  }
};