import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // RSS feed URL for Untyped podcast
    // const rssUrl = 'https://feeds.soundcloud.com/users/soundcloud:users:1234567890/sounds.rss'; // This would be the actual RSS feed URL

    // For now, we'll return mock data with proper structure
    // In a real implementation, you would fetch the RSS feed and parse it
    const mockEpisodes = [
      {
        id: 'merge-and-emerge',
        title: 'Merge and Emerge',
        description:
          'عايز تبدأ تساهم في الـ open source ومش عارف منين؟ في الحلقة دي هنتكلم إزاي تعمل أول خطوة، وتدخل المجتمع، وتخلي الكود بتاعك يبان للناس كلها.',
        duration: '36 min',
        publishDate: 'January 2025',
        audioUrl:
          'https://feeds.soundcloud.com/stream/1234567890-untyped-merge-emerge.mp3',
        enclosure: {
          url: 'https://feeds.soundcloud.com/stream/1234567890-untyped-merge-emerge.mp3',
          type: 'audio/mpeg',
          length: '3600000',
        },
      },
      {
        id: 'climbing-pyramid-scheme',
        title: 'Climbing the Pyramid Scheme',
        description:
          'في سوق الـ Tech في مصر، كل الناس بقت "Senior" حتى لو لسه مكمّلينش سنة! العناوين بقت أكبر من الخبرة، والمرتبات ساعات تبقى أوهام زي السراب.',
        duration: '55 min',
        publishDate: 'August 24, 2024',
        audioUrl:
          'https://feeds.soundcloud.com/stream/1234567890-untyped-pyramid-scheme.mp3',
        enclosure: {
          url: 'https://feeds.soundcloud.com/stream/1234567890-untyped-pyramid-scheme.mp3',
          type: 'audio/mpeg',
          length: '5500000',
        },
      },
      {
        id: 'deployed-and-forgotten',
        title: 'Deployed and Forgotten',
        description:
          'زمان كنا بنعمل ديبولويمِنت للفرونت إند بكم أمر بسيط على Nginx أو سيرفر عادي وخلاص. دلوقتي مع كل الادوات والـ platforms الجديدة بقينا بنعتمد على أوتوميشن زيادة ونسينا الأساسيات.',
        duration: '39 min',
        publishDate: 'August 17, 2024',
        audioUrl:
          'https://feeds.soundcloud.com/stream/1234567890-untyped-deployed-forgotten.mp3',
        enclosure: {
          url: 'https://feeds.soundcloud.com/stream/1234567890-untyped-deployed-forgotten.mp3',
          type: 'audio/mpeg',
          length: '3900000',
        },
      },
      {
        id: 'whirlwind-migration',
        title: 'A Whirlwind Migration',
        description:
          'في الحلقة دي حتكلم عن TailwindCSS v4 وايه الجديد فيه ويفرقه عن الاصدارات الي فاتت. حغطي ازاي تحدث ليه وافضل الطرق لذلك وايه الي تاخد بالك منه في العملية دي.',
        duration: '35 min',
        publishDate: 'July 31, 2024',
        audioUrl:
          'https://feeds.soundcloud.com/stream/1234567890-untyped-whirlwind-migration.mp3',
        enclosure: {
          url: 'https://feeds.soundcloud.com/stream/1234567890-untyped-whirlwind-migration.mp3',
          type: 'audio/mpeg',
          length: '3500000',
        },
      },
      {
        id: 'setting-boundaries',
        title: 'Setting Boundaries',
        description:
          'في الحلقة دي هنتكلم عن موضوع بسيط في شكله لكن ليه تأثير ضخم. ليه مهم جدًا تبقى فاهم الـ boundaries بتاعة الداتا اللي بتتعامل معاها؟',
        duration: '30 min',
        publishDate: 'June 29, 2024',
        audioUrl:
          'https://feeds.soundcloud.com/stream/1234567890-untyped-setting-boundaries.mp3',
        enclosure: {
          url: 'https://feeds.soundcloud.com/stream/1234567890-untyped-setting-boundaries.mp3',
          type: 'audio/mpeg',
          length: '3000000',
        },
      },
      {
        id: 'nothing-to-see-here',
        title: 'Nothing to See Here',
        description:
          'في الحلقة دي من Untyped، بنتكلم عن null و undefined وكل القيم اللي بتعتبر فالصي في JavaScript. ليه وجودهم ساعات بيسبب مشاكل؟',
        duration: '40 min',
        publishDate: 'June 9, 2024',
        audioUrl:
          'https://feeds.soundcloud.com/stream/1234567890-untyped-nothing-to-see.mp3',
        enclosure: {
          url: 'https://feeds.soundcloud.com/stream/1234567890-untyped-nothing-to-see.mp3',
          type: 'audio/mpeg',
          length: '4000000',
        },
      },
      {
        id: 'big-tech-big-cuts',
        title: 'Big Tech, Big Cuts, Small Context',
        description:
          'في الحلقة دي، بنتكلم عن تسريحات الموظفين في شركات زي مايكروسوفت، والربط السريع اللي ناس كتير بتعمله بينها وبين الذكاء الاصطناعي.',
        duration: '34 min',
        publishDate: 'May 18, 2024',
        audioUrl:
          'https://feeds.soundcloud.com/stream/1234567890-untyped-big-tech-cuts.mp3',
        enclosure: {
          url: 'https://feeds.soundcloud.com/stream/1234567890-untyped-big-tech-cuts.mp3',
          type: 'audio/mpeg',
          length: '3400000',
        },
      },
      {
        id: 'llmao',
        title: 'LLMao',
        description:
          'في الحلقة دي من Untyped، بنتكلم عن هل فعلاً الـ LLMs ممكن تاخد مكان مبرمجي الـ frontend؟ ولا كل الضجة دي أوفر؟',
        duration: '55 min',
        publishDate: 'May 11, 2024',
        audioUrl:
          'https://feeds.soundcloud.com/stream/1234567890-untyped-llmao.mp3',
        enclosure: {
          url: 'https://feeds.soundcloud.com/stream/1234567890-untyped-llmao.mp3',
          type: 'audio/mpeg',
          length: '5500000',
        },
      },
    ];

    return NextResponse.json({
      success: true,
      episodes: mockEpisodes,
      total: mockEpisodes.length,
      podcast: {
        title: 'Untyped',
        description:
          'نصف ساعه اسبوعيا من الهبد في مجال الفرونت ايند والجافاسكربت بالعربي',
        author: 'Abdelrahman Awad',
        website: 'https://untyped.fm',
        appleUrl: 'https://podcasts.apple.com/us/podcast/untyped/id1695379870',
      },
    });
  } catch (error) {
    console.error('Error fetching podcast RSS:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch podcast data' },
      { status: 500 }
    );
  }
}
