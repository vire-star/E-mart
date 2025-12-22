import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middlware.js";
import { getAnalyticsController, getDailySalesController } from "../controller/analytics.controller.js";

const analyticRoyte = express.Router()


analyticRoyte.get('/getDate', protectRoute, adminRoute, getAnalyticsController)
analyticRoyte.get('/dailySales', protectRoute, adminRoute, getDailySalesController)

export default analyticRoyte