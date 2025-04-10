import DreamEntry from '~/components/dream-entry'

interface DreamPostProps {
  params: { id: string }
}

// Mock data for development
const mockDream = {
  userId: 'user123',
  content:
    'I had a dream about flying over mountains and meeting a friendly dragon. The sky was painted in beautiful shades of purple and orange, and the dragon had scales that shimmered like precious gems.',
  mood: 'excited',
  tags: ['mountains', 'dragon', 'flying', 'adventure'],
  aiAnalysis:
    'This dream suggests a sense of freedom and adventure, with the dragon representing untapped potential. The vibrant colors indicate a period of creativity and inspiration in your waking life.',
  id: 'dream123',
  owner: 'user123',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  date: new Date().toISOString()
}

export default function DreamPost({ params }: DreamPostProps) {
  return <DreamEntry dream={mockDream} />
}
