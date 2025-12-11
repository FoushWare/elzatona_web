// Script to create topics and link questions
// v1.0

const JAVASCRIPT_CATEGORY_ID = "c5929620-9e0e-4be6-86e8-4696112a2cd3";

// Topics to create
const topicsToCreate = [
  {
    name: "Type Coercion",
    description:
      "JavaScript type coercion: implicit and explicit type conversion, equality operators (== vs ===), unary operators, and type conversion rules",
    categoryId: JAVASCRIPT_CATEGORY_ID,
    difficulty: "intermediate",
    estimatedQuestions: 5,
    order: 11,
  },
  {
    name: "Functions",
    description:
      "JavaScript functions: first-class functions, functions as objects, function properties, and function behavior",
    categoryId: JAVASCRIPT_CATEGORY_ID,
    difficulty: "intermediate",
    estimatedQuestions: 5,
    order: 12,
  },
];

// Question to topic mappings
const questionTopicMappings = [
  {
    questionId: "c3d4e5f6-a1b2-4c5d-8e9f-23456789012a",
    topicId: "8dcdb2c6-5056-4b47-a5ce-a3cd4a1e20eb",
  }, // Basics
  {
    questionId: "c3d4e5f6-a1b2-4c5d-8e9f-23456789012b",
    topicId: "8dcdb2c6-5056-4b47-a5ce-a3cd4a1e20eb",
  }, // Basics
  {
    questionId: "a2b3c4d5-e6f7-8g9h-0i1j-23456789013c",
    topicId: "1b62c368-375b-4df1-aadd-eb0504ae3612",
  }, // This Binding
  {
    questionId: "b3c4d5e6-f7g8-9h0i-1j2k-3456789014d",
    topicName: "Type Coercion",
  }, // Will be created
  {
    questionId: "c4d5e6f7-g8h9-0i1j-2k3l-456789015e",
    topicId: "ea7a64be-4db2-4acd-abdb-13bd93a7218d",
  }, // Data Structures
  {
    questionId: "d5e6f7g8-h9i0-1j2k-3l4m-56789016f",
    topicId: "ea7a64be-4db2-4acd-abdb-13bd93a7218d",
  }, // Data Structures
  {
    questionId: "e6f7g8h9-i0j1-2k3l-4m5n-6789017g",
    topicName: "Type Coercion",
  }, // Will be created
  {
    questionId: "f7g8h9i0-j1k2-3l4m-5n6o-789018h",
    topicId: "4d2a6785-b6db-4985-953f-f3ba4a388e8e",
  }, // Classes
  {
    questionId: "g8h9i0j1-k2l3-4m5n-6o7p-89019i",
    topicId: "8dcdb2c6-5056-4b47-a5ce-a3cd4a1e20eb",
  }, // Basics
  { questionId: "h9i0j1k2-l3m4-5n6o-7p8q-90110j", topicName: "Functions" }, // Will be created
];

console.log("Topics to create:");
console.log(JSON.stringify(topicsToCreate, null, 2));
console.log("\nQuestion mappings:");
console.log(JSON.stringify(questionTopicMappings, null, 2));
