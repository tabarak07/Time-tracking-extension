const express = require("express");
const Log = require("../models/Log");
const { body, query, validationResult } = require("express-validator");

const router = express.Router();

// Middleware for validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Save a log
router.post(
  "/",
  [
    body("userId").notEmpty().withMessage("userId is required"),
    body("hostname").isString().withMessage("hostname must be a valid string"),
    body("timeSpent").isNumeric().withMessage("timeSpent must be a number"),
    body("type").isIn(["productive", "unproductive", "neutral"]).withMessage("type must be one of ['productive', 'unproductive', 'neutral']"),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { userId, hostname, timeSpent, type } = req.body;

    try {
      const log = new Log({ userId, hostname, timeSpent, type });
      await log.save();
      res.status(201).json({ message: "Log saved successfully", log });
    } catch (error) {
      console.error("Error saving log:", error);
      res.status(500).json({ error: "Failed to save log", details: error.message });
    }
  }
);

// Fetch logs for a user
router.get(
  "/",
  [
    query("userId").notEmpty().withMessage("userId parameter is required"),
    query("period").optional().isIn(["weekly", "monthly"]).withMessage("period must be 'weekly' or 'monthly'"),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { userId, period } = req.query;

    try {
      let query = { userId };

      // Filter logs by time period
      if (period === "weekly") {
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        query.date = { $gte: oneWeekAgo };
      } else if (period === "monthly") {
        const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        query.date = { $gte: oneMonthAgo };
      }

      const logs = await Log.find(query).limit(50).skip(50 * (req.query.page || 0)); // Pagination
      res.json({ logs });
    } catch (error) {
      console.error("Error fetching logs:", error);
      res.status(500).json({ error: "Failed to fetch logs", details: error.message });
    }
  }
);

// Fetch productivity analytics
router.get(
  "/analytics",
  [
    // Make userId optional
    query("userId").optional(),
    query("period").optional().isIn(["weekly", "monthly"]).withMessage("period must be 'weekly' or 'monthly'"),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { userId, period } = req.query;

    try {
      let query = {};

      // Add userId to the query if provided
      if (userId) {
        query.userId = userId;
      }

      // Filter logs by time period
      if (period === "weekly") {
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        query.date = { $gte: oneWeekAgo };
      } else if (period === "monthly") {
        const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        query.date = { $gte: oneMonthAgo };
      }

      // Fetch logs and aggregate data
      const logs = await Log.find(query);
      const analytics = {
        productive: logs.filter(log => log.type === "productive").reduce((sum, log) => sum + log.timeSpent, 0),
        unproductive: logs.filter(log => log.type === "unproductive").reduce((sum, log) => sum + log.timeSpent, 0),
        neutral: logs.filter(log => log.type === "neutral").reduce((sum, log) => sum + log.timeSpent, 0),
      };

      res.json({ analytics });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ error: "Failed to fetch analytics", details: error.message });
    }
  }
);

module.exports = router;