import { skillService } from '../services/skillService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/apiResponse.js';

export const createSkill = asyncHandler(async (req, res) => {
  const skill = await skillService.createSkill(req.user._id, req.body);
  return successResponse(res, { message: 'Skill created successfully', data: { skill }, statusCode: 201 });
});

export const listSkills = asyncHandler(async (req, res) => {
  const { search, category, type, page, limit, userId } = req.query;
  const result = await skillService.listSkills({ search, category, type, page, limit, userId });
  return successResponse(res, { message: 'Skills', data: result });
});

export const getSkill = asyncHandler(async (req, res) => {
  const skill = await skillService.getSkillById(req.params.id);
  return successResponse(res, { message: 'Skill detail', data: { skill } });
});

export const updateSkill = asyncHandler(async (req, res) => {
  const skill = await skillService.updateSkill(req.params.id, req.user._id, req.body);
  return successResponse(res, { message: 'Skill updated', data: { skill } });
});

export const deleteSkill = asyncHandler(async (req, res) => {
  const result = await skillService.deleteSkill(req.params.id, req.user._id);
  return successResponse(res, { message: 'Skill deleted', data: result });
});
