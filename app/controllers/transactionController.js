import Sequelize from 'sequelize';
import { transactions, accounts } from '../models/index.js';
import { postActivity } from './activityController.js';
import ApiError from '../../utils/ApiError.js';

const Op = Sequelize.Op;

export const getAllTransactions = async (req, res) => {
  const { role } = req.user || {};
  const { limit, page, sortBy, sortType, param, status } = req.query;

  try {
    if (role === 1) {
      throw new ApiError(403, 'You do not have access.');
    }
    const limitFilter = Number(limit ? limit : 10);
    const pageFilter = Number(page ? page : 1);
    const paramFilter = param || '';
    const statusFilter = status || '';
    const filter = {
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${paramFilter}%` } },
          { notaId: { [Op.like]: `%${paramFilter}%` } },
        ],
      },
      include: [],
      limit: limitFilter,
      offset: (pageFilter - 1) * limitFilter,
      order: [[sortBy || 'dateIn', sortType || 'DESC']],
    };

    if (statusFilter && statusFilter !== '') {
      filter.where.status = statusFilter;
    }

    const data = await transactions.findAll(filter);

    const total = await transactions.count(filter);

    res.status(200).json({
      message: 'Data retrieved successfully.',
      data: data,
      total,
      currentPages: pageFilter,
      limit: limitFilter,
      maxPages: Math.ceil(total / limitFilter),
      from: pageFilter ? (pageFilter - 1) * limitFilter + 1 : 1,
      to: pageFilter
        ? (pageFilter - 1) * limitFilter + data.length
        : data.length,
      sortBy: sortBy || 'dateIn',
      sortType: sortType || 'desc',
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const StatusPembayaran = Object.freeze({
  LUNAS: 'lunas',
  BELUM_BAYAR: 'belum-bayar',
  BAYAR_SEBAGIAN: 'bayar-sebagian',
});

export const addTransaction = async (req, res) => {
  const { role } = req.user || {};
  const {
    name,
    noTelp,
    notaId,
    address,
    dateIn,
    dateDone,
    weight,
    service,
    status,
    price,
    amountPayment,
    datePayment,
    perprice,
    cashier,
    notes = '',
  } = req.body;
  console.log(req.user);
  if (req.user == null) {
    return res.status(500).json({
      message: 'You do not have access',
    });
  }
  try {
    const data = await transactions
      .create({
        transactionId: 'N' + Date.now(),
        notaId: notaId,
        weight: weight,
        service: service,
        price: price,
        perprice: perprice,
        name: name,
        noTelp: noTelp,
        address: address,
        createdBy: req.user.name,
        fkAuthor: req.user.id,
        dateIn: dateIn,
        dateOut: null,
        dateDone: dateDone,
        amountPayment: amountPayment,
        datePayment:
          status == StatusPembayaran.BELUM_BAYAR || status == null
            ? null
            : datePayment,
        status: status,
        notes: notes,
        cashier: cashier,
        deletedAt: null,
      })
      .then(async (res) => {
        try {
          await postActivity({
            name: cashier,
            action: 'add-transaction',
            notaId: notaId,
          });
        } catch (e) {
          console.log(e);
        }
      });
    res.status(200).json({
      message: 'Data added successfully.',
      data,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export const takeTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await transactions.findOne({ where: { id } });
    await transactions.update(
      {
        dateOut: Sequelize.fn('NOW'),
        status: StatusPembayaran.LUNAS,
        amountPayment: updated.price,
      },
      { where: { id } }
    );
    updated.then(
      async (res) =>
        await postActivity({
          name: res.name,
          action: 'take-out-transaction',
          notaId: res.notaId,
        })
    );
    res.status(200).json({
      message: 'Successfully taken out',
      data: updated,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export const payTransactionById = async (req, res) => {
  const { id } = req.params;
  const { cashier } = req.body;
  try {
    await transactions.update(
      { datePayment: Sequelize.fn('NOW'), status: StatusPembayaran.LUNAS },
      { where: { id } }
    );
    const updated = await transactions.findOne({ where: { id } }).then(
      async (res) =>
        await postActivity({
          name: cashier,
          action: 'pay-transaction',
          notaId: res.notaId,
        })
    );
    res.status(200).json({
      message: 'Successfully updated payment data',
      data: updated,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export const editTransactionById = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    noTelp,
    address,
    notes,
    weight,
    service,
    price,
    perprice,
    amountPayment,
    status,
    cashier,
    notaId,
    dateIn,
    dateDone,
    datePayment,
    dateOut,
  } = req.body;
  try {
    await transactions.update(
      {
        name: name,
        noTelp: noTelp,
        address: address,
        notes: notes,
        weight: weight,
        service: service,
        price: price,
        amountPayment: amountPayment,
        perprice: perprice,
        status: status,
        cashier: cashier,
        notaId: notaId,
        dateIn: dateIn,
        dateOut: dateOut,
        dateDone: dateDone,
        datePayment: datePayment,
      },
      { where: { id } }
    );
    const updated = await transactions.findOne({ where: { id } }).then(
      async (res) =>
        await postActivity({
          name: cashier,
          action: 'edit-transaction',
          notaId: res.notaId,
        })
    );
    res.status(200).json({
      message: 'Successfully updated transaction data',
      data: updated,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export const getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await transactions.findOne({
      where: { id },
    });
    res.status(200).json({
      message: 'Data retrieved successfully.',
      data,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export const deleteTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await transactions.findOne({ where: { id } });
    await transactions.destroy({ where: { id } }).then(
      async (res) =>
        await postActivity({
          name: deleted.cashier,
          action: 'delete-transaction',
          notaId: deleted.notaId,
        })
    );
    res.status(200).json({
      message: 'Successfully deleted transaction',
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export const getNotaByTransactionId = async (req, res) => {
  const { id } = req.params;
  const transactionId = id;
  try {
    const data = await transactions.findOne({
      where: { transactionId },
    });
    res.status(200).json({
      message: 'Data retrieved successfully.',
      data,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export const getLatestNota = async (req, res) => {
  console.log('loading');
  try {
    const data = await transactions.findOne({
      order: [['id', 'DESC']],
    });
    res.status(200).json({
      message: 'Data retrieved successfully.',
      data,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export const getInfoToday = async (req, res) => {
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const TODAY_START = new Date(todayStart).toISOString();
  const NOW = new Date().toISOString();
  console.log(TODAY_START, NOW);
  try {
    const weightTotal = await transactions.sum('weight', {
      where: {
        dateIn: {
          [Op.gt]: TODAY_START,
          [Op.lt]: NOW,
        },
      },
      raw: true,
    });
    const priceTotal = await transactions.sum('price', {
      where: {
        createdAt: {
          [Op.gt]: TODAY_START,
          [Op.lt]: NOW,
        },
      },
      raw: true,
    });
    const amountPaymentTotal = await transactions.sum('amountPayment', {
      where: {
        createdAt: {
          [Op.gt]: TODAY_START,
          [Op.lt]: NOW,
        },
      },
      raw: true,
    });

    res.status(200).json({
      message: 'Data retrieved successfully.',
      data: {
        weight: weightTotal,
        price: priceTotal,
        dateNow: NOW,
        dateStart: TODAY_START,
        amountPayment: amountPaymentTotal,
        depositPayment: priceTotal - amountPaymentTotal,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export const getRecapByDate = async (req, res) => {
  const { date } = req.query;
  const todayStart = new Date(date).setHours(0, 0, 0, 0);
  const TODAY_START = new Date(todayStart).toISOString();
  const tomorrowStart = new Date(
    new Date(date).setDate(new Date(date).getDate() + 1)
  );
  const tomorrow = new Date(tomorrowStart).setHours(0, 0, 0, 0);
  const TOMORROW_START = new Date(tomorrow).toISOString();

  try {
    const weightTotal = await transactions.sum('weight', {
      where: {
        dateIn: {
          [Op.gt]: TODAY_START,
          [Op.lt]: TOMORROW_START,
        },
      },
      raw: true,
    });
    const priceTotal = await transactions.sum('price', {
      where: {
        dateIn: {
          [Op.gt]: TODAY_START,
          [Op.lt]: TOMORROW_START,
        },
      },
      raw: true,
    });
    const amountPaymentTodayTotal = await transactions.sum('amountPayment', {
      where: {
        dateIn: {
          [Op.gt]: TODAY_START,
          [Op.lt]: TOMORROW_START,
        },
      },
      raw: true,
    });
    const amountPaymentTotal = await transactions.sum('amountPayment', {
      where: {
        datePayment: {
          [Op.gt]: TODAY_START,
          [Op.lt]: TOMORROW_START,
        },
      },
      raw: true,
    });

    res.status(200).json({
      message: 'Data retrieved successfully.',
      data: {
        weight: weightTotal,
        price: priceTotal,
        dateTomorrow: TOMORROW_START,
        dateStart: TODAY_START,
        //Today's notes and those paid
        amountPaymentToday: amountPaymentTodayTotal,
        //Notes paid today
        amountPayment: amountPaymentTotal,
        depositPayment: priceTotal - amountPaymentTodayTotal,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export const getListDataBydate = async (req, res) => {
  const { date } = req.query;
  const todayStart = new Date(date).setHours(0, 0, 0, 0);
  const TODAY_START = new Date(todayStart).toISOString();
  const tomorrowStart = new Date(
    new Date(date).setDate(new Date(date).getDate() + 1)
  );
  const tomorrow = new Date(tomorrowStart).setHours(0, 0, 0, 0);
  const TOMORROW_START = new Date(tomorrow).toISOString();
  try {
    const data = await transactions.findAll({
      where: {
        dateIn: {
          [Op.gt]: TODAY_START,
          [Op.lt]: TOMORROW_START,
        },
      },
      raw: true,
    });

    const dataPayment = await transactions.findAll({
      where: {
        datePayment: {
          [Op.gt]: TODAY_START,
          [Op.lt]: TOMORROW_START,
        },
      },
      raw: true,
    });
    res.status(200).json({
      message: 'Data retrieved successfully.',
      data: {
        dateStart: TODAY_START,
        dateTomorrow: TOMORROW_START,
        data: data,
        dataPayment: dataPayment,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};