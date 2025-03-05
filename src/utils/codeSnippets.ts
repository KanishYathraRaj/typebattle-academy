// Collection of algorithm code snippets for typing tests
export type CodeSnippet = {
  id: string;
  algorithm: string;
  language: string;
  code: string;
  description: string;
};

// Define a consistent set of algorithms and languages
const algorithmTypes = [
  'Binary Search',
  'Merge Sort',
  'Quick Sort',
  'Depth-First Search',
  'Breadth-First Search',
  'Dijkstra\'s Algorithm',
  'Floyd-Warshall Algorithm',
  'Dynamic Programming - Fibonacci',
  'Knapsack Problem'
];

const languageTypes = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'];

// Create a map for storing descriptions to keep them consistent
const algorithmDescriptions: Record<string, string> = {
  'Binary Search': 'Efficiently finds an item in a sorted array by repeatedly dividing the search space in half.',
  'Merge Sort': 'A divide-and-conquer algorithm that divides the array, sorts the subarrays, and merges them back.',
  'Quick Sort': 'A fast, divide-and-conquer algorithm that partitions array and recursively sorts partitions.',
  'Depth-First Search': 'Graph traversal algorithm that explores as far as possible along each branch before backtracking.',
  'Breadth-First Search': 'Graph traversal algorithm that explores all neighbors at present depth before moving to nodes at next depth.',
  'Dijkstra\'s Algorithm': 'Finds the shortest paths between nodes in a graph, which may represent, for example, road networks.',
  'Floyd-Warshall Algorithm': 'An algorithm for finding shortest paths in a weighted graph with positive or negative edge weights.',
  'Dynamic Programming - Fibonacci': 'Dynamic programming approach to calculate Fibonacci numbers, avoiding redundant calculations.',
  'Knapsack Problem': 'A problem in combinatorial optimization to find the most valuable combination of items that fit in a knapsack.'
};

