
-- Concepts table (stored knowledge)
CREATE TABLE public.concepts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL,
  domain TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  explanation TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Syllabus table (teacher preloaded content)
CREATE TABLE public.syllabus (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL,
  domain TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  explanation TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE public.concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.syllabus ENABLE ROW LEVEL SECURITY;

-- Public read/write for hackathon demo (no auth required)
CREATE POLICY "Public read concepts" ON public.concepts FOR SELECT USING (true);
CREATE POLICY "Public insert concepts" ON public.concepts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read syllabus" ON public.syllabus FOR SELECT USING (true);

-- Seed initial concepts
INSERT INTO public.concepts (topic, domain, difficulty, explanation) VALUES
('Binary Search', 'Data Structures & Algorithms', 'intermediate', 'Binary search finds the position of a target value within a sorted array. It compares the target to the middle element and eliminates half of the remaining elements each step, achieving O(log n) time complexity.'),
('Photosynthesis', 'Biology', 'beginner', 'Photosynthesis is the process by which green plants convert sunlight, water, and carbon dioxide into glucose and oxygen. It occurs in chloroplasts and is essential for life on Earth.'),
('Newton''s Laws of Motion', 'Physics', 'beginner', 'Newton''s three laws describe the relationship between a body and the forces acting upon it. First law: inertia. Second law: F=ma. Third law: every action has an equal and opposite reaction.'),
('TCP/IP Model', 'Computer Networks', 'intermediate', 'The TCP/IP model is a four-layer networking framework: Application, Transport, Internet, and Network Access. It defines how data is packetized, addressed, transmitted, routed, and received.'),
('Recursion', 'Data Structures & Algorithms', 'intermediate', 'Recursion is a method where a function calls itself. It requires a base case and is commonly used in tree traversals, divide-and-conquer, and dynamic programming.'),
('Ohm''s Law', 'Physics', 'beginner', 'Ohm''s Law states that current through a conductor is directly proportional to voltage: V = IR, where V is voltage, I is current, and R is resistance.'),
('DNA Replication', 'Biology', 'advanced', 'DNA replication produces two identical replicas from one original molecule. It involves helicase unwinding, primase adding RNA primers, DNA polymerase synthesizing strands, and ligase sealing fragments.'),
('Hash Tables', 'Data Structures & Algorithms', 'intermediate', 'A hash table maps keys to values using a hash function. It provides average O(1) time for insertions, deletions, and lookups. Collision resolution strategies include chaining and open addressing.');

-- Seed syllabus data
INSERT INTO public.syllabus (topic, domain, difficulty, explanation) VALUES
('Graph Traversal (BFS/DFS)', 'Data Structures & Algorithms', 'advanced', 'BFS explores all neighbors at current depth before moving deeper using a queue. DFS explores as far as possible along each branch before backtracking using a stack or recursion.'),
('Electromagnetic Induction', 'Physics', 'advanced', 'Electromagnetic induction is the production of an EMF across a conductor in a changing magnetic field, as described by Faraday''s law. It is the principle behind transformers and generators.'),
('Cell Division – Mitosis', 'Biology', 'intermediate', 'Mitosis is cell division producing two genetically identical daughter cells. It consists of prophase, metaphase, anaphase, telophase, followed by cytokinesis.'),
('HTTP Protocol', 'Computer Networks', 'beginner', 'HTTP is an application-layer protocol for transmitting hypermedia documents. It follows a request-response model using methods like GET, POST, PUT, and DELETE.'),
('Sorting Algorithms', 'Data Structures & Algorithms', 'intermediate', 'Sorting algorithms arrange elements in order. Common ones include Bubble Sort O(n²), Merge Sort O(n log n), and Quick Sort O(n log n) average.');
