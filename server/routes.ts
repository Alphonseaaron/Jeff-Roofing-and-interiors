import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files from public directory
  app.use(express.static(path.resolve(process.cwd(), "public")));
  
  // Serve attached assets
  app.use("/attached_assets", express.static(path.resolve(process.cwd(), "attached_assets")));

  // Route specific HTML pages
  app.get("/admin", (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "public", "admin.html"));
  });

  app.get("/admin.html", (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "public", "admin.html"));
  });

  app.get("/client", (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "public", "client.html"));
  });

  app.get("/client.html", (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "public", "client.html"));
  });

  // Simple health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
