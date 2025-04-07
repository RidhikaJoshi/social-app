"use client"

import { useState, useEffect,useRef } from "react"
import { Bell, Heart, MessageSquare, Search, Share2, X, Plus, LogOut, Twitter, Facebook, Send, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ToastContainer, toast } from 'react-toastify';
import { cn } from "@/lib/utils"

// Mock data for posts with Unsplash images
const initialPosts = [
  {
    id: 1,
    author: {
      name: "Samantha Lee",
      username: "samlee",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    },
    content: "Beautiful day for a hike! 🏔️ #nature #outdoors",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
    timestamp: "4 hours ago",
    likes: 56,
    comments: 8,
    isLiked: false,
    commentsList: [
      {
        id: 1,
        author: {
          name: "Jordan Williams",
          username: "jwilliams",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
        },
        content: "Wow, what a view! Where is this?",
        timestamp: "3 hours ago",
      },
      {
        id: 2,
        author: {
          name: "Priya Patel",
          username: "ppatel",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
        },
        content: "This looks incredible! I need to go there.",
        timestamp: "2 hours ago",
      },
      {
        id: 3,
        author: {
          name: "Alex Johnson",
          username: "alexj",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces",
        },
        content: "Perfect weather for hiking!",
        timestamp: "1 hour ago",
      },
    ],
    showComments: false,
  },
  {
    id: 2,
    author: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces",
    },
    content: "Just finished my latest project! Can't wait to share more details soon. #coding #webdev",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 5,
    isLiked: false,
    commentsList: [
      {
        id: 1,
        author: {
          name: "Samantha Lee",
          username: "samlee",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
        },
        content: "Looks amazing! Can't wait to see more.",
        timestamp: "1 hour ago",
      },
      {
        id: 2,
        author: {
          name: "Marcus Chen",
          username: "mchen",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
        },
        content: "Great work! What technologies did you use?",
        timestamp: "45 minutes ago",
      },
    ],
    showComments: false,
  },
  {
    id: 3,
    author: {
      name: "Priya Patel",
      username: "ppatel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
    },
    content: "Excited to announce I'll be speaking at the tech conference next month! #techconference #speaking",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop",
    timestamp: "8 hours ago",
    likes: 42,
    comments: 7,
    isLiked: false,
    commentsList: [
      {
        id: 1,
        author: {
          name: "Marcus Chen",
          username: "mchen",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
        },
        content: "That's awesome! What will you be speaking about?",
        timestamp: "7 hours ago",
      },
      {
        id: 2,
        author: {
          name: "Jordan Williams",
          username: "jwilliams",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
        },
        content: "Congratulations! Looking forward to it.",
        timestamp: "6 hours ago",
      },
    ],
    showComments: false,
  },
  {
    id: 4,
    author: {
      name: "Marcus Chen",
      username: "mchen",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
    },
    content: "Just read an amazing book on artificial intelligence. Highly recommend! 📚 #AI #reading",
    timestamp: "6 hours ago",
    likes: 18,
    comments: 3,
    isLiked: false,
    commentsList: [
      {
        id: 1,
        author: {
          name: "Alex Johnson",
          username: "alexj",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces",
        },
        content: "What's the title? I've been looking for a good AI book.",
        timestamp: "5 hours ago",
      },
      {
        id: 2,
        author: {
          name: "Samantha Lee",
          username: "samlee",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
        },
        content: "I'd love to borrow it when you're done!",
        timestamp: "4 hours ago",
      },
    ],
    showComments: false,
  },
  {
    id: 5,
    author: {
      name: "Jordan Williams",
      username: "jwilliams",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    },
    content: "Working on a new recipe for dinner tonight. Stay tuned for the results! 🍽️ #cooking #foodie",
    image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop",
    timestamp: "10 hours ago",
    likes: 31,
    comments: 4,
    isLiked: false,
    commentsList: [
      {
        id: 1,
        author: {
          name: "Priya Patel",
          username: "ppatel",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
        },
        content: "Looks delicious! Please share the recipe.",
        timestamp: "9 hours ago",
      },
      {
        id: 2,
        author: {
          name: "Samantha Lee",
          username: "samlee",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
        },
        content: "I'm definitely going to try this!",
        timestamp: "8 hours ago",
      },
    ],
    showComments: false,
  },
]

