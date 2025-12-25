export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "video" | "article" | "course" | "documentation" | "tool" | "book";
  platform: string;
  duration?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  category: string;
}

// Mock resources data based on the markdown structure
export const mockResourcesData: Record<string, Resource[]> = {
  "frontend-basics": [
    {
      id: "mdn-html-basics",
      title: "HTML Basics",
      description:
        "Learn the fundamentals of HTML from Mozilla Developer Network",
      url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML",
      type: "documentation",
      platform: "MDN",
      difficulty: "beginner",
      tags: ["HTML", "Basics", "Documentation"],
      category: "HTML",
    },
    {
      id: "mdn-css-basics",
      title: "CSS Basics",
      description:
        "Learn the fundamentals of CSS from Mozilla Developer Network",
      url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps",
      type: "documentation",
      platform: "MDN",
      difficulty: "beginner",
      tags: ["CSS", "Basics", "Documentation"],
      category: "CSS",
    },
    {
      id: "mdn-js-basics",
      title: "JavaScript Basics",
      description:
        "Learn the fundamentals of JavaScript from Mozilla Developer Network",
      url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps",
      type: "documentation",
      platform: "MDN",
      difficulty: "beginner",
      tags: ["JavaScript", "Basics", "Documentation"],
      category: "JavaScript",
    },
    {
      id: "freecodecamp-responsive",
      title: "Responsive Web Design Certification",
      description: "Free comprehensive course on responsive web design",
      url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
      type: "course",
      platform: "freeCodeCamp",
      duration: "300 hours",
      difficulty: "beginner",
      tags: ["HTML", "CSS", "Responsive Design", "Free"],
      category: "Web Development",
    },
    {
      id: "traversy-html-crash",
      title: "HTML Crash Course",
      description: "Quick HTML tutorial for beginners",
      url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
      type: "video",
      platform: "YouTube",
      duration: "1h 10m",
      difficulty: "beginner",
      tags: ["HTML", "Crash Course", "Video"],
      category: "HTML",
    },
    {
      id: "traversy-css-crash",
      title: "CSS Crash Course",
      description: "Quick CSS tutorial for beginners",
      url: "https://www.youtube.com/watch?v=yfoY53QXEnI",
      type: "video",
      platform: "YouTube",
      duration: "1h 25m",
      difficulty: "beginner",
      tags: ["CSS", "Crash Course", "Video"],
      category: "CSS",
    },
    {
      id: "traversy-js-crash",
      title: "JavaScript Crash Course",
      description: "Quick JavaScript tutorial for beginners",
      url: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
      type: "video",
      platform: "YouTube",
      duration: "1h 40m",
      difficulty: "beginner",
      tags: ["JavaScript", "Crash Course", "Video"],
      category: "JavaScript",
    },
    {
      id: "frontend-masters-intro",
      title: "Complete Intro to Web Development",
      description:
        "Comprehensive web development course covering HTML, CSS, and JavaScript",
      url: "https://frontendmasters.com/courses/web-development-v2/",
      type: "course",
      platform: "Frontend Masters",
      duration: "8h 30m",
      difficulty: "beginner",
      tags: ["HTML", "CSS", "JavaScript", "Web Development"],
      category: "Web Development",
    },
    {
      id: "html-css-book",
      title: "HTML and CSS: Design and Build Websites",
      description: "Comprehensive book on HTML and CSS by Jon Duckett",
      url: "https://www.amazon.com/HTML-CSS-Design-Build-Websites/dp/1118008189",
      type: "book",
      platform: "Amazon",
      difficulty: "beginner",
      tags: ["HTML", "CSS", "Book", "Design"],
      category: "HTML & CSS",
    },
    {
      id: "js-good-parts",
      title: "JavaScript: The Good Parts",
      description:
        "Classic book on JavaScript best practices by Douglas Crockford",
      url: "https://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742",
      type: "book",
      platform: "Amazon",
      difficulty: "intermediate",
      tags: ["JavaScript", "Book", "Best Practices"],
      category: "JavaScript",
    },
  ],
  "advanced-css": [
    {
      id: "css-grid-guide",
      title: "Complete CSS Grid Guide",
      description:
        "A comprehensive guide to CSS Grid layout with practical examples",
      url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
      type: "article",
      platform: "CSS-Tricks",
      difficulty: "intermediate",
      tags: ["CSS", "Grid", "Layout"],
      category: "CSS",
    },
    {
      id: "flexbox-course",
      title: "Flexbox Complete Course",
      description:
        "Learn Flexbox from basics to advanced techniques with interactive examples",
      url: "https://www.youtube.com/watch?v=3YW65K6LcIA",
      type: "video",
      platform: "YouTube",
      duration: "2h 30m",
      difficulty: "beginner",
      tags: ["CSS", "Flexbox", "Layout"],
      category: "CSS",
    },
    {
      id: "css-architecture",
      title: "CSS Architecture Best Practices",
      description: "Learn how to structure and organize CSS for large projects",
      url: "https://www.smashingmagazine.com/2012/04/a-new-front-end-methodology-bem/",
      type: "article",
      platform: "Smashing Magazine",
      difficulty: "intermediate",
      tags: ["CSS", "Architecture", "BEM", "Methodology"],
      category: "CSS",
    },
  ],
  "javascript-deep-dive": [
    {
      id: "js-fundamentals",
      title: "JavaScript Fundamentals Course",
      description:
        "Master JavaScript fundamentals including variables, functions, and DOM manipulation",
      url: "https://www.udemy.com/course/javascript-fundamentals/",
      type: "course",
      platform: "Udemy",
      duration: "8h 45m",
      difficulty: "beginner",
      tags: ["JavaScript", "Fundamentals", "DOM"],
      category: "JavaScript",
    },
    {
      id: "js-event-loop",
      title: "Understanding the JavaScript Event Loop",
      description:
        "Deep dive into how JavaScript handles asynchronous operations",
      url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ",
      type: "video",
      platform: "YouTube",
      duration: "26m",
      difficulty: "intermediate",
      tags: ["JavaScript", "Event Loop", "Asynchronous"],
      category: "JavaScript",
    },
    {
      id: "js-closures",
      title: "JavaScript Closures Explained",
      description:
        "Comprehensive guide to understanding closures in JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
      type: "documentation",
      platform: "MDN",
      difficulty: "intermediate",
      tags: ["JavaScript", "Closures", "Documentation"],
      category: "JavaScript",
    },
  ],
  "react-mastery": [
    {
      id: "react-docs",
      title: "React Official Documentation",
      description:
        "The official React documentation with guides, API reference, and tutorials",
      url: "https://react.dev/",
      type: "documentation",
      platform: "React",
      difficulty: "intermediate",
      tags: ["React", "Documentation", "Hooks"],
      category: "React",
    },
    {
      id: "react-hooks-course",
      title: "React Hooks Complete Course",
      description: "Learn all React hooks from useState to custom hooks",
      url: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
      type: "video",
      platform: "YouTube",
      duration: "3h 15m",
      difficulty: "intermediate",
      tags: ["React", "Hooks", "Video"],
      category: "React",
    },
    {
      id: "react-patterns",
      title: "React Design Patterns",
      description: "Learn common React patterns and best practices",
      url: "https://reactpatterns.com/",
      type: "article",
      platform: "React Patterns",
      difficulty: "advanced",
      tags: ["React", "Patterns", "Best Practices"],
      category: "React",
    },
  ],
  "typescript-essentials": [
    {
      id: "typescript-handbook",
      title: "TypeScript Handbook",
      description:
        "Complete TypeScript handbook covering types, interfaces, and advanced features",
      url: "https://www.typescriptlang.org/docs/",
      type: "documentation",
      platform: "TypeScript",
      difficulty: "intermediate",
      tags: ["TypeScript", "Types", "Interfaces"],
      category: "TypeScript",
    },
    {
      id: "typescript-course",
      title: "TypeScript Complete Course",
      description: "From basics to advanced TypeScript concepts",
      url: "https://www.udemy.com/course/typescript-the-complete-developers-guide/",
      type: "course",
      platform: "Udemy",
      duration: "12h 30m",
      difficulty: "intermediate",
      tags: ["TypeScript", "Course", "Complete"],
      category: "TypeScript",
    },
  ],
};

export function getResourcesForPath(pathId: string): Resource[] {
  return mockResourcesData[pathId] || [];
}

export function getResourceById(
  pathId: string,
  resourceId: string,
): Resource | null {
  const resources = getResourcesForPath(pathId);
  return resources.find((resource) => resource.id === resourceId) || null;
}
