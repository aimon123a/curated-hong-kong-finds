import { ExternalLink } from "lucide-react";

interface TwitterReply {
  username: string;
  handle: string;
  date: string;
  content: string;
  translation: string;
  avatarUrl?: string;
}

interface TwitterEmbedProps {
  tweetUrl: string;
  username: string;
  handle: string;
  date: string;
  content: string;
  translation: string;
  imageUrl?: string;
  likes?: number;
  avatarUrl?: string;
  replies?: TwitterReply[];
}

const TwitterEmbed = ({
  tweetUrl,
  username,
  handle,
  date,
  content,
  translation,
  imageUrl,
  likes = 7294,
  avatarUrl,
  replies = [],
}: TwitterEmbedProps) => {
  return (
    <div className="space-y-6">
      {/* Main Tweet - Side by side layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Tweet Card - Left (3 cols) */}
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="lg:col-span-3 block bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors group"
        >
          <div className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={username} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-foreground font-bold">
                      {username.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-foreground">{username}</p>
                  <p className="text-muted-foreground text-sm">@{handle}</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>

            {/* Content */}
            <p className="text-foreground leading-relaxed mb-4 whitespace-pre-line">
              {content}
            </p>

            {/* Image */}
            {imageUrl && (
              <div className="rounded-xl overflow-hidden mb-4 border border-border">
                <img
                  src={imageUrl}
                  alt="Tweet image"
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-3 border-t border-border">
              <span>{date}</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="font-medium">{likes.toLocaleString()}</span>
              </div>
              <span className="flex items-center gap-1 ml-auto text-primary group-hover:underline">
                <ExternalLink className="w-4 h-4" />
                查看原文
              </span>
            </div>
          </div>
        </a>

        {/* Translation - Right (2 cols) - Fits content */}
        <div className="lg:col-span-2 bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🇭🇰</span>
            <h4 className="font-bold text-foreground">翻譯重點</h4>
          </div>
          <p className="text-foreground leading-relaxed whitespace-pre-line">
            {translation}
          </p>
        </div>
      </div>

      {/* Replies */}
      {replies.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            網友回覆
          </p>
          {replies.map((reply, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Reply Tweet - Left */}
              <div className="lg:col-span-3 bg-card border border-border rounded-lg p-4 ml-6 relative">
                {/* Connection line */}
                <div className="absolute -left-3 top-0 bottom-0 w-0.5 bg-border"></div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted overflow-hidden shrink-0">
                    {reply.avatarUrl ? (
                      <img src={reply.avatarUrl} alt={reply.username} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-secondary/30 to-accent/30 flex items-center justify-center text-foreground font-bold text-sm">
                        {reply.username.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm mb-1">
                      <span className="font-bold text-foreground">{reply.username}</span>
                      <span className="text-muted-foreground"> @{reply.handle} · {reply.date}</span>
                    </p>
                    <p className="text-foreground leading-relaxed whitespace-pre-line">
                      {reply.content}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reply Translation - Right */}
              <div className="lg:col-span-2 bg-secondary/10 border border-secondary/30 rounded-lg p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">🇭🇰</span>
                  <h5 className="text-sm font-medium text-muted-foreground">翻譯</h5>
                </div>
                <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">
                  {reply.translation}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TwitterEmbed;