// Mock data for trending posts
const trendingPosts = [
  {
    id: 1,
    title: "#TechConference2023",
    posts: 5243,
  },
  {
    id: 2,
    title: "#WebDevelopment",
    posts: 3891,
  },
  {
    id: 3,
    title: "#AIInnovation",
    posts: 2567,
  },
  {
    id: 4,
    title: "#DigitalNomad",
    posts: 1982,
  },
  {
    id: 5,
    title: "#CodingTips",
    posts: 1654,
  },
]

// Mock notifications
const notifications = [
  {
    id: 1,
    type: "like",
    user: "Alex Johnson",
    content: "liked your post",
    time: "2 minutes ago",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 2,
    type: "comment",
    user: "Samantha Lee",
    content: "commented on your post",
    time: "15 minutes ago",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 3,
    type: "follow",
    user: "Marcus Chen",
    content: "started following you",
    time: "1 hour ago",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 4,
    type: "mention",
    user: "Priya Patel",
    content: "mentioned you in a comment",
    time: "3 hours ago",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
  },
]
// Mock chat data
const mockChats = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces",
      isOnline: true,
    },
    lastMessage: {
      text: "Hey, did you see my latest project?",
      timestamp: "10 minutes ago",
      isRead: true,
    },
    messages: [
      {
        id: 1,
        sender: "Alex Johnson",
        text: "Hey, how's it going?",
        timestamp: "Yesterday, 2:30 PM",
        isSelf: false,
      },
      {
        id: 2,
        sender: "You",
        text: "Pretty good! Working on some new features.",
        timestamp: "Yesterday, 2:45 PM",
        isSelf: true,
      },
      {
        id: 3,
        sender: "Alex Johnson",
        text: "That sounds interesting! What kind of features?",
        timestamp: "Yesterday, 3:00 PM",
        isSelf: false,
      },
      {
        id: 4,
        sender: "You",
        text: "Mostly UI improvements and some performance optimizations.",
        timestamp: "Yesterday, 3:15 PM",
        isSelf: true,
      },
      {
        id: 5,
        sender: "Alex Johnson",
        text: "Nice! Can't wait to see them.",
        timestamp: "Yesterday, 3:20 PM",
        isSelf: false,
      },
      {
        id: 6,
        sender: "Alex Johnson",
        text: "Hey, did you see my latest project?",
        timestamp: "10 minutes ago",
        isSelf: false,
      },
    ],
  },
  {
    id: 2,
    user: {
      name: "Samantha Lee",
      username: "samlee",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
      isOnline: true,
    },
    lastMessage: {
      text: "The hiking trip was amazing!",
      timestamp: "30 minutes ago",
      isRead: false,
    },
    messages: [
      {
        id: 1,
        sender: "Samantha Lee",
        text: "Hey, are you free this weekend?",
        timestamp: "2 days ago, 10:30 AM",
        isSelf: false,
      },
      {
        id: 2,
        sender: "You",
        text: "I think so! What's up?",
        timestamp: "2 days ago, 11:00 AM",
        isSelf: true,
      },
      {
        id: 3,
        sender: "Samantha Lee",
        text: "I'm planning a hiking trip. Want to join?",
        timestamp: "2 days ago, 11:15 AM",
        isSelf: false,
      },
      {
        id: 4,
        sender: "You",
        text: "That sounds fun! Count me in.",
        timestamp: "2 days ago, 11:30 AM",
        isSelf: true,
      },
      {
        id: 5,
        sender: "Samantha Lee",
        text: "Great! I'll send you the details later.",
        timestamp: "2 days ago, 11:45 AM",
        isSelf: false,
      },
      {
        id: 6,
        sender: "Samantha Lee",
        text: "The hiking trip was amazing!",
        timestamp: "30 minutes ago",
        isSelf: false,
      },
    ],
  },
  {
    id: 3,
    user: {
      name: "Marcus Chen",
      username: "mchen",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
      isOnline: false,
    },
    lastMessage: {
      text: "I'll lend you that AI book next week.",
      timestamp: "2 hours ago",
      isRead: true,
    },
    messages: [
      {
        id: 1,
        sender: "You",
        text: "Hey Marcus, I heard you're reading a good book on AI?",
        timestamp: "3 days ago, 9:00 AM",
        isSelf: true,
      },
      {
        id: 2,
        sender: "Marcus Chen",
        text: "Yes! It's called 'AI Superpowers' by Kai-Fu Lee. It's really insightful.",
        timestamp: "3 days ago, 9:30 AM",
        isSelf: false,
      },
      {
        id: 3,
        sender: "You",
        text: "That sounds interesting! Would you recommend it?",
        timestamp: "3 days ago, 10:00 AM",
        isSelf: true,
      },
      {
        id: 4,
        sender: "Marcus Chen",
        text: "Definitely! It's a great read if you're interested in AI and its future implications.",
        timestamp: "3 days ago, 10:15 AM",
        isSelf: false,
      },
      {
        id: 5,
        sender: "You",
        text: "Could I borrow it when you're done?",
        timestamp: "3 days ago, 10:30 AM",
        isSelf: true,
      },
      {
        id: 6,
        sender: "Marcus Chen",
        text: "I'll lend you that AI book next week.",
        timestamp: "2 hours ago",
        isSelf: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Priya Patel",
      username: "ppatel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
      isOnline: true,
    },
    lastMessage: {
      text: "Can you review my presentation slides?",
      timestamp: "1 hour ago",
      isRead: false,
    },
    messages: [
      {
        id: 1,
        sender: "Priya Patel",
        text: "Hi there! I'm preparing for my tech conference talk.",
        timestamp: "Yesterday, 4:00 PM",
        isSelf: false,
      },
      {
        id: 2,
        sender: "You",
        text: "That's exciting! How's the preparation going?",
        timestamp: "Yesterday, 4:15 PM",
        isSelf: true,
      },
      {
        id: 3,
        sender: "Priya Patel",
        text: "It's going well, but I'm a bit nervous. It's my first big conference.",
        timestamp: "Yesterday, 4:30 PM",
        isSelf: false,
      },
      {
        id: 4,
        sender: "You",
        text: "You'll do great! What's your talk about?",
        timestamp: "Yesterday, 4:45 PM",
        isSelf: true,
      },
      {
        id: 5,
        sender: "Priya Patel",
        text: "It's about emerging trends in web development. I'm focusing on serverless architectures.",
        timestamp: "Yesterday, 5:00 PM",
        isSelf: false,
      },
      {
        id: 6,
        sender: "Priya Patel",
        text: "Can you review my presentation slides?",
        timestamp: "1 hour ago",
        isSelf: false,
      },
    ],
  },
  {
    id: 5,
    user: {
      name: "Jordan Williams",
      username: "jwilliams",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
      isOnline: false,
    },
    lastMessage: {
      text: "The recipe turned out great! I'll share it with you.",
      timestamp: "3 hours ago",
      isRead: true,
    },
    messages: [
      {
        id: 1,
        sender: "Jordan Williams",
        text: "Hey, I'm trying out a new recipe tonight.",
        timestamp: "2 days ago, 6:00 PM",
        isSelf: false,
      },
      {
        id: 2,
        sender: "You",
        text: "What are you making?",
        timestamp: "2 days ago, 6:15 PM",
        isSelf: true,
      },
      {
        id: 3,
        sender: "Jordan Williams",
        text: "A Mediterranean-inspired pasta dish with roasted vegetables and feta.",
        timestamp: "2 days ago, 6:30 PM",
        isSelf: false,
      },
      {
        id: 4,
        sender: "You",
        text: "That sounds delicious! Let me know how it turns out.",
        timestamp: "2 days ago, 6:45 PM",
        isSelf: true,
      },
      {
        id: 5,
        sender: "Jordan Williams",
        text: "Will do! If it's good, I'll share the recipe.",
        timestamp: "2 days ago, 7:00 PM",
        isSelf: false,
      },
      {
        id: 6,
        sender: "Jordan Williams",
        text: "The recipe turned out great! I'll share it with you.",
        timestamp: "3 hours ago",
        isSelf: false,
      },
    ],
  },
]

