// Custom User Benchmark & Challenge Service

export interface CustomBenchmark {
  id: string;
  title: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  description: string;
  initialCode: string;
  testAssertions: string;
  timeoutSeconds: number;
  createdAt: number;
  author: string;
}

const STORAGE_KEY = "agent_arena_custom_benchmarks";

export const PRESET_CUSTOM_BENCHMARKS: CustomBenchmark[] = [
  {
    id: "custom-jwt-expiration-check",
    title: "Fix JWT Expiration & Replay Attack",
    category: "Auth Security",
    difficulty: "Medium",
    description: "The decodeJwtToken function fails to validate the exp claim against current timestamp. Refactor to enforce expiration and reject expired signatures.",
    initialCode: `function decodeAndVerifyJwt(token, secret) {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const payload = JSON.parse(atob(parts[1]));
  // BUG: Missing expiration check: Date.now() / 1000 > payload.exp
  return payload;
}`,
    testAssertions: `
      const expiredPayload = { user: 'alice', exp: Math.floor(Date.now() / 1000) - 60 };
      const token = 'header.' + btoa(JSON.stringify(expiredPayload)) + '.sig';
      expect(decodeAndVerifyJwt(token, 'secret')).toBeNull();
    `,
    timeoutSeconds: 180,
    createdAt: Date.now() - 86400000,
    author: "Community"
  },
  {
    id: "custom-sliding-window-rate-limit",
    title: "Implement Sliding-Window Rate Limiter",
    category: "Distributed Systems",
    difficulty: "Hard",
    description: "Write a high-throughput sliding window rate limiter that handles concurrent bursts and cleans up expired timestamp windows.",
    initialCode: `class SlidingWindowLimiter {
  constructor(limit = 10, windowMs = 1000) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.hits = [];
  }
  allow() {
    const now = Date.now();
    this.hits = this.hits.filter(t => now - t < this.windowMs);
    if (this.hits.length >= this.limit) return false;
    this.hits.push(now);
    return true;
  }
}`,
    testAssertions: `
      const limiter = new SlidingWindowLimiter(5, 1000);
      let allowed = 0;
      for (let i = 0; i < 10; i++) {
        if (limiter.allow()) allowed++;
      }
      expect(allowed).toBe(5);
    `,
    timeoutSeconds: 240,
    createdAt: Date.now() - 172800000,
    author: "Community"
  },
  {
    id: "custom-circuit-breaker-state-machine",
    title: "State-Machine Circuit Breaker with Jittered Backoff",
    category: "Fault Tolerance & Resilience",
    difficulty: "Hard",
    description: "A service client's Circuit Breaker state machine incorrectly stays in OPEN state indefinitely or fails to transition through HALF-OPEN to test downstream recovery. Refactor the CircuitBreaker class to track failure counts, enforce a cooldown before entering HALF-OPEN, and successfully reset to CLOSED upon consecutive successes.",
    initialCode: `class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 3;
    this.recoveryThreshold = options.recoveryThreshold || 2;
    this.cooldownMs = options.cooldownMs || 1000;
    this.state = "CLOSED"; // CLOSED, OPEN, HALF-OPEN
    this.failureCount = 0;
    this.successCount = 0;
    this.lastFailureTime = 0;
  }

  recordSuccess() {
    this.failureCount = 0;
    if (this.state === "HALF-OPEN") {
      this.successCount++;
      if (this.successCount >= this.recoveryThreshold) {
        this.state = "CLOSED";
        this.successCount = 0;
      }
    }
  }

  recordFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    this.successCount = 0;
    if (this.failureCount >= this.failureThreshold) {
      this.state = "OPEN";
    }
  }

  canExecute() {
    if (this.state === "OPEN") {
      // Check if cooldown has elapsed to attempt recovery in HALF-OPEN
      if (Date.now() - this.lastFailureTime >= this.cooldownMs) {
        this.state = "HALF-OPEN";
        return true;
      }
      return false;
    }
    return true;
  }
}`,
    testAssertions: `
      const cb = new CircuitBreaker({ failureThreshold: 3, recoveryThreshold: 2, cooldownMs: 100 });
      expect(cb.canExecute()).toBe(true);

      // 3 failures trips breaker to OPEN
      cb.recordFailure();
      cb.recordFailure();
      cb.recordFailure();
      expect(cb.state).toBe("OPEN");
      expect(cb.canExecute()).toBe(false);

      // Simulate cooldown passing
      cb.lastFailureTime = Date.now() - 150;
      expect(cb.canExecute()).toBe(true);
      expect(cb.state).toBe("HALF-OPEN");

      // 2 successes in HALF-OPEN recovers to CLOSED
      cb.recordSuccess();
      cb.recordSuccess();
      expect(cb.state).toBe("CLOSED");
    `,
    timeoutSeconds: 240,
    createdAt: Date.now() - 3600000,
    author: "Agent Arena Core"
  },
  {
    id: "custom-lfu-cache-ttl",
    title: "O(1) LFU (Least Frequently Used) Cache with TTL",
    category: "High-Throughput Algorithms",
    difficulty: "Expert",
    description: "Construct an in-memory LFU cache with capacity eviction and TTL support. The cache must track frequency counts, evict the least frequently used key when full (breaking ties by least recently used), and return null for expired keys.",
    initialCode: `class LFUCache {
  constructor(capacity = 3, defaultTtlMs = 5000) {
    this.capacity = capacity;
    this.defaultTtlMs = defaultTtlMs;
    this.cache = new Map(); // key -> { value, freq, expiry, lastAccess }
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    entry.freq++;
    entry.lastAccess = Date.now();
    return entry.value;
  }

  set(key, value, ttlMs) {
    if (this.capacity <= 0) return;

    if (this.cache.has(key)) {
      const entry = this.cache.get(key);
      entry.value = value;
      entry.freq++;
      entry.lastAccess = Date.now();
      entry.expiry = Date.now() + (ttlMs || this.defaultTtlMs);
      return;
    }

    if (this.cache.size >= this.capacity) {
      let minFreq = Infinity;
      let oldestAccess = Infinity;
      let evictKey = null;

      for (const [k, v] of this.cache.entries()) {
        if (v.freq < minFreq || (v.freq === minFreq && v.lastAccess < oldestAccess)) {
          minFreq = v.freq;
          oldestAccess = v.lastAccess;
          evictKey = k;
        }
      }

      if (evictKey) this.cache.delete(evictKey);
    }

    const expiry = Date.now() + (ttlMs || this.defaultTtlMs);
    this.cache.set(key, { value, freq: 1, expiry, lastAccess: Date.now() });
  }
}`,
    testAssertions: `
      const lfu = new LFUCache(2, 1000);
      lfu.set("a", 1);
      lfu.set("b", 2);

      // Access 'a' so freq('a') > freq('b')
      lfu.get("a");
      lfu.get("a");

      // Inserting 'c' should evict 'b' (lowest freq)
      lfu.set("c", 3);
      expect(lfu.get("b")).toBeNull();
      expect(lfu.get("a")).toBe(1);
      expect(lfu.get("c")).toBe(3);

      // Test TTL expiration
      lfu.set("temp", 99, 50);
      const entry = lfu.cache.get("temp");
      if (entry) entry.expiry = Date.now() - 10;
      expect(lfu.get("temp")).toBeNull();
    `,
    timeoutSeconds: 300,
    createdAt: Date.now() - 1800000,
    author: "Agent Arena Core"
  }
];

export function getCustomBenchmarks(): CustomBenchmark[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) return parsed;
    }
  } catch {}
  return PRESET_CUSTOM_BENCHMARKS;
}

export function saveCustomBenchmark(benchmark: CustomBenchmark) {
  const list = getCustomBenchmarks();
  const index = list.findIndex(b => b.id === benchmark.id);
  if (index >= 0) {
    list[index] = benchmark;
  } else {
    list.unshift(benchmark);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function deleteCustomBenchmark(id: string) {
  const list = getCustomBenchmarks().filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