// Define all implementations
const implementations: Record<string, Record<string, string>> = {
  'Binary Search': {
    'JavaScript': `function binarySearch(arr, target) {
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
    'TypeScript': `function binarySearch<T>(arr: T[], target: T): number {
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
    'Python': `def binary_search(arr, target):
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
    'Java': `public static int binarySearch(int[] arr, int target) {
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
    'C++': `int binarySearch(vector<int>& arr, int target) {
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
}`
  },
  'Merge Sort': {
    'JavaScript': `function mergeSort(arr) {
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
    'TypeScript': `function mergeSort<T>(arr: T[]): T[] {
  if (arr.length <= 1) {
    return arr;
  }
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge<T>(left: T[], right: T[]): T[] {
  let result: T[] = [];
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
    'Python': `def merge_sort(arr):
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
    'Java': `public static void mergeSort(int[] arr, int left, int right) {
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
    'C++': `void merge(vector<int>& arr, int left, int mid, int right) {
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
}`
  },
  'Quick Sort': {
    'JavaScript': `function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];
  
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
    'TypeScript': `function quickSort<T>(arr: T[]): T[] {
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
    'Python': `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)`,
    'Java': `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

public static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    return i + 1;
}`,
    'C++': `void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    
    swap(arr[i + 1], arr[high]);
    return i + 1;
}`
  },
  'Depth-First Search': {
    'JavaScript': `function depthFirstSearch(graph, start, visited = {}) {
  visited[start] = true;
  console.log(start);
  
  for (let neighbor of graph[start]) {
    if (!visited[neighbor]) {
      depthFirstSearch(graph, neighbor, visited);
    }
  }
  
  return visited;
}`,
    'TypeScript': `function depthFirstSearch(graph: Record<string, string[]>, start: string, visited: Record<string, boolean> = {}): Record<string, boolean> {
  visited[start] = true;
  console.log(start);
  
  for (let neighbor of graph[start]) {
    if (!visited[neighbor]) {
      depthFirstSearch(graph, neighbor, visited);
    }
  }
  
  return visited;
}`,
    'Python': `def depth_first_search(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    print(start)
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            depth_first_search(graph, neighbor, visited)
    
    return visited`,
    'Java': `public static void depthFirstSearch(Map<String, List<String>> graph, String start, Set<String> visited) {
    if (visited == null) {
        visited = new HashSet<>();
    }
    
    visited.add(start);
    System.out.println(start);
    
    for (String neighbor : graph.get(start)) {
        if (!visited.contains(neighbor)) {
            depthFirstSearch(graph, neighbor, visited);
        }
    }
}`,
    'C++': `void depthFirstSearch(unordered_map<string, vector<string>>& graph, string start, unordered_map<string, bool>& visited) {
    visited[start] = true;
    cout << start << endl;
    
    for (const string& neighbor : graph[start]) {
        if (!visited[neighbor]) {
            depthFirstSearch(graph, neighbor, visited);
        }
    }
}`
  },
  'Breadth-First Search': {
    'JavaScript': `function breadthFirstSearch(graph, start) {
  const visited = {};
  const queue = [start];
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
    'TypeScript': `function breadthFirstSearch(graph: Record<string, string[]>, start: string): Record<string, boolean> {
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
    'Python': `def breadth_first_search(graph, start):
    visited = set([start])
    queue = [start]
    
    while queue:
        vertex = queue.pop(0)
        print(vertex)
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return visited`,
    'Java': `public static void breadthFirstSearch(Map<String, List<String>> graph, String start) {
    Set<String> visited = new HashSet<>();
    Queue<String> queue = new LinkedList<>();
    
    visited.add(start);
    queue.add(start);
    
    while (!queue.isEmpty()) {
        String vertex = queue.poll();
        System.out.println(vertex);
        
        for (String neighbor : graph.get(vertex)) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.add(neighbor);
            }
        }
    }
}`,
    'C++': `void breadthFirstSearch(unordered_map<string, vector<string>>& graph, string start) {
    unordered_map<string, bool> visited;
    queue<string> q;
    
    visited[start] = true;
    q.push(start);
    
    while (!q.empty()) {
        string vertex = q.front();
        q.pop();
        cout << vertex << endl;
        
        for (const string& neighbor : graph[vertex]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`
  },
  'Dijkstra\'s Algorithm': {
    'JavaScript': `function dijkstra(graph, start) {
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
    'TypeScript': `function dijkstra(graph: Record<string, Record<string, number>>, start: string): { 
  distances: Record<string, number>; 
  previous: Record<string, string | null> 
} {
  const distances: Record<string, number> = {};
  const visited: Record<string, boolean> = {};
  const previous: Record<string, string | null> = {};
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
    const closest = nodes.shift()!;
    
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
    'Python': `def dijkstra(graph, start):
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0
    unvisited = list(graph.keys())
    visited = set()
    previous = {node: None for node in graph}
    
    while unvisited:
        current = min(unvisited, key=lambda node: distances[node])
        
        if distances[current] == float('infinity'):
            break
            
        unvisited.remove(current)
        visited.add(current)
        
        for neighbor, weight in graph[current].items():
            if neighbor in visited:
                continue
                
            new_distance = distances[current] + weight
            
            if new_distance < distances[neighbor]:
                distances[neighbor] = new_distance
                previous[neighbor] = current
    
    return distances, previous`,
    'Java': `public static Map<String, Integer> dijkstra(Map<String, Map<String, Integer>> graph, String start) {
    Map<String, Integer> distances = new HashMap<>();
    Map<String, String> previous = new HashMap<>();
    Set<String> visited = new HashSet<>();
    PriorityQueue<Node> queue = new PriorityQueue<>(Comparator.comparing(node -> node.distance));
    
    // Initialize distances
    for (String vertex : graph.keySet()) {
        distances.put(vertex, Integer.MAX_VALUE);
        previous.put(vertex, null);
    }
    
    distances.put(start, 0);
    queue.add(new Node(start, 0));
    
    while (!queue.isEmpty()) {
        Node current = queue.poll();
        
        if (visited.contains(current.vertex)) continue;
        
        visited.add(current.vertex);
        
        for (Map.Entry<String, Integer> neighbor : graph.get(current.vertex).entrySet()) {
            if (visited.contains(neighbor.getKey())) continue;
            
            int newDistance = distances.get(current.vertex) + neighbor.getValue();
            
            if (newDistance < distances.get(neighbor.getKey())) {
                distances.put(neighbor.getKey(), newDistance);
                previous.put(neighbor.getKey(), current.vertex);
                queue.add(new Node(neighbor.getKey(), newDistance));
            }
        }
    }
    
    return distances;
}

static class Node {
    String vertex;
    int distance;
    
    Node(String vertex, int distance) {
        this.vertex = vertex;
        this.distance = distance;
    }
}`,
    'C++': `void dijkstra(const unordered_map<string, unordered_map<string, int>>& graph, const string& start) {
    unordered_map<string, int> distances;
    unordered_map<string, string> previous;
    unordered_set<string> visited;
    vector<string> nodes;
    
    // Initialize
    for (const auto& pair : graph) {
        distances[pair.first] = INT_MAX;
        previous[pair.first] = "";
        nodes.push_back(pair.first);
    }
    distances[start] = 0;
    
    while (!nodes.empty()) {
        // Find closest unvisited node
        auto it = min_element(nodes.begin(), nodes.end(), 
                             [&distances](const string& a, const string& b) {
                                 return distances[a] < distances[b];
                             });
        
        string current = *it;
        nodes.erase(it);
        
        if (distances[current] == INT_MAX) break;
        
        visited.insert(current);
        
        // Update neighbors
        for (const auto& neighbor : graph.at(current)) {
            if (visited.count(neighbor.first)) continue;
            
            int newDistance = distances[current] + neighbor.second;
            
            if (newDistance < distances[neighbor.first]) {
                distances[neighbor.first] = newDistance;
                previous[neighbor.first] = current;
            }
        }
    }
    
    // Print results
    for (const auto& pair : distances) {
        cout << "Distance to " << pair.first << ": " << pair.second << endl;
    }
}`
  },
  'Floyd-Warshall Algorithm': {
    'JavaScript': `function floydWarshall(graph) {
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
    'TypeScript': `function floydWarshall(graph: number[][]): number[][] {
  const dist: number[][] = JSON.parse(JSON.stringify(graph)); // Deep copy
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
    'Python': `def floyd_warshall(graph):
    n = len(graph)
    dist = [row[:] for row in graph]  # Create a copy of the graph
    
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    
    return dist`,
    'Java': `public static int[][] floydWarshall(int[][] graph) {
    int n = graph.length;
    int[][] dist = new int[n][n];
    
    // Initialize the distance matrix
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            dist[i][j] = graph[i][j];
        }
    }
    
    // Update distances
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    
    return dist;
}`,
    'C++': `vector<vector<int>> floydWarshall(const vector<vector<int>>& graph) {
    int n = graph.size();
    vector<vector<int>> dist = graph; // Create a copy
    
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    
    return dist;
}`
  },
  'Dynamic Programming - Fibonacci': {
    'JavaScript': `function fibonacci(n, memo = {}) {
  if (n <= 1) {
    return n;
  }
  
  if (memo[n]) {
    return memo[n];
  }
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}`,
    'TypeScript': `function fibonacci(n: number, memo: Record<number, number> = {}): number {
  if (n <= 1) {
    return n;
  }
  
  if (memo[n]) {
    return memo[n];
  }
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}`,
    'Python': `def fibonacci(n, memo={}):
    if n <= 1:
        return n
    
    if n not in memo:
        memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
    
    return memo[n]`,
    'Java': `public static int fibonacci(int n, Map<Integer, Integer> memo) {
    if (n <= 1) {
        return n;
    }
    
    if (memo.containsKey(n)) {
        return memo.get(n);
    }
    
    int result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    memo.put(n, result);
    
    return result;
}`,
    'C++': `int fibonacci(int n, unordered_map<int, int>& memo) {
    if (n <= 1) {
        return n;
    }
    
    if (memo.find(n) != memo.end()) {
        return memo[n];
    }
    
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}`
  },
  'Knapsack Problem': {
    'JavaScript': `function knapsack(weights, values, capacity) {
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
    'TypeScript': `function knapsack(weights: number[], values: number[], capacity: number): number {
  const n = weights.length;
  const dp: number[][] = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
  
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
    'Python': `def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(
                    values[i-1] + dp[i-1][w-weights[i-1]],
                    dp[i-1][w]
                )
            else:
                dp[i][w] = dp[i-1][w]
    
    return dp[n][capacity]`,
    'Java': `public static int knapsack(int[] weights, int[] values, int capacity) {
    int n = weights.length;
    int[][] dp = new int[n + 1][capacity + 1];
    
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
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
    'C++': `int knapsack(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    return dp[n][capacity];
}`
  }
};

// Generate the code snippets array from our structured data
const codeSnippets: CodeSnippet[] = [];

// For each algorithm and language combination, create a code snippet
algorithmTypes.forEach(algorithm => {
  languageTypes.forEach(language => {
    // Skip if implementation doesn't exist
    if (!implementations[algorithm] || !implementations[algorithm][language]) {
      return;
    }

    codeSnippets.push({
      id: `${algorithm.toLowerCase().replace(/\s+/g, '-')}-${language.toLowerCase()}`,
      algorithm,
      language,
      code: implementations[algorithm][language],
      description: algorithmDescriptions[algorithm]
    });
  });
});

// Helper functions that work with the snippets

// Get available algorithms
export const getAlgorithms = (): string[] => {
  return algorithmTypes;
};

// Get available languages
export const getLanguages = (): string[] => {
  return languageTypes;
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

// Get a specific code snippet
export const getCodeSnippet = (algorithm: string, language: string): CodeSnippet | undefined => {
  return codeSnippets.find(snippet => 
    snippet.algorithm === algorithm && snippet.language === language
  );
};

// Get a random code snippet, but respecting algorithm and language filters
export const getRandomCodeSnippet = (algorithm?: string, language?: string): CodeSnippet => {
  const filteredSnippets = getCodeSnippets(algorithm, language);
  
  if (filteredSnippets.length === 0) {
    // If no snippets match the criteria, return a random one from all snippets
    return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  }
  
  return filteredSnippets[Math.floor(Math.random() * filteredSnippets.length)];
};

// Get a specific code snippet by ID
export const getCodeSnippetById = (id: string): CodeSnippet | undefined => {
  return codeSnippets.find(snippet => snippet.id === id);
};
