"use client";

import { toast as sonnerToast } from "sonner";

export const toast = {
  success: (msg: string) => sonnerToast.success(msg),
  error: (msg: string) => sonnerToast.error(msg),
  info: (msg: string) => sonnerToast(msg),
  raw: (msg: string) => sonnerToast(msg),
};

export default toast;
