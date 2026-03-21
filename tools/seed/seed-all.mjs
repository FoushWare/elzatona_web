import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase environment variables in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function toSeedQuestionType(rawType) {
    const type = String(rawType || "").toLowerCase().trim();
    if (type === "mcq" || type === "multiple-choice" || type === "multiple_select" || type === "multiple-select") {
        return "multiple-choice";
    }
    if (type === "true_false" || type === "true-false") {
        return "true-false";
    }
    // Normalize short/open-ended inputs to MCQ for this seeding flow.
    if (type === "short_answer" || type === "short-answer" || type === "open-ended" || type === "open_ended") {
        return "multiple-choice";
    }
    if (type === "code") {
        return "code";
    }
    return "multiple-choice";
}

function toSeedDifficulty(rawDifficulty) {
    const difficulty = String(rawDifficulty || "").toLowerCase().trim();
    if (difficulty === "beginner" || difficulty === "intermediate" || difficulty === "advanced") {
        return difficulty;
    }
    return "intermediate";
}

function normalizeOptions(question) {
    const sourceOptions = Array.isArray(question.options) ? question.options : Array.isArray(question.choices) ? question.choices : [];
    return sourceOptions.map((opt, index) => ({
        id: opt?.id || opt?.key || String.fromCharCode(65 + index),
        text: opt?.text || "",
        isCorrect: Boolean(opt?.isCorrect ?? opt?.is_correct ?? false)
    }));
}

function resolveCorrectAnswer(question, normalizedOptions) {
    if (question.correct_answer) {
        return question.correct_answer;
    }

    const correctOption = normalizedOptions.find(opt => opt.isCorrect);
    if (correctOption) {
        return correctOption.id;
    }

    if (question.answer_text) {
        return question.answer_text;
    }

    return null;
}

function clampString(value, maxLen) {
    const text = String(value || "");
    return text.length > maxLen ? `${text.slice(0, maxLen - 1)}…` : text;
}

function buildSeedTitle(rawTitle, rawContent) {
    const titleSource = String(rawTitle || "").trim();
    const contentSource = String(rawContent || "").trim();
    const firstLine = (titleSource || contentSource).split("\n").find(line => line.trim().length > 0) || "Untitled question";
    return clampString(firstLine.trim(), 255);
}

