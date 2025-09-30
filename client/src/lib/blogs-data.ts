export interface IBlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
  author: string;
  publishedDate: string;
  readTime: string;
  featured: boolean;
}

export const blogsData: IBlogPost[] = [
  {
    id: 1,
    title: "Building Scalable React Applications with TypeScript",
    description:
      "Learn how to structure and build maintainable React applications using TypeScript, focusing on best practices and architectural patterns.",
    content: `
# Building Scalable React Applications with TypeScript

TypeScript has become an essential tool for building robust React applications. In this comprehensive guide, we'll explore the best practices and patterns for creating scalable React applications.

## Why TypeScript?

TypeScript provides static type checking, which helps catch errors at compile time rather than runtime. This is especially valuable in large React applications where prop drilling and component communication can become complex.

## Key Benefits

- **Type Safety**: Catch errors before they reach production
- **Better Developer Experience**: Enhanced IDE support with autocomplete and refactoring
- **Self-Documenting Code**: Types serve as documentation
- **Easier Refactoring**: Confident code changes with type checking

## Best Practices

### 1. Define Clear Interfaces

Always define interfaces for your component props and state:

\`\`\`typescript
interface UserCardProps {
  user: User
  onEdit: (id: string) => void
  isLoading?: boolean
}
\`\`\`

### 2. Use Generic Components

Create reusable components with generics:

\`\`\`typescript
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}
\`\`\`

## Conclusion

TypeScript transforms React development by providing type safety and better tooling. Start small and gradually adopt more advanced patterns as your application grows.
    `,
    image: "/images/blog-1.webp",
    tags: ["React", "TypeScript", "Frontend", "Best Practices"],
    author: "John Doe",
    publishedDate: "2024-01-15",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Modern State Management in React: Redux vs Zustand",
    description:
      "A comprehensive comparison of Redux and Zustand for state management in React applications, with practical examples and use cases.",
    content: `
# Modern State Management in React: Redux vs Zustand

State management is crucial for building complex React applications. Let's compare two popular solutions: Redux and Zustand.

## Redux: The Veteran

Redux has been the go-to state management solution for React applications for years. It follows a predictable state container pattern with actions, reducers, and a single store.

### Pros:
- Mature ecosystem
- Excellent debugging tools
- Predictable state updates
- Great for large applications

### Cons:
- Boilerplate heavy
- Steep learning curve
- Can be overkill for simple apps

## Zustand: The Modern Alternative

Zustand is a lightweight state management solution that provides a more straightforward API while maintaining the benefits of centralized state management.

### Pros:
- Minimal boilerplate
- Easy to learn
- TypeScript friendly
- Small bundle size

### Cons:
- Smaller ecosystem
- Less tooling support
- Newer, less battle-tested

## When to Use Which?

Choose Redux for:
- Large, complex applications
- Teams familiar with Redux patterns
- Need for extensive debugging tools

Choose Zustand for:
- Small to medium applications
- Quick prototyping
- Teams new to state management

## Conclusion

Both Redux and Zustand are excellent choices. Your decision should be based on your team's experience, project complexity, and specific requirements.
    `,
    image: "/images/blog-2.jpeg",
    tags: ["React", "Redux", "Zustand", "State Management"],
    author: "Jane Smith",
    publishedDate: "2024-02-10",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: 3,
    title: "Optimizing React Performance: Tips and Tricks",
    description:
      "Discover essential techniques for optimizing React application performance, from component optimization to bundle splitting.",
    content: `
# Optimizing React Performance: Tips and Tricks

Performance optimization is crucial for delivering great user experiences. Here are proven techniques for optimizing React applications.

## Component Optimization

### 1. Use React.memo

Prevent unnecessary re-renders with React.memo:

\`\`\`jsx
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Complex rendering logic */}</div>
})
\`\`\`

### 2. Optimize useCallback and useMemo

Use these hooks to memoize expensive calculations:

\`\`\`jsx
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data)
}, [data])
\`\`\`

## Bundle Optimization

### Code Splitting

Split your code to reduce initial bundle size:

\`\`\`jsx
const LazyComponent = lazy(() => import('./LazyComponent'))
\`\`\`

### Tree Shaking

Ensure your bundler can eliminate dead code by using ES6 imports.

## Conclusion

Performance optimization is an ongoing process. Profile your application regularly and apply these techniques where they provide the most benefit.
    `,
    image: "/images/blog-3.jpeg",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    author: "Mike Johnson",
    publishedDate: "2024-03-05",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: 4,
    title: "Getting Started with Next.js 14: App Router Deep Dive",
    description:
      "Explore the new App Router in Next.js 14 and learn how to build modern web applications with server components and streaming.",
    content: `
# Getting Started with Next.js 14: App Router Deep Dive

Next.js 14 introduces significant improvements to the App Router, making it easier to build performant web applications.

## What's New in Next.js 14

- Improved App Router stability
- Enhanced Server Components
- Better streaming support
- Optimized bundling

## App Router Fundamentals

The App Router uses a file-system based routing approach with enhanced features:

### File Structure
\`\`\`
app/
  layout.tsx
  page.tsx
  blog/
    page.tsx
    [slug]/
      page.tsx
\`\`\`

### Server Components by Default

Components in the app directory are Server Components by default, providing better performance and SEO.

## Advanced Features

### Streaming

Stream content to improve perceived performance:

\`\`\`jsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <SlowComponent />
    </Suspense>
  )
}
\`\`\`

## Conclusion

Next.js 14's App Router provides a powerful foundation for building modern web applications. The combination of Server Components and streaming creates excellent user experiences.
    `,
    image: "/images/blog-4.png",
    tags: ["Next.js", "App Router", "Server Components", "React"],
    author: "Sarah Wilson",
    publishedDate: "2024-03-20",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 5,
    title: "CSS-in-JS vs Tailwind CSS: Making the Right Choice",
    description:
      "Compare different styling approaches for React applications and learn when to use CSS-in-JS libraries versus utility-first frameworks like Tailwind CSS.",
    content: `
# CSS-in-JS vs Tailwind CSS: Making the Right Choice

Styling React applications has evolved significantly. Let's compare two popular approaches: CSS-in-JS and Tailwind CSS.

## CSS-in-JS Solutions

CSS-in-JS libraries like styled-components and emotion allow you to write CSS directly in your JavaScript files.

### Advantages:
- Dynamic styling based on props
- Automatic vendor prefixing
- Dead code elimination
- Component-scoped styles

### Disadvantages:
- Runtime overhead
- Larger bundle sizes
- Learning curve for CSS-in-JS syntax

## Tailwind CSS

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes.

### Advantages:
- No runtime overhead
- Consistent design system
- Rapid development
- Small production builds

### Disadvantages:
- HTML can become verbose
- Learning utility class names
- Less dynamic styling options

## Making the Choice

Consider CSS-in-JS when:
- You need highly dynamic styles
- Component-level styling is important
- Your team prefers JavaScript-based solutions

Consider Tailwind CSS when:
- Performance is critical
- You want a consistent design system
- Rapid prototyping is important

## Conclusion

Both approaches have their merits. Choose based on your project requirements, team preferences, and performance constraints.
    `,
    image: "/images/blog-5.png",
    tags: ["CSS", "Tailwind CSS", "Styled Components", "Frontend"],
    author: "Alex Chen",
    publishedDate: "2024-04-02",
    readTime: "5 min read",
    featured: false,
  },
];