export default function MediaApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [posts, setPosts] = useState(initialPosts)
  const [filteredPosts, setFilteredPosts] = useState(initialPosts)
  const [newPostContent, setNewPostContent] = useState("")
  const [showSharePopup, setShowSharePopup] = useState<number | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({})
  const [chats, setChats] = useState(mockChats)
  const [activeChat, setActiveChat] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Function to handle login
  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      toast.error("Please enter both username and password")
      return
    }
    setIsLoggedIn(true)
    toast.success("You have successfully logged in")
  }

  // Function to handle test user login
  const handleTestLogin = () => {
    setIsLoggedIn(true)
    toast.success("Success: You have logged in as a test user")
  }

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername("")
    setPassword("")
    toast.success("You have successfully logged out")
  }

  // Function to create a new post
  const handleCreatePost = (close: () => void) => {
    if (newPostContent.trim() === "") {
      toast.error("Post content cannot be empty")
      return
    }

    const newPost = {
      id: posts.length + 1,
      author: {
        name: "You",
        username: "yourusername",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
      },
      content: newPostContent,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      isLiked: false,
      commentsList: [],
      showComments: false,
    }

    const updatedPosts = [newPost, ...posts]
    setPosts(updatedPosts)
    setFilteredPosts(updatedPosts)
    setNewPostContent("")
    close()
    toast.success("Success: Your post has been created")
  }

  // Function to like a post
  const handleLike = (postId: number) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked,
        }
      }
      return post
    })
    setPosts(updatedPosts)
    setFilteredPosts(updatedPosts.filter((post) => post.content.toLowerCase().includes(searchQuery.toLowerCase())))
  }

  // Function to toggle comments visibility
  const handleToggleComments = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            showComments: !post.showComments,
          }
        }
        return post
      }),
    )
    setFilteredPosts(
      filteredPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            showComments: !post.showComments,
          }
        }
        return post
      }),
    )
  }

  // Function to add a new comment
  const handleAddComment = (postId: number) => {
    if (!newComments[postId] || newComments[postId].trim() === "") {
      toast.error("Comment cannot be empty")
      return
    }

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const newComment = {
          id: post.commentsList.length + 1,
          author: {
            name: "You",
            username: "yourusername",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
          },
          content: newComments[postId],
          timestamp: "Just now",
        }
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [...post.commentsList, newComment],
        }
      }
      return post
    })

    setPosts(updatedPosts)
    setFilteredPosts(updatedPosts.filter((post) => post.content.toLowerCase().includes(searchQuery.toLowerCase())))

    // Clear the comment input
    setNewComments({
      ...newComments,
      [postId]: "",
    })

    toast.success("Your comment has been added")
  }

  // Function to share on social media
