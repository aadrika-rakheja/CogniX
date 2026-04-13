// Sample questions for different topics
const sampleQuestions = [
  // Sorting questions
  {
    topic: "sorting",
    question: "Which sorting algorithm has the best average time complexity?",
    options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"],
    answer: "Quick Sort"
  },
  {
    topic: "sorting",
    question: "What is the time complexity of Bubble Sort in worst case?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    answer: "O(n²)"
  },
  {
    topic: "sorting",
    question: "Which sorting algorithm is stable?",
    options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"],
    answer: "Merge Sort"
  },

  // Tree questions
  {
    topic: "tree",
    question: "What is the maximum number of nodes in a binary tree of height h?",
    options: ["2^h", "2^(h+1) - 1", "h^2", "2h"],
    answer: "2^(h+1) - 1"
  },
  {
    topic: "tree",
    question: "Which traversal visits the root node first?",
    options: ["Inorder", "Preorder", "Postorder", "Level Order"],
    answer: "Preorder"
  },
  {
    topic: "tree",
    question: "What is a leaf node?",
    options: ["Root node", "Node with no children", "Node with two children", "Parent node"],
    answer: "Node with no children"
  },

  // Memory/Big-O questions
  {
    topic: "memory",
    question: "What does O(1) time complexity mean?",
    options: ["Linear time", "Constant time", "Quadratic time", "Logarithmic time"],
    answer: "Constant time"
  },
  {
    topic: "memory",
    question: "Which of these has O(log n) time complexity?",
    options: ["Linear Search", "Binary Search", "Bubble Sort", "Selection Sort"],
    answer: "Binary Search"
  },
  {
    topic: "memory",
    question: "What is the space complexity of an algorithm that uses a fixed-size array?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    answer: "O(1)"
  }
];

export default sampleQuestions;