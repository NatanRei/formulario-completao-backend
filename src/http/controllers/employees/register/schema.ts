import { z } from "zod";

export const employeeBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  document: z.string(),
  salary: z.string(),
  startDate: z.coerce.date(),
  birthDate: z.coerce.date(),
  position: z.string(),
  sector: z.string(),
});

export const employeeAddressSchema = z.object({
  zipCode: z.string(),
  publicPlace: z.string(),
  number: z.string(),
  complement: z.string().nullable().optional(),
  district: z.string(),
  city: z.string(),
  state: z.string(),
  countryCode: z.string(),
});

export const employeeContactSchema = z.object({
  email: z.string().email(),
  telephoneNumber: z.string(),
  countryCode: z.string(),
});

export const employeeBankSchema = z.object({
  id: z.string().optional(),
  bankCode: z.string(),
  agency: z.string(),
  account: z.string(),
  accountDigit: z.string(),
  accountType: z.string(),
  keyPix: z.string().nullable().optional(),
  default: z.boolean(),
});

export const employeeBanksSchema = z.array(employeeBankSchema);

export const employeeFileSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  path: z.string(),
  mimeType: z.string(),
  fileName: z.string(),
  is_persistent: z.boolean().optional(),
});

export const employeeFilesSchema = z.array(employeeFileSchema);

export const registerEmployeeBodySchema = z
  .object({
    address: employeeAddressSchema,
    contact: employeeContactSchema,
    banks: employeeBanksSchema,
    files: employeeFilesSchema,
  })
  .merge(employeeBaseSchema);
