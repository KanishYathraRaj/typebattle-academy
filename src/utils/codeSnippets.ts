
// Collection of algorithm code snippets for typing tests
export type CodeSnippet = {
  id: string;
  algorithm: string;
  language: string;
  code: string;
  description: string;
};

const codeSnippets: CodeSnippet[] = [
  {
    id: 'binary-search-js',
    algorithm: 'Binary Search',
    language: 'JavaScript',
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // Target not found
}`,
    description: 'Efficiently finds an item in a sorted array by repeatedly dividing the search space in half.',
  },
  {
    id: 'merge-sort-js',
    algorithm: 'Merge Sort',
    language: 'JavaScript',
    code: `function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`,
    description: 'A divide-and-conquer algorithm that divides the array, sorts the subarrays, and merges them back.',
  },
  {
    id: 'binary-search-ts',
    algorithm: 'Binary Search',
    language: 'TypeScript',
    code: `function binarySearch<T>(arr: T[], target: T): number {
  let left: number = 0;
  let right: number = arr.length - 1;
  
  while (left <= right) {
    const mid: number = left + Math.floor((right - left) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // Target not found
}`,
    description: 'Efficiently finds an item in a sorted array by repeatedly dividing the search space in half.',
  },
  {
    id: 'dijkstra-js',
    algorithm: 'Dijkstra\'s Algorithm',
    language: 'JavaScript',
    code: `function dijkstra(graph, start) {
  const distances = {};
  const visited = {};
  const previous = {};
  const nodes = Object.keys(graph);
  
  // Initialize distances
  for (let node of nodes) {
    distances[node] = Infinity;
    previous[node] = null;
  }
  distances[start] = 0;
  
  while (nodes.length) {
    // Find unvisited node with minimum distance
    nodes.sort((a, b) => distances[a] - distances[b]);
    const closest = nodes.shift();
    
    if (distances[closest] === Infinity) break;
    
    visited[closest] = true;
    
    // Update distances to neighbors
    for (let neighbor in graph[closest]) {
      if (visited[neighbor]) continue;
      
      const newDistance = distances[closest] + graph[closest][neighbor];
      
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previous[neighbor] = closest;
      }
    }
  }
  
  return { distances, previous };
}`,
    description: 'Finds the shortest paths between nodes in a graph, which may represent, for example, road networks.',
  },
  {
    id: 'quick-sort-ts',
    algorithm: 'Quick Sort',
    language: 'TypeScript',
    code: `function quickSort<T>(arr: T[]): T[] {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot: T = arr[Math.floor(arr.length / 2)];
  const left: T[] = [];
  const right: T[] = [];
  const equal: T[] = [];
  
  for (let val of arr) {
    if (val < pivot) {
      left.push(val);
    } else if (val > pivot) {
      right.push(val);
    } else {
      equal.push(val);
    }
  }
  
  return [...quickSort(left), ...equal, ...quickSort(right)];
}`,
    description: 'A fast, divide-and-conquer algorithm that partitions array and recursively sorts partitions.',
  },
  {
    id: 'depth-first-search-js',
    algorithm: 'Depth-First Search',
    language: 'JavaScript',
    code: `function depthFirstSearch(graph, start, visited = {}) {
  visited[start] = true;
  console.log(start);
  
  for (let neighbor of graph[start]) {
    if (!visited[neighbor]) {
      depthFirstSearch(graph, neighbor, visited);
    }
  }
  
  return visited;
}`,
    description: 'Graph traversal algorithm that explores as far as possible along each branch before backtracking.',
  },
  {
    id: 'breadth-first-search-ts',
    algorithm: 'Breadth-First Search',
    language: 'TypeScript',
    code: `function breadthFirstSearch(graph: Record<string, string[]>, start: string): Record<string, boolean> {
  const visited: Record<string, boolean> = {};
  const queue: string[] = [start];
  visited[start] = true;
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    console.log(vertex);
    
    for (let neighbor of graph[vertex]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
  }
  
  return visited;
}`,
    description: 'Graph traversal algorithm that explores all neighbors at present depth before moving to nodes at next depth.',
  },
  {
    id: 'floyd-warshall-js',
    algorithm: 'Floyd-Warshall Algorithm',
    language: 'JavaScript',
    code: `function floydWarshall(graph) {
  const dist = [...graph];
  const n = graph.length;
  
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  
  return dist;
}`,
    description: 'An algorithm for finding shortest paths in a weighted graph with positive or negative edge weights.',
  },
  {
    id: 'dynamic-programming-fibonacci-ts',
    algorithm: 'Dynamic Programming - Fibonacci',
    language: 'TypeScript',
    code: `function fibonacci(n: number, memo: Record<number, number> = {}): number {
  if (n <= 1) {
    return n;
  }
  
  if (memo[n]) {
    return memo[n];
  }
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}`,
    description: 'Dynamic programming approach to calculate Fibonacci numbers, avoiding redundant calculations.',
  },
  {
    id: 'knapsack-problem-js',
    algorithm: 'Knapsack Problem',
    language: 'JavaScript',
    code: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  
  return dp[n][capacity];
}`,
    description: 'A problem in combinatorial optimization to find the most valuable combination of items that fit in a knapsack.',
  },
  // Adding Python snippets
  {
    id: 'binary-search-python',
    algorithm: 'Binary Search',
    language: 'Python',
    code: `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # Target not found`,
    description: 'Efficiently finds an item in a sorted array by repeatedly dividing the search space in half.',
  },
  {
    id: 'merge-sort-python',
    algorithm: 'Merge Sort',
    language: 'Python',
    code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    left_idx, right_idx = 0, 0
    
    while left_idx < len(left) and right_idx < len(right):
        if left[left_idx] < right[right_idx]:
            result.append(left[left_idx])
            left_idx += 1
        else:
            result.append(right[right_idx])
            right_idx += 1
    
    result.extend(left[left_idx:])
    result.extend(right[right_idx:])
    return result`,
    description: 'A divide-and-conquer algorithm that divides the array, sorts the subarrays, and merges them back.',
  },
  {
    id: 'quick-sort-python',
    algorithm: 'Quick Sort',
    language: 'Python',
    code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)`,
    description: 'A fast, divide-and-conquer algorithm that partitions array and recursively sorts partitions.',
  },
  // Adding Java snippets
  {
    id: 'binary-search-java',
    algorithm: 'Binary Search',
    language: 'Java',
    code: `public static int binarySearch(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        }
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1; // Target not found
}`,
    description: 'Efficiently finds an item in a sorted array by repeatedly dividing the search space in half.',
  },
  {
    id: 'merge-sort-java',
    algorithm: 'Merge Sort',
    language: 'Java',
    code: `public static void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        merge(arr, left, mid, right);
    }
}

public static void merge(int[] arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    int[] L = new int[n1];
    int[] R = new int[n2];
    
    for (int i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }
    for (int j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j];
    }
    
    int i = 0, j = 0;
    int k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}`,
    description: 'A divide-and-conquer algorithm that divides the array, sorts the subarrays, and merges them back.',
  },
  // Adding C++ snippets
  {
    id: 'binary-search-cpp',
    algorithm: 'Binary Search',
    language: 'C++',
    code: `int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        }
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1; // Target not found
}`,
    description: 'Efficiently finds an item in a sorted array by repeatedly dividing the search space in half.',
  },
  {
    id: 'merge-sort-cpp',
    algorithm: 'Merge Sort',
    language: 'C++',
    code: `void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    vector<int> L(n1), R(n2);
    
    for (int i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }
    for (int j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j];
    }
    
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        merge(arr, left, mid, right);
    }
}`,
    description: 'A divide-and-conquer algorithm that divides the array, sorts the subarrays, and merges them back.',
  }
];

