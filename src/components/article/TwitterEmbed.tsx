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
    <div className="space-y-4">
      {/* Main Tweet */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Tweet Card - Left */}
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors group"
        >
          <div className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={username} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      {username.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">{username}</p>
                  <p className="text-muted-foreground text-xs">@{handle} · フォローする</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>

            {/* Content */}
            <p className="text-foreground text-sm leading-relaxed mb-3">
              {content}
            </p>

            {/* Image */}
            {imageUrl && (
              <div className="rounded-lg overflow-hidden mb-3">
                <img
                  src={imageUrl}
                  alt="Tweet image"
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
              <span>{date}</span>
              <div className="flex items-center gap-1">
                <span className="text-red-500">❤️</span>
                <span>{likes.toLocaleString()}</span>
              </div>
              <span className="flex items-center gap-1 group-hover:text-primary transition-colors">
                <ExternalLink className="w-3 h-3" />
                查看原文
              </span>
            </div>
          </div>
        </a>

        {/* Translation - Right */}
        <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 flex flex-col">
          <h4 className="text-lg font-bold text-foreground mb-3">翻譯</h4>
          <p className="text-foreground leading-relaxed flex-1">
            {translation}
          </p>
        </div>
      </div>

      {/* Replies */}
      {replies.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground font-medium">回覆：</p>
          {replies.map((reply, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Reply Tweet - Left */}
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                    {reply.avatarUrl ? (
                      <img src={reply.avatarUrl} alt={reply.username} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                        {reply.username.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-bold text-foreground">{reply.username}</span>
                      <span className="text-muted-foreground"> @{reply.handle} · {reply.date}</span>
                    </p>
                    <p className="text-foreground text-sm mt-1 leading-relaxed">
                      {reply.content}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reply Translation - Right */}
              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
                <h5 className="text-sm font-medium text-muted-foreground mb-2">翻譯</h5>
                <p className="text-foreground text-sm leading-relaxed">
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
