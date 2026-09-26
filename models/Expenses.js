const express = require('express');
const Expense = require('../models/expenses');

const router = express.Router();

// CREATE expense
router.post('/expenses', async (req, res) => {
  try {
    const expense = await Expense.create(req.body);

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create expense',
      error: error.message
    });
  }
});

// READ all expenses
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch expenses',
      error: error.message
    });
  }
});

// READ one expense
router.get('/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found'
      });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({
      message: 'Invalid expense ID',
      error: error.message
    });
  }
});

// UPDATE expense
router.put('/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found'
      });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update expense',
      error: error.message
    });
  }
});

// DELETE expense
router.delete('/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      message: 'Expense deleted successfully',
      expense
    });
  } catch (error) {
    res.status(400).json({
      message: 'Invalid expense ID',
      error: error.message
    });
  }
});

// SUMMARY
router.get('/summary', (req, res) => {
  res.json({
    message: 'Atlas summary - TODO: Group A implement'
  });
});

module.exports = router;
