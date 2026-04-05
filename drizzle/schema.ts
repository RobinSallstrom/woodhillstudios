import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, bigint } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Media files uploaded to S3 storage.
 * Tracks all images/videos/documents uploaded through the site.
 */
export const mediaFiles = mysqlTable("media_files", {
  id: int("id").autoincrement().primaryKey(),
  /** S3 object key (relative path) */
  fileKey: varchar("fileKey", { length: 512 }).notNull(),
  /** Public CDN URL returned by storagePut */
  url: text("url").notNull(),
  /** Original filename as uploaded */
  originalName: varchar("originalName", { length: 255 }).notNull(),
  /** MIME type e.g. image/jpeg */
  mimeType: varchar("mimeType", { length: 128 }).notNull(),
  /** File size in bytes */
  fileSize: bigint("fileSize", { mode: "number" }).notNull(),
  /** Logical category: hero | portfolio | about | general */
  category: mysqlEnum("category", ["hero", "portfolio", "about", "general"]).default("general").notNull(),
  /** Optional: which artist this file belongs to (matches artist id slug) */
  artistId: varchar("artistId", { length: 64 }),
  /** Uploader user id (null if uploaded by unauthenticated owner) */
  uploadedBy: int("uploadedBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MediaFile = typeof mediaFiles.$inferSelect;
export type InsertMediaFile = typeof mediaFiles.$inferInsert;