const handleShare = (platform: string, postId: number) => {
    const post = posts.find((p) => p.id === postId)
    if (!post) {
      toast.error("Post not found")
      return
    }

    const shareContent = post.content
    const shareUrl = post.image || "https://yourapp.com"

    if (platform === "Twitter") {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareContent
      )}&url=${encodeURIComponent(shareUrl)}`
      window.open(twitterUrl, "_blank")
    } else if (platform === "Facebook") {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
      window.open(facebookUrl, "_blank")
    } else {
      toast.error("Unsupported platform")
      return
    }

    toast.success(`Post shared on ${platform}`)
    setShowSharePopup(null)
  }

  // Function to handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredPosts(posts)
    } else {
      const filtered = posts.filter((post) => post.content.toLowerCase().includes(query.toLowerCase()))
      setFilteredPosts(filtered)
    }
  }

  // Simulate loading more posts on scroll
  const loadMorePosts = () => {
    // In a real app, this would fetch more posts from an API
    const newPosts = [...posts]
    const lastPost = newPosts[newPosts.length - 1]

    const randomImages = [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=600&h=400&fit=crop",
    ]

    newPosts.push({
      ...lastPost,
      id: lastPost.id + 1,
      timestamp: "Just now",
      likes: Math.floor(Math.random() * 50),
      comments: Math.floor(Math.random() * 10),
      image: Math.random() > 0.5 ? randomImages[Math.floor(Math.random() * randomImages.length)] : undefined,
      commentsList: [],
      showComments: false,
    })

    setPosts(newPosts)
    if (searchQuery.trim() === "") {
      setFilteredPosts(newPosts)
    } else {
      setFilteredPosts(newPosts.filter((post) => post.content.toLowerCase().includes(searchQuery.toLowerCase())))
    }
  }

  // Add scroll event listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 100) {
        loadMorePosts()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [posts, searchQuery])
  
const handleSendMessage = () => {
    if (!newMessage.trim() || activeChat === null) return

    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChat) {
        const newMsg = {
          id: chat.messages.length + 1,
          sender: "You",
          text: newMessage,
          timestamp: "Just now",
          isSelf: true,
        }
        return {
          ...chat,
          messages: [...chat.messages, newMsg],
          lastMessage: {
            text: newMessage,
            timestamp: "Just now",
            isRead: true,
          },
        }
      }
      return chat
    })

    setChats(updatedChats)
    setNewMessage("")

    // Scroll to bottom of chat
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  // Scroll to bottom when active chat changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeChat])

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation Bar */}
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          {/* Logo */}
          <div className="text-xl font-bold text-fuchsia-600 cursor-pointer">SocialApp</div>

          {/* Search Bar */}
          <div className="relative hidden md:block w-1/3 cursor-pointer">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search posts..."
              className="pl-8 bg-gray-100 border-none "
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4 ">
            {isLoggedIn && (
              <>
                {/* Create Post Button */}
                <Dialog>
  <DialogTrigger asChild>
    <Button size="sm" className="hidden md:flex bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer">
      <Plus className="w-4 h-4 mr-2" /> Create Post
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create a new post</DialogTitle>
      <DialogDescription>Share your thoughts with the community</DialogDescription>
    </DialogHeader>
    <Textarea
      placeholder="What's on your mind?"
      className="min-h-[100px]"
      value={newPostContent}
      onChange={(e) => setNewPostContent(e.target.value)}
    />
    <DialogFooter>
  <DialogClose asChild>
    <Button variant="outline" className="cursor-pointer">Cancel</Button>
  </DialogClose>
  <DialogClose asChild>
    <Button
      className="bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        handleCreatePost(() => {
          const closeButton = e.currentTarget
            .closest("div")
            ?.querySelector('button[data-state="closed"]') as HTMLButtonElement | null;
          if (closeButton) {
            closeButton.click();
          }
        });
      }}
    >
      Post
    </Button>
  </DialogClose>
</DialogFooter>
  </DialogContent>
</Dialog>

                {/* Mobile Create Post Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="ghost" className="md:hidden text-fuchsia-600">
                      <Plus className="w-5 h-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create a new post</DialogTitle>
                      <DialogDescription>Share your thoughts with the community</DialogDescription>
                    </DialogHeader>
                    <Textarea
                      placeholder="What's on your mind?"
                      className="min-h-[100px]"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          className="bg-fuchsia-600 hover:bg-fuchsia-700"
                          onClick={(e) => {
                            e.preventDefault()
                            const closeButton = e.currentTarget
                              .closest("div")
                              ?.querySelector('button[data-state="closed"]') as HTMLButtonElement | null
                            if (closeButton) {
                              handleCreatePost(() => closeButton.click())
                            }
                          }}
                        >
                          Post
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Chat Button */}
                <Sheet>
                  <SheetTrigger asChild>
                  <Button size="icon" variant="ghost" className="text-navy-600 relative cursor-pointer">
                    <MessageCircle className="w-5 h-5 " />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-navy-600 rounded-full cursor-pointer"></span>
                  </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="p-0 w-full sm:max-w-md">
                  <div className="flex flex-col h-full">
                    {activeChat === null ? (
                    <>
                      <div className="p-4 border-b">
                      <h2 className="text-lg font-semibold">Messages</h2>
                      </div>
                      <div className="overflow-y-auto flex-1">
                      {chats.map((chat) => (
                        <div
                        key={chat.id}
                        className="flex items-center p-4 border-b hover:bg-gray-50 cursor-pointer"
                        onClick={() => setActiveChat(chat.id)}
                        >
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                          <AvatarImage src={chat.user.avatar} alt={chat.user.name} />
                          <AvatarFallback>{chat.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {chat.user.isOnline && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between items-center">
                          <h3 className="font-medium">{chat.user.name}</h3>
                          <span className="text-xs text-gray-500">{chat.lastMessage.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{chat.lastMessage.text}</p>
                        </div>
                        {!chat.lastMessage.isRead && (
                          <div className="ml-2 w-2 h-2 bg-navy-600 rounded-full"></div>
                        )}
                        </div>
                      ))}
                      </div>
                    </>
                    ) : (
                    <>
                      <div className="p-4 border-b flex items-center">
                      <Button variant="ghost" size="icon" className="mr-2 cursor-pointer" onClick={() => setActiveChat(null)}>
                        <X className="h-4 w-4 cursor-pointer" />
                      </Button>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage
                          src={chats.find((c) => c.id === activeChat)?.user.avatar}
                          alt={chats.find((c) => c.id === activeChat)?.user.name}
                        />
                        <AvatarFallback>
                          {chats.find((c) => c.id === activeChat)?.user.name.charAt(0)}
                        </AvatarFallback>
                        </Avatar>
                        <div>
                        <h3 className="font-medium">{chats.find((c) => c.id === activeChat)?.user.name}</h3>
                        <p className="text-xs text-gray-500">
                          {chats.find((c) => c.id === activeChat)?.user.isOnline ? "Online" : "Offline"}
                        </p>
                        </div>
                      </div>
                      </div>
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {chats
                        .find((c) => c.id === activeChat)
                        ?.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isSelf ? "justify-end" : "justify-start"}`}
                        >
                          <div
                          className={`max-w-[75%] rounded-lg p-3 ${
                            message.isSelf
                            ? "bg-fuchsia-600 text-white rounded-br-none"
                            : "bg-gray-100 rounded-bl-none"
                          }`}
                          >
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${message.isSelf ? "text-navy-100" : "text-gray-500"}`}>
                            {message.timestamp}
                          </p>
                          </div>
                        </div>
                        ))}
                      <div ref={chatEndRef} />
                      </div>
                      <div className="p-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                          }
                        }}
                        />
                        <Button size="icon" className="bg-fuchsia-600 hover:bg-fuchsia-700" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      </div>
                    </>
                    )}
                  </div>
                  </SheetContent>
                </Sheet>

                {/* Notifications */}
                <div className="relative">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="text-fuchsia-600 cursor-pointer"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-fuchsia-600 rounded-full"></span>
                  </Button>
                  {showNotifications && (
                    <div className="absolute right-0 w-80 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20">
                      <div className="p-3 border-b">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Notifications</h3>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6"
                            onClick={() => setShowNotifications(false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="p-3 border-b hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-start gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={notification.avatar} />
                                <AvatarFallback>{notification.user.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm">
                                  <span className="font-medium">{notification.user}</span> {notification.content}
                                </p>
                                <p className="text-xs text-gray-500">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center">
                        <Button variant="link" className="text-sm text-fuchsia-600">
                          View all notifications
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces"
                          alt="@user"
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">User</p>
                        <p className="text-sm text-gray-500">user@example.com</p>
                      </div>
                    </div>
                    <DropdownMenuItem asChild>
                      <Button variant="ghost" className="w-full justify-start text-fuchsia-600 cursor-pointer" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {!isLoggedIn && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer">Login / Signup</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Login to your account</DialogTitle>
                    <DialogDescription>Enter your credentials to access your account</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="username" className="text-sm font-medium">
                        Username
                      </label>
                      <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button variant="outline" className="sm:w-auto w-full cursor-pointer" onClick={handleTestLogin}>
                      Login as Test User
                    </Button>
                    <DialogClose asChild>
                      <Button className="sm:w-auto w-full bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer" onClick={handleLogin}>
                        Login
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6 mx-auto">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
          {/* Posts Feed (60%) */}
          <div className="lg:col-span-6 space-y-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{post.author.name}</div>
                      <div className="text-sm text-gray-500">
                        @{post.author.username} · {post.timestamp}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="mb-3">{post.content}</p>
                  {post.image && (
                    <div className="rounded-md overflow-hidden mt-2">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post image"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-4 pt-0 flex flex-col items-start">
                  <div className="flex items-center space-x-4 w-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn("flex items-center space-x-1 cursor-pointer", post.isLiked && "text-fuchsia-600")}
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className={cn("h-4 w-4", post.isLiked && "fill-fuchsia-600 text-fuchsia-600")} />
                      <span>{post.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-1 cursor-pointer"
                      onClick={() => handleToggleComments(post.id)}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-1 cursor-pointer"
                        onClick={() => setShowSharePopup((prev) => (prev === post.id ? null : post.id))} // Toggle logic
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                      {showSharePopup === post.id && (
                        <div className="absolute bottom-full left-0 mb-2 bg-white rounded-md shadow-lg p-2 z-10">
                          <div className="flex flex-col space-y-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center justify-start"
                              onClick={() => handleShare("Twitter", post.id)}
                            >
                              <Twitter className="h-4 w-4 mr-2" />
                              Twitter
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center justify-start"
                              onClick={() => handleShare("Facebook", post.id)}
                            >
                              <Facebook className="h-4 w-4 mr-2" />
                              Facebook
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Comments Section */}
                  {post.showComments && (
                    <div className="w-full mt-4 space-y-4">
                      <Separator />
                      <div className="space-y-4">
                        {post.commentsList.map((comment) => (
                          <div key={comment.id} className="flex space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                              <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center">
                                <span className="font-medium text-sm">{comment.author.name}</span>
                                <span className="ml-2 text-xs text-gray-500">{comment.timestamp}</span>
                              </div>
                              <p className="text-sm mt-1">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Comment */}
                      <div className="flex items-center space-x-2 mt-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces"
                            alt="Your avatar"
                          />
                          <AvatarFallback>Y</AvatarFallback>
                        </Avatar>
                        <Input
                          placeholder="Add a comment..."
                          className="flex-1"
                          value={newComments[post.id] || ""}
                          onChange={(e) =>
                            setNewComments({
                              ...newComments,
                              [post.id]: e.target.value,
                            })
                          }
                        />
                        <Button
                          size="sm"
                          className="bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer"
                          onClick={() => handleAddComment(post.id)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Trending Posts (30%) */}
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Trending Topics</h3>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[400px] overflow-y-auto">
                  {trendingPosts.map((trend) => (
                    <div
                      key={trend.id}
                      className="p-4 hover:bg-fuchsia-50 transition-colors border-b last:border-0 cursor-pointer"
                    >
                      <h4 className="font-medium text-fuchsia-700">{trend.title}</h4>
                      <p className="text-sm text-gray-500">{trend.posts.toLocaleString()} posts</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <Button variant="link" className="w-full text-fuchsia-600">
                  Show more
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Who to Follow</h3>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {initialPosts.slice(0, 3).map((post) => (
                    <div
                      key={`follow-${post.id}`}
                      className="flex items-center justify-between p-4 hover:bg-fuchsia-50 transition-colors border-b last:border-0 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{post.author.name}</div>
                          <div className="text-sm text-gray-500">@{post.author.username}</div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-fuchsia-600 text-fuchsia-600 hover:bg-fuchsia-50"
                      >
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <Button variant="link" className="w-full text-fuchsia-600">
                  Show more
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <ToastContainer/>
    </div>
  )
}


