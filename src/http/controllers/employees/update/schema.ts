import { z } from "zod";
import {
  employeeAddressSchema,
  employeeBanksSchema,
  employeeBaseSchema,
  employeeContactSchema,
  employeeFilesSchema,
} from "../register/schema";

export const updateEmployeeBodySchema = z
  .object({
    address: employeeAddressSchema.optional(),
    contact: employeeContactSchema.optional(),
    banks: employeeBanksSchema.optional(),
    files: employeeFilesSchema.optional(),
  })
  .merge(employeeBaseSchema);
