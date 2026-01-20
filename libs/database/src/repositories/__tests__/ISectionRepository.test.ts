import { describe, it, expect } from 'vitest';
import { createMockRepositories } from '../../../../../../tests/utils/mock-repositories';

describe('ISectionRepository', () => {
  const { sectionRepository } = createMockRepositories();

  it('getSectionById success case', async () => {
    const section = await sectionRepository.getSectionById('1');
    expect(section).toBeTruthy();
    expect(section?.id).toBe('1');
  });

  it('getSectionById returns null for non-existent', async () => {
    const section = await sectionRepository.getSectionById('999');
    expect(section).toBeNull();
  });

  it('getAllSections returns array', async () => {
    const sections = await sectionRepository.getAllSections();
    expect(Array.isArray(sections)).toBe(true);
    expect(sections.length).toBeGreaterThan(0);
  });

  it('createSection with topicId reference', async () => {
    const newSection = await sectionRepository.createSection({ name: 'Section 3', topicId: '1' });
    expect(newSection.id).toBeDefined();
    expect(newSection.topicId).toBe('1');
  });

  it('updateSection updates existing section', async () => {
    const updated = await sectionRepository.updateSection('1', { name: 'Section 1 Updated', topicId: '1' });
    expect(updated.name).toBe('Section 1 Updated');
  });

  it('deleteSection removes section', async () => {
    await sectionRepository.deleteSection('2');
    const section = await sectionRepository.getSectionById('2');
    expect(section).toBeNull();
  });
});
