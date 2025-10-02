import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/ogg',
  'audio/m4a',
  'audio/aac',
  'audio/webm',
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const questionId = formData.get('questionId') as string;
    const type = formData.get('type') as 'question' | 'answer';

    if (!file || !questionId || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate file
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
        },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error:
            'File type not supported. Please use MP3, WAV, OGG, M4A, AAC, or WebM',
        },
        { status: 400 }
      );
    }

    // Create directories
    const audioDir = path.join(process.cwd(), 'public', 'audio');
    const questionsDir = path.join(audioDir, 'questions');
    const answersDir = path.join(audioDir, 'answers');

    await fs.mkdir(audioDir, { recursive: true });
    await fs.mkdir(questionsDir, { recursive: true });
    await fs.mkdir(answersDir, { recursive: true });

    // Upload file
    const dir = type === 'question' ? questionsDir : answersDir;
    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const filename = `${questionId}-${timestamp}${fileExtension}`;
    const filePath = path.join(dir, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    const relativePath = `/audio/${type}s/${filename}`;

    console.log(`✅ ${type} audio uploaded locally: ${relativePath}`);

    return NextResponse.json({
      success: true,
      url: relativePath,
      message: `${type} audio uploaded successfully`,
    });
  } catch (error) {
    console.error('Audio upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
