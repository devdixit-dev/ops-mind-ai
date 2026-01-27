import { Router } from "express";
import {
  addEmployee,
  adminDashboard,
  allEmployees,
  deleteEmployee,
  updateEmployee
} from "../controllers/admin.controller.js";
import {auth, isAdmin} from "../middleware/auth.middleware.js";

const AdminRouter = Router();

AdminRouter.get("/dashboard", auth, isAdmin, adminDashboard);

// User services by Admin
AdminRouter.post("/create", auth, isAdmin, addEmployee);
AdminRouter.get("/all-employees", auth, isAdmin, allEmployees);
AdminRouter.put("/update/:id", auth, isAdmin, updateEmployee);
AdminRouter.delete("/delete/:id", auth, isAdmin, deleteEmployee);

export default AdminRouter;