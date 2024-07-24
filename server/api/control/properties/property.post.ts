import { prisma } from "~~/db";
import {
  defineEventHandler,
  getQuery,
  H3Error,
  createError,
  sendError,
} from "h3";
