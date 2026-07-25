import { Request, Response } from "express";

import {
  createOrganizationSchema,
  updateOrganizationSchema,
} from "./organization.validation";

import { OrganizationService } from "./organization.service";

const organizationService = new OrganizationService();

export async function create(req: Request, res: Response) {
  try {
    const data = createOrganizationSchema.parse(req.body);
    const ownerId = req.user.id;
    const organization = await organizationService.create(ownerId, data);

    return res.status(201).json({
      success: true,
      data: organization,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function update(req: Request<{ id: string }>, res: Response) {
  try {
    const data = updateOrganizationSchema.parse(req.body);
    const ownerId = req.user.id;
    const organizationId = req.params.id;

    const organization = await organizationService.update(
      ownerId,
      organizationId,
      data,
    );

    return res.status(200).json({
      success: true,
      data: organization,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function list(req: Request, res: Response) {
  try {
    const ownerId = req.user.id;

    const organizations = await organizationService.list(ownerId);

    return res.status(200).json({
      success: true,
      data: organizations,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function getById(req: Request<{ id: string }>, res: Response) {
  try {
    const ownerId = req.user.id;
    const organizationId = req.params.id;

    const organization = await organizationService.getById(
      ownerId,
      organizationId,
    );

    return res.status(200).json({
      success: true,
      data: organization,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
}

export async function deleteOrganization(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const organizationId = req.params.id;

    await organizationService.delete(ownerId, organizationId);

    return res.status(200).json({
      success: true,
      message: "Organization deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
