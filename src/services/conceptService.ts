import { Concept, Stats, SyncResult } from "@/types";
import { initialConcepts, syllabusData } from "@/data/concepts";

const STORAGE_KEY = "educache_concepts";

function loadConcepts(): Concept[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [...initialConcepts];
    }
  }
  const initial = [...initialConcepts];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function saveConcepts(concepts: Concept[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(concepts));
}

export function getConcepts(): Concept[] {
  return loadConcepts();
}

export function getStats(): Stats {
  const concepts = loadConcepts();
  const domains = new Set(concepts.map((c) => c.domain));
  const distribution = { beginner: 0, intermediate: 0, advanced: 0 };
  concepts.forEach((c) => distribution[c.difficulty]++);

  return {
    totalConcepts: concepts.length,
    domainsAvailable: domains.size,
    storageUsedKB: parseFloat((concepts.length * 1.5).toFixed(1)),
    difficultyDistribution: distribution,
  };
}

export function syncSyllabus(): SyncResult {
  const concepts = loadConcepts();
  const existingTopics = new Set(concepts.map((c) => c.topic));
  const toAdd = syllabusData.filter((s) => !existingTopics.has(s.topic));

  const updated = [...concepts, ...toAdd];
  saveConcepts(updated);

  return {
    added: toAdd.length,
    duplicates: syllabusData.length - toAdd.length,
  };
}
