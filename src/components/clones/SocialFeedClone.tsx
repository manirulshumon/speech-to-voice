import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  Image as ImageIcon, 
  Send, 
  Sparkles,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { SOCIAL_POSTS } from '../../data/clonesData';
import { SocialPost } from '../../types';

export const SocialFeedClone: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>(SOCIAL_POSTS);
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [postComments, setPostComments] = useState<Record<string, Array<{ author: string; text: string; time: string }>>>({
    'post-1': [
      { author: 'Tahsin BD', text: 'Sajek cloud views in October are truly paradise! Great capture.', time: '1h ago' },
      { author: 'Mehnaz', text: 'Which resort in Ruilui Para did you stay at?', time: '30m ago' }
    ]
  });

  const stories = [
    { name: 'NaturalSceneBD', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', active: true },
    { name: 'SajekClouds', avatar: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80', active: true },
    { name: 'SundarbanWild', avatar: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=150&q=80', active: true },
    { name: 'SylhetTea', avatar: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=150&q=80', active: false },
    { name: 'CoxsBazar', avatar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80', active: false }
  ];

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const liked = !p.likedByMe;
          return {
            ...p,
            likedByMe: liked,
            likes: liked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    setIsPosting(true);
    setTimeout(() => {
      const newPost: SocialPost = {
        id: `post-${Date.now()}`,
        author: {
          name: 'Natural Scene BD',
          username: 'naturalscene_bd',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          badge: 'Verified Creator'
        },
        image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1000&q=80',
        content: newPostContent,
        timestamp: 'Just now',
        likes: 1,
        likedByMe: true,
        commentsCount: 0,
        shares: 0,
        tags: ['#NaturalSceneBD', '#BangladeshNature']
      };

      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setIsPosting(false);
    }, 400);
  };

  const handleAddComment = (postId: string) => {
    if (!newCommentText.trim()) return;
    const current = postComments[postId] || [];
    setPostComments({
      ...postComments,
      [postId]: [...current, { author: 'You', text: newCommentText, time: 'Just now' }]
    });
    setNewCommentText('');
    setPosts(posts.map(p => p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Stories Bar */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-4 min-w-max">
            {/* Create Story Button */}
            <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
              <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-dashed border-indigo-500/50 flex items-center justify-center group-hover:border-indigo-400 transition-colors">
                <Plus className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="text-[10px] text-slate-400">Add Story</span>
            </div>

            {stories.map((story, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer">
                <div
                  className={`p-0.5 rounded-full ${
                    story.active
                      ? 'bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-500'
                      : 'bg-slate-700'
                  }`}
                >
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-13 h-13 rounded-full object-cover border-2 border-slate-900"
                  />
                </div>
                <span className="text-[10px] text-slate-300 max-w-[64px] truncate">{story.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Create Post Card */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-lg">
          <form onSubmit={handleCreatePost} className="space-y-3">
            <div className="flex items-start gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Creator"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
              />
              <textarea
                rows={2}
                placeholder="Share a thought or photo about Natural Scene BD..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <span className="flex items-center gap-1 hover:text-indigo-400 cursor-pointer">
                  <ImageIcon className="w-4 h-4 text-emerald-400" />
                  <span>Attach Scenic Image</span>
                </span>
              </div>
              <button
                type="submit"
                disabled={isPosting || !newPostContent.trim()}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all disabled:opacity-50"
              >
                {isPosting ? 'Posting...' : 'Post Story'}
              </button>
            </div>
          </form>
        </div>

        {/* Post Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl"
            >
              {/* Post author header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-white">{post.author.name}</h4>
                      {post.author.badge && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">@{post.author.username} • {post.timestamp}</span>
                  </div>
                </div>
                <button className="text-slate-500 hover:text-slate-300">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Post image */}
              {post.image && (
                <div className="relative max-h-[460px] overflow-hidden bg-slate-950">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Action buttons */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs transition-colors ${
                        post.likedByMe ? 'text-rose-500 font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${post.likedByMe ? 'fill-rose-500' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => setActiveCommentsPostId(activeCommentsPostId === post.id ? null : post.id)}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.commentsCount}</span>
                    </button>
                    <button className="text-slate-400 hover:text-white transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>

                {/* Content text */}
                <p className="text-xs text-slate-200 leading-relaxed">
                  {post.content}
                </p>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((t, idx) => (
                    <span key={idx} className="text-[11px] text-indigo-400 font-medium hover:underline cursor-pointer">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Comments Accordion */}
                {activeCommentsPostId === post.id && (
                  <div className="pt-3 border-t border-slate-800 space-y-2.5">
                    <div className="text-[11px] font-semibold text-slate-400">Comments</div>
                    {(postComments[post.id] || []).map((c, idx) => (
                      <div key={idx} className="text-xs bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-start justify-between">
                        <div>
                          <strong className="text-slate-200">{c.author}: </strong>
                          <span className="text-slate-300">{c.text}</span>
                        </div>
                        <span className="text-[9px] text-slate-500 font-mono shrink-0 ml-2">{c.time}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