// Get available algorithms
export const getAlgorithms = (): string[] => {
  return [...new Set(codeSnippets.map(snippet => snippet.algorithm))];
};

// Get available languages
export const getLanguages = (): string[] => {
  return [...new Set(codeSnippets.map(snippet => snippet.language))];
};

// Get all code snippets for a specific algorithm and language
export const getCodeSnippets = (algorithm?: string, language?: string): CodeSnippet[] => {
  let filteredSnippets = [...codeSnippets];
  
  if (algorithm) {
    filteredSnippets = filteredSnippets.filter(snippet => snippet.algorithm === algorithm);
  }
  
  if (language) {
    filteredSnippets = filteredSnippets.filter(snippet => snippet.language === language);
  }
  
  return filteredSnippets;
};

// Get a random code snippet
export const getRandomCodeSnippet = (algorithm?: string, language?: string): CodeSnippet => {
  let filteredSnippets = getCodeSnippets(algorithm, language);
  
  if (filteredSnippets.length === 0) {
    return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  }
  
  return filteredSnippets[Math.floor(Math.random() * filteredSnippets.length)];
};

// Get a specific code snippet by ID
export const getCodeSnippet = (id: string): CodeSnippet | undefined => {
  return codeSnippets.find(snippet => snippet.id === id);
};
