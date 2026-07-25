import { Request, Response, NextFunction } from "express";

import { SettingsService } from "./settings.service";

export class SettingsController {
  private service = new SettingsService();

  getSettings = async (
    req: Request,

    res: Response,

    next: NextFunction,
  ) => {
    try {
      const data = await this.service.getSettings(req.user!.id);

      res.json({
        success: true,

        data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.updateProfile(req.user!.id, req.body);

      res.json({
        success: true,

        data,
      });
    } catch (error) {
      next(error);
    }
  };

  updatePreferences = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.service.updatePreferences(req.user!.id, req.body);

      res.json({
        success: true,

        data,
      });
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.changePassword(req.user!.id, req.body);

      res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}