function slugify(text) {
    return String(text || "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

const CANONICAL_LEARNING_CARDS = [
    {
        key: "core",
        title: "Core Technologies",
        description: "HTML, CSS, JavaScript, TypeScript",
        color: "#3B82F6",
        icon: "layers",
        order_index: 0
    },
    {
        key: "framework",
        title: "Framework Questions",
        description: "React, Next.js, Vue, Angular, Svelte",
        color: "#10B981",
        icon: "layers",
        order_index: 1
    },
    {
        key: "problem",
        title: "Problem Solving",
        description: "Frontend coding challenges and algorithms",
        color: "#F59E0B",
        icon: "layers",
        order_index: 2
    },
    {
        key: "system",
        title: "System Design",
        description: "Frontend architecture patterns",
        color: "#EF4444",
        icon: "layers",
        order_index: 3
    }
];

const CANONICAL_CARD_TYPE_BY_KEY = {
    core: "core-technologies",
    framework: "framework-questions",
    problem: "problem-solving",
    system: "system-design"
};

function mapCategoryToCanonicalCardKey(category) {
    const hint = `${category?.card_type || ""} ${category?.slug || ""} ${category?.name || ""}`.toLowerCase();

    if (
        hint.includes("framework") ||
        hint.includes("react") ||
        hint.includes("next") ||
        hint.includes("vue") ||
        hint.includes("angular") ||
        hint.includes("svelte")
    ) {
        return "framework";
    }

    if (
        hint.includes("problem") ||
        hint.includes("algorithm") ||
        hint.includes("coding") ||
        hint.includes("challenge")
    ) {
        return "problem";
    }

    if (
        hint.includes("system") ||
        hint.includes("design") ||
        hint.includes("architecture")
    ) {
        return "system";
    }

    return "core";
}

/**
 * Generate plan metadata for spaced repetition architecture
 * @param {number} planSequence - 1, 2, 3, or 4
 * @returns {object} - { title, description, plan_type, sequence_index }
 */
function generatePlanMetadata(planSequence) {
    const plans = {
        1: {
            title: "Initial",
            description: "Start with core concepts and essential patterns across all four cards.",
            plan_type: "initial",
            sequence_index: 1,
            new_question_count: 10,
            review_question_count: 0
        },
        2: {
            title: "Review",
            description: "Mix new content with targeted review to deepen understanding.",
            plan_type: "reinforcement",
            sequence_index: 2,
            new_question_count: 5,
            review_question_count: 5
        },
        3: {
            title: "Advanced",
            description: "Challenge understanding with advanced scenarios and edge cases.",
            plan_type: "advanced",
            sequence_index: 3,
            new_question_count: 4,
            review_question_count: 8
        },
        4: {
            title: "Maintenance",
            description: "Maintain knowledge with spaced review and minimal new content.",
            plan_type: "maintenance",
            sequence_index: 4,
            new_question_count: 2,
            review_question_count: 8
        }
    };
    return plans[planSequence] || plans[1];
}

/**
 * Calculate display label for plan cards
 * @param {number} newCount - number of new questions
 * @param {number} reviewCount - number of review questions
 * @returns {string} - e.g., "10 questions" or "5 new + 5 review"
 */
function getDisplayLabel(newCount, reviewCount) {
    const total = newCount + reviewCount;
    if (reviewCount === 0) {
        return `${total} questions`;
    }
    return `${newCount} new + ${reviewCount} review`;
}

/**
 * Group questions by difficulty tier
 * @param {array} questions - array of question IDs
 * @returns {object} - { easy: [], medium: [], hard: [] }
 */
function groupQuestionsByDifficulty(questions) {
    // Simulate difficulty grouping based on index
    // In production, this would be based on actual difficulty data
    const third = Math.ceil(questions.length / 3);
    return {
        easy: questions.slice(0, third),
        medium: questions.slice(third, 2 * third),
        hard: questions.slice(2 * third)
    };
}

async function insertFirstValidPayload(table, payloads) {
    let lastError = null;
    for (const basePayload of payloads) {
        const payload = { ...basePayload };

        while (true) {
            const { data, error } = await supabase
                .from(table)
                .insert(payload)
                .select("id")
                .single();

            if (!error && data?.id) {
                return { data, error: null };
            }

            lastError = error;

            const missingColumnMatch = String(error?.message || "").match(/Could not find the '([^']+)' column/);
            if (!missingColumnMatch) {
                break;
            }

            const missingColumn = missingColumnMatch[1];
            if (!(missingColumn in payload)) {
                break;
            }

            delete payload[missingColumn];
        }
    }

    return { data: null, error: lastError };
}

function normalizeQuestion(question) {
    const rawContent = question.content || question.question_text || question.title || "";
    const title = buildSeedTitle(question.title || question.question_text || "", rawContent);
    const content = rawContent;
    const options = normalizeOptions(question);

    return {
        title,
        content,
        type: toSeedQuestionType(question.type || question.question_type),
        difficulty: toSeedDifficulty(question.difficulty),
        points: typeof question.points === "number" ? question.points : 1,
        options,
        correct_answer: resolveCorrectAnswer(question, options),
        explanation: question.explanation || null,
        cat_slug: question.cat_slug || question.category_slug || question.category_slugs?.[0] || null,
        topic_slug: question.topic_slug || question.topic_slugs?.[0] || null,
        tags: Array.isArray(question.tags) ? question.tags : null,
        metadata: question.metadata || {
            learning_modes: Array.isArray(question.learning_modes) ? question.learning_modes : [],
            source: question.source || null,
            external_ref: question.external_ref || null
        },
        resources: question.resources || (question.source ? [question.source] : null),
        external_ref: question.external_ref || null
    };
}

function writeFailedQuestionLog(failedQuestions) {
    if (!failedQuestions.length) {
        return;
    }

    const logsDir = path.join(__dirname, "logs");
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const logFilePath = path.join(logsDir, `failed-questions-${timestamp}.json`);
    fs.writeFileSync(logFilePath, JSON.stringify({
        created_at: new Date().toISOString(),
        total_failed_questions: failedQuestions.length,
        failed_questions: failedQuestions
    }, null, 2));

    console.log(`   📝 Failed question log written to ${path.relative(process.cwd(), logFilePath)}`);
}

// Load data from samples or fallback to starter-data.json
function loadSeedData() {
    const questionsDir = path.join(__dirname, "questions");
    let mergedData = {
        categories: [],
        topics: [],
        questions: []
    };

    // Check if questions directory exists with sample files
    if (fs.existsSync(questionsDir)) {
        console.log("📂 Found questions directory, loading sample files...");
        const loadJsonFilesRecursive = (dir) => {
            const files = fs.readdirSync(dir);
            const jsonFiles = [];

            for (const file of files) {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);

                if (stat.isDirectory()) {
                    jsonFiles.push(...loadJsonFilesRecursive(filePath));
                } else if (file.endsWith(".json")) {
                    jsonFiles.push(filePath);
                }
            }
            return jsonFiles;
        };

        const jsonFiles = loadJsonFilesRecursive(questionsDir).sort();
        console.log(`   Found ${jsonFiles.length} sample file(s)`);

        // Merge all sample files
        for (const filePath of jsonFiles) {
            try {
                const sampleData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
                console.log(`   ✓ Loaded ${path.relative(__dirname, filePath)}`);

                // Merge categories (avoid duplicates by slug)
                const existingSlugs = new Set(mergedData.categories.map(c => c.slug));
                sampleData.categories?.forEach(cat => {
                    if (!existingSlugs.has(cat.slug)) {
                        mergedData.categories.push(cat);
                        existingSlugs.add(cat.slug);
                    }
                });

                // Merge topics (avoid duplicates by slug)
                const existingTopicSlugs = new Set(mergedData.topics.map(t => t.slug));
                sampleData.topics?.forEach(top => {
                    if (!existingTopicSlugs.has(top.slug)) {
                        mergedData.topics.push(top);
                        existingTopicSlugs.add(top.slug);
                    }
                });

                // Merge questions (avoid duplicates by external_ref)
                const existingRefs = new Set(mergedData.questions.map(q => q.external_ref));
                sampleData.questions?.forEach(q => {
                    if (!existingRefs.has(q.external_ref)) {
                        mergedData.questions.push(q);
                        existingRefs.add(q.external_ref);
                    }
                });
            } catch (err) {
                console.error(`   ❌ Failed to load ${filePath}: ${err.message}`);
            }
        }

        console.log(`📊 Merged data: ${mergedData.categories.length} categories, ${mergedData.topics.length} topics, ${mergedData.questions.length} questions\n`);
        return mergedData;
    } else {
        // Fallback to starter-data.json
        console.log("📂 No questions directory found, using starter-data.json...");
        const starterPath = path.join(__dirname, "starter-data.json");
        if (fs.existsSync(starterPath)) {
            return JSON.parse(fs.readFileSync(starterPath, "utf-8"));
        } else {
            console.error("❌ No seed data found. Create questions/ directory with samples or starter-data.json");
            process.exit(1);
        }
    }
}

