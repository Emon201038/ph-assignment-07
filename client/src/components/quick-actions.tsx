import { FileText, Plus, Settings, Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const actions = [
  {
    title: "New Project",
    description: "Create a new portfolio project",
    icon: Plus,
    variant: "default" as const,
  },
  {
    title: "Upload Media",
    description: "Add images or videos",
    icon: Upload,
    variant: "outline" as const,
  },
  {
    title: "Write Post",
    description: "Share your thoughts",
    icon: FileText,
    variant: "outline" as const,
  },
  {
    title: "Settings",
    description: "Manage your portfolio",
    icon: Settings,
    variant: "outline" as const,
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Button key={action.title} variant={action.variant} className="h-auto justify-start gap-3 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-sm font-medium">{action.title}</span>
                <span className="text-xs text-muted-foreground">{action.description}</span>
              </div>
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}
