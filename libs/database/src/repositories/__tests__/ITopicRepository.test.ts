import { createMockRepositories } from "../../../../../tests/utils/mock-repositories";

describe("ITopicRepository", () => {
  const { topicRepository } = createMockRepositories();

  it("getTopicById success case", async () => {
    const topic = await topicRepository.getTopicById("1");
    expect(topic).toBeTruthy();
    expect(topic?.id).toBe("1");
  });

  it("getTopicById returns null for non-existent", async () => {
    const topic = await topicRepository.getTopicById("999");
    expect(topic).toBeNull();
  });

  it("getAllTopics returns array", async () => {
    const topics = await topicRepository.getAllTopics();
    expect(Array.isArray(topics)).toBe(true);
    expect(topics.length).toBeGreaterThan(0);
  });

  it("createTopic with categoryId reference", async () => {
    const newTopic = await topicRepository.createTopic({
      name: "Geometry",
      categoryId: "1",
    });
    expect(newTopic.id).toBeDefined();
    expect(newTopic.categoryId).toBe("1");
  });

  it("updateTopic updates existing topic", async () => {
    const updated = await topicRepository.updateTopic("1", {
      name: "Algebra Updated",
      categoryId: "1",
    });
    expect(updated.name).toBe("Algebra Updated");
  });

  it("deleteTopic removes topic", async () => {
    await topicRepository.deleteTopic("2");
    const topic = await topicRepository.getTopicById("2");
    expect(topic).toBeNull();
  });
});