const data = loadSeedData();

async function clearTables() {
    console.log("🗑️  Clearing tables...");

    // Break category -> learning_card link first so card/category cleanup can proceed safely.
    const { error: detachCategoryCardError } = await supabase
        .from("categories")
        .update({ learning_card_id: null })
        .neq("id", "00000000-0000-0000-0000-000000000000");

    if (detachCategoryCardError && !detachCategoryCardError.message.includes("does not exist")) {
        console.warn(`   ⚠️  Failed detaching category card links: ${detachCategoryCardError.message}`);
    }

    const tables = [
        "questions_topics",
        "plan_questions",
        "plan_cards",
        "card_categories",
        "questions",
        "topics",
        "categories",
        "learning_cards",
        "learning_plans"
    ];
    for (const table of tables) {
        const { error } = await supabase.from(table).delete().neq("id", "00000000-0000-0000-0000-000000000000");
        if (error && !error.message.includes("does not exist")) {
            console.warn(`   ⚠️  Failed to clear ${table}: ${error.message}`);
        }
    }
}

async function seed() {
    console.log("🚀 Starting comprehensive seeding...");

    await clearTables();

    // 1. Seed Categories
    console.log("📁 Seeding Categories...");
    const catMappings = {};
    for (const cat of data.categories) {
        const { data: record, error } = await supabase
            .from("categories")
            .upsert({
                name: cat.name,
                slug: cat.slug,
                description: cat.description,
                card_type: cat.card_type || "concept",
                icon: cat.icon || "book-open",
                color: cat.color || "#64748b",
                order_index: typeof cat.order_index === "number" ? cat.order_index : 0
            }, { onConflict: "slug" })
            .select()
            .single();

        if (error) console.error(`   ❌ Failed cat: ${cat.slug}`, error.message);
        else catMappings[cat.slug] = record.id;
    }

    // 2. Seed Topics
    console.log("📚 Seeding Topics...");
    const topicMappings = {};
    const fallbackTopicByCategorySlug = {};
    for (const top of data.topics) {
        const categorySlug = top.cat_slug || top.category_slug;
        const catId = catMappings[categorySlug];
        if (!catId) continue;

        const { data: record, error } = await supabase
            .from("topics")
            .upsert({ name: top.name, slug: top.slug, category_id: catId }, { onConflict: "slug" })
            .select()
            .single();

        if (error) {
            console.error(`   ❌ Failed topic: ${top.slug}`, error.message);
        } else {
            topicMappings[top.slug] = record.id;
            if (categorySlug && !fallbackTopicByCategorySlug[categorySlug]) {
                fallbackTopicByCategorySlug[categorySlug] = record.id;
            }
        }
    }

    // 2.5 Seed canonical Learning Cards and attach categories to them
    console.log("🃏 Seeding canonical Learning Cards...");
    const cardIdByKey = {};
    const cardIds = [];

    for (const cardDef of CANONICAL_LEARNING_CARDS) {
        const cardType = CANONICAL_CARD_TYPE_BY_KEY[cardDef.key] || "core-technologies";
        const cardPayloads = [
            {
                title: cardDef.title,
                description: cardDef.description,
                content: cardDef.description,
                type: cardType,
                icon: cardDef.icon,
                color: cardDef.color,
                order_index: cardDef.order_index,
                is_active: true
            },
            {
                title: cardDef.title,
                description: cardDef.description,
                content: cardDef.description,
                type: cardType,
                color: cardDef.color,
                icon: cardDef.icon,
                order_index: cardDef.order_index,
                is_active: true
            }
        ];

        const { data: cardRecord, error: cardError } = await insertFirstValidPayload("learning_cards", cardPayloads);

        if (cardError || !cardRecord?.id) {
            console.warn(`   ⚠️ Failed to seed canonical card ${cardDef.title}: ${cardError?.message || "Unknown error"}`);
            continue;
        }

        cardIdByKey[cardDef.key] = cardRecord.id;
        cardIds.push(cardRecord.id);
    }

    const categoryCardKeyBySlug = {};
    for (const category of data.categories) {
        const categoryId = catMappings[category.slug];
        if (!categoryId) continue;

        const cardKey = mapCategoryToCanonicalCardKey(category);
        const cardId = cardIdByKey[cardKey] || null;
        categoryCardKeyBySlug[category.slug] = cardKey;

        if (!cardId) continue;

        const { error: categoryLinkError } = await supabase
            .from("categories")
            .update({ learning_card_id: cardId })
            .eq("id", categoryId);

        if (categoryLinkError) {
            console.warn(`   ⚠️ Failed to attach category ${category.slug} to ${cardKey}: ${categoryLinkError.message}`);
        }
    }

    // 3. Seed Questions
    console.log("❓ Seeding Questions...");
    const normalizedQuestions = data.questions.map(normalizeQuestion);
    const failedQuestions = [];
    let successCount = 0;
    const questionIdsByCardId = {};
    const unassignedQuestionIds = [];

    if (cardIds.length === 0) {
        throw new Error("No canonical learning cards were created. Aborting question/plan seeding.");
    }

    for (let index = 0; index < normalizedQuestions.length; index++) {
        const question = normalizedQuestions[index];
        const catId = catMappings[question.cat_slug];
        const topicId = topicMappings[question.topic_slug] || fallbackTopicByCategorySlug[question.cat_slug] || null;

        if (!question.title || !question.content) {
            const reason = "Missing required title/content after normalization";
            console.error(`   ❌ Question ${index + 1}/${normalizedQuestions.length} failed: ${reason}`);
            failedQuestions.push({
                index: index + 1,
                reason,
                question
            });
            continue;
        }

        if (!catId) {
            const reason = `Category slug could not be resolved (cat_slug=${question.cat_slug}, topic_slug=${question.topic_slug})`;
            console.error(`   ❌ Question ${index + 1}/${normalizedQuestions.length} failed: ${reason}`);
            failedQuestions.push({
                index: index + 1,
                reason,
                question
            });
            continue;
        }

        const payload = {
            title: question.title,
            content: question.content,
            type: question.type,
            difficulty: question.difficulty,
            points: question.points,
            options: question.options,
            correct_answer: question.correct_answer,
            explanation: question.explanation,
            category_id: catId,
            topic_id: topicId,
            learning_card_id: cardIdByKey[categoryCardKeyBySlug[question.cat_slug]] || null,
            tags: question.tags,
            metadata: question.metadata,
            resources: question.resources,
            is_active: true
        };

        const { data: insertedQuestion, error } = await supabase
            .from("questions")
            .insert(payload)
            .select("id, learning_card_id")
            .single();

        if (error) {
            console.error(`   ❌ Question ${index + 1}/${normalizedQuestions.length} failed: ${error.message}`);
            failedQuestions.push({
                index: index + 1,
                reason: error.message,
                question,
                payload
            });
            continue;
        }

        const assignedCardId = insertedQuestion?.learning_card_id || payload.learning_card_id;
        if (insertedQuestion?.id) {
            if (assignedCardId) {
                if (!questionIdsByCardId[assignedCardId]) {
                    questionIdsByCardId[assignedCardId] = [];
                }
                questionIdsByCardId[assignedCardId].push(insertedQuestion.id);
            } else {
                unassignedQuestionIds.push(insertedQuestion.id);
            }
        }

        successCount += 1;
        console.log(`   ✅ Question ${index + 1}/${normalizedQuestions.length} seeded: ${question.external_ref || question.title}`);
    }

    writeFailedQuestionLog(failedQuestions);
    console.log(`   ✅ Questions seeded: ${successCount}`);
    if (failedQuestions.length) {
        console.log(`   ⚠️ Questions failed: ${failedQuestions.length}`);
    }

    // 4. Seed Learning Plans with Spaced Repetition Architecture
    // Plans: 1) Initial 2) Review 3) Advanced 4) Maintenance
    console.log("🧭 Seeding Learning Plans (Spaced Repetition)...");
    
    // Collect all questions by card to understand question distribution
    const allCardQuestionsMap = {};
    for (const cardId of cardIds) {
        allCardQuestionsMap[cardId] = questionIdsByCardId[cardId] || [];
    }

    // Generate 4 plans per topic
    const planSequences = [1, 2, 3, 4];
    const plansCreated = [];

    for (const planSeq of planSequences) {
        const metadata = generatePlanMetadata(planSeq);
        const displayLabel = getDisplayLabel(metadata.new_question_count, metadata.review_question_count);

        const planPayloads = [
            {
                title: metadata.title,
                description: metadata.description,
                estimated_duration: planSeq * 5, // 5, 10, 15, 20 minutes per sequence
                estimated_hours: Math.ceil(planSeq * 5 / 60),
                plan_type: metadata.plan_type,
                sequence_index: metadata.sequence_index,
                new_question_count: metadata.new_question_count,
                review_question_count: metadata.review_question_count,
                display_label: displayLabel,
                status: "published",
                is_public: true,
                is_active: true
            },
            {
                name: metadata.title,
                description: metadata.description,
                estimated_duration: planSeq * 5,
                plan_type: metadata.plan_type,
                sequence_index: metadata.sequence_index,
                display_label: displayLabel,
                status: "published",
                is_public: true,
                is_active: true
            },
            {
                title: metadata.title,
                description: metadata.description,
                display_label: displayLabel,
                is_public: true,
                is_active: true
            }
        ];

        const { data: planRecord, error: planError } = await insertFirstValidPayload("learning_plans", planPayloads);

        if (planError || !planRecord?.id) {
            console.warn(`   ⚠️ Failed to seed plan (${metadata.title}): ${planError?.message || "Unknown error"}`);
            continue;
        }

        plansCreated.push({ id: planRecord.id, sequence: planSeq, metadata });
        console.log(`   ✅ Plan ${planSeq}: ${metadata.title}`);

        // Include all cards in the plan
        const planCardRows = cardIds.map((cardId, index) => ({
            plan_id: planRecord.id,
            card_id: cardId,
            order_index: index,
            is_active: true
        }));

        if (planCardRows.length) {
            const { error: planCardsError } = await supabase
                .from("plan_cards")
                .insert(planCardRows);

            if (planCardsError) {
                console.warn(`   ⚠️ Failed linking cards to plan ${planSeq}: ${planCardsError.message}`);
            }
        }

        // Distribute questions according to plan type
        const planQuestionRows = [];
        let questionIndex = 0;

        for (const cardId of cardIds) {
            const cardQuestionIds = questionIdsByCardId[cardId] || [];
            if (cardQuestionIds.length === 0) continue;

            // Group questions hypothetically by difficulty
            const grouped = groupQuestionsByDifficulty(cardQuestionIds);

            switch (planSeq) {
                case 1: {
                    // Plan 1 (Foundations): ~10 new questions spread across cards
                    const newPerCard = Math.max(1, Math.floor(metadata.new_question_count / cardIds.length));
                    for (let i = 0; i < Math.min(newPerCard, cardQuestionIds.length); i++) {
                        planQuestionRows.push({
                            plan_id: planRecord.id,
                            question_id: cardQuestionIds[i],
                            order_index: planQuestionRows.length,
                            is_review: false,
                            parent_plan_id: null,
                            difficulty_tier: i < grouped.easy.length ? "easy" : i < grouped.easy.length + grouped.medium.length ? "medium" : "hard",
                            is_active: true
                        });
                    }
                    break;
                }
                case 2: {
                    // Plan 2 (Review & Deepen): 50% new + 50% review from Plan 1
                    const newPerCard = Math.max(1, Math.floor(metadata.new_question_count / cardIds.length));
                    const reviewPerCard = Math.max(1, Math.floor(metadata.review_question_count / cardIds.length));

                    // Add new questions (continuing from where Plan 1 left off)
                    const startNew = Math.ceil(metadata.new_question_count / cardIds.length);
                    for (let i = startNew; i < Math.min(startNew + newPerCard, cardQuestionIds.length); i++) {
                        planQuestionRows.push({
                            plan_id: planRecord.id,
                            question_id: cardQuestionIds[i],
                            order_index: planQuestionRows.length,
                            is_review: false,
                            parent_plan_id: null,
                            difficulty_tier: "medium",
                            is_active: true
                        });
                    }

                    // Add review questions from Plan 1 (hardest ones)
                    const reviewQs = grouped.hard.length > 0 ? grouped.hard : grouped.medium;
                    for (let i = 0; i < Math.min(reviewPerCard, reviewQs.length); i++) {
                        planQuestionRows.push({
                            plan_id: planRecord.id,
                            question_id: reviewQs[i],
                            order_index: planQuestionRows.length,
                            is_review: true,
                            parent_plan_id: plansCreated[0].id, // Reference Plan 1
                            difficulty_tier: "hard",
                            is_active: true
                        });
                    }
                    break;
                }
                case 3: {
                    // Plan 3 (Advanced Mastery): 33% new + 67% review from Plans 1-2
                    const newPerCard = Math.max(1, Math.floor(metadata.new_question_count / cardIds.length));
                    const reviewPerCard = Math.max(2, Math.floor(metadata.review_question_count / cardIds.length));

                    // Add advanced new questions
                    const startAdv = Math.ceil((metadata.new_question_count + metadata.review_question_count) / cardIds.length) + 2;
                    for (let i = startAdv; i < Math.min(startAdv + newPerCard, cardQuestionIds.length); i++) {
                        planQuestionRows.push({
                            plan_id: planRecord.id,
                            question_id: cardQuestionIds[i],
                            order_index: planQuestionRows.length,
                            is_review: false,
                            parent_plan_id: null,
                            difficulty_tier: "hard",
                            is_active: true
                        });
                    }

                    // Add review questions (hardest from Plans 1 and 2)
                    const allReviewQs = [...grouped.hard, ...grouped.medium].slice(0, reviewPerCard);
                    for (const qId of allReviewQs) {
                        planQuestionRows.push({
                            plan_id: planRecord.id,
                            question_id: qId,
                            order_index: planQuestionRows.length,
                            is_review: true,
                            parent_plan_id: plansCreated[Math.random() > 0.5 ? 0 : 1]?.id || null, // Random from Plan 1-2
                            difficulty_tier: "hard",
                            is_active: true
                        });
                    }
                    break;
                }
                case 4: {
                    // Plan 4 (Weekly Check-in): ~20% new + 80% review from all previous plans
                    const newPerCard = Math.max(1, Math.floor(metadata.new_question_count / cardIds.length));
                    const reviewPerCard = Math.max(2, Math.floor(metadata.review_question_count / cardIds.length));

                    // Add final new questions
                    for (let i = cardQuestionIds.length - newPerCard; i < cardQuestionIds.length; i++) {
                        if (i >= 0) {
                            planQuestionRows.push({
                                plan_id: planRecord.id,
                                question_id: cardQuestionIds[i],
                                order_index: planQuestionRows.length,
                                is_review: false,
                                parent_plan_id: null,
                                difficulty_tier: "hard",
                                is_active: true
                            });
                        }
                    }

                    // Add maintenance review (mixed difficulty from all previous)
                    const mixedReviewQs = [...grouped.easy.slice(0, 2), ...grouped.medium.slice(0, 3), ...grouped.hard.slice(0, 3)].slice(0, reviewPerCard);
                    for (const qId of mixedReviewQs) {
                        planQuestionRows.push({
                            plan_id: planRecord.id,
                            question_id: qId,
                            order_index: planQuestionRows.length,
                            is_review: true,
                            parent_plan_id: plansCreated[Math.floor(Math.random() * (plansCreated.length - 1))]?.id || null,
                            difficulty_tier: "medium",
                            is_active: true
                        });
                    }
                    break;
                }
            }
        }

        // Also add unassigned questions to maintenance plan
        if (planSeq === 4) {
            for (let i = 0; i < Math.min(3, unassignedQuestionIds.length); i++) {
                planQuestionRows.push({
                    plan_id: planRecord.id,
                    question_id: unassignedQuestionIds[i],
                    order_index: planQuestionRows.length,
                    is_review: false,
                    parent_plan_id: null,
                    difficulty_tier: "medium",
                    is_active: true
                });
            }
        }

        // Insert plan questions
        if (planQuestionRows.length) {
            for (const row of planQuestionRows) {
                const { error: planQuestionError } = await insertFirstValidPayload("plan_questions", [
                    row,
                    {
                        plan_id: row.plan_id,
                        question_id: row.question_id,
                        order_index: row.order_index,
                        is_review: row.is_review
                    },
                    {
                        plan_id: row.plan_id,
                        question_id: row.question_id
                    }
                ]);

                if (planQuestionError) {
                    console.warn(`   ⚠️ Failed linking question to plan ${planSeq}: ${planQuestionError.message}`);
                }
            }
        }

        console.log(`   ✅ Linked ${planQuestionRows.length} questions to ${metadata.title}`);
    }

    console.log("✨ Seeding completed!");
}

seed();
