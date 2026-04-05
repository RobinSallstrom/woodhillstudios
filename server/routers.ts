import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";
import { insertMediaFile, listMediaFiles, deleteMediaFile, getMediaFileById } from "./db";
import { nanoid } from "nanoid";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ── Storage / Media ────────────────────────────────────────────────────────
  storage: router({
    upload: protectedProcedure
      .input(
        z.object({
          data: z.string(),
          originalName: z.string().max(255),
          mimeType: z.string().max(128),
          fileSize: z.number().int().positive(),
          category: z.enum(["hero", "portfolio", "about", "general"]).default("general"),
          artistId: z.string().max(64).optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const buffer = Buffer.from(input.data, "base64");
        const ext = input.originalName.split(".").pop() ?? "bin";
        const suffix = nanoid(10);
        const artistPart = input.artistId ? `${input.artistId}/` : "";
        const fileKey = `woodhill/${input.category}/${artistPart}${suffix}.${ext}`;
        const { url } = await storagePut(fileKey, buffer, input.mimeType);
        const record = await insertMediaFile({
          fileKey,
          url,
          originalName: input.originalName,
          mimeType: input.mimeType,
          fileSize: input.fileSize,
          category: input.category,
          artistId: input.artistId ?? null,
          uploadedBy: ctx.user.id,
        });
        return record;
      }),

    list: publicProcedure
      .input(
        z.object({
          category: z.enum(["hero", "portfolio", "about", "general"]).optional(),
          artistId: z.string().optional(),
          limit: z.number().int().min(1).max(200).default(50),
        }).optional()
      )
      .query(async ({ input }) => {
        return listMediaFiles({
          category: input?.category,
          artistId: input?.artistId,
          limit: input?.limit,
        });
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number().int() }))
      .mutation(async ({ input, ctx }) => {
        const file = await getMediaFileById(input.id);
        if (!file) throw new Error("File not found");
        if (file.uploadedBy !== ctx.user.id && ctx.user.role !== "admin") {
          throw new Error("Not authorized to delete this file");
        }
        await deleteMediaFile(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
