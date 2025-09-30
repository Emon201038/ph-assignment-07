import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, MessageSquare, Star, User } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "message",
    content: "New message from Sarah Chen",
    time: "2 hours ago",
    icon: MessageSquare,
  },
  {
    id: 2,
    type: "star",
    content: 'Project "Design System" received 5 stars',
    time: "5 hours ago",
    icon: Star,
  },
  {
    id: 3,
    type: "view",
    content: "New visitor from San Francisco",
    time: "8 hours ago",
    icon: User,
  },
  {
    id: 4,
    type: "update",
    content: 'Updated "E-Commerce Platform"',
    time: "1 day ago",
    icon: FileText,
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-pretty leading-relaxed">{activity.content}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
