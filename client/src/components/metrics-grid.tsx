import { ArrowDown, ArrowUp, Eye, FolderOpen, MessageSquare, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const metrics = [
  {
    title: "Total Views",
    value: "24,583",
    change: "+12.5%",
    trend: "up",
    icon: Eye,
  },
  {
    title: "Active Projects",
    value: "12",
    change: "+2",
    trend: "up",
    icon: FolderOpen,
  },
  {
    title: "Engagement Rate",
    value: "68.4%",
    change: "+4.2%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Messages",
    value: "47",
    change: "-8",
    trend: "down",
    icon: MessageSquare,
  },
]

export function MetricsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const isPositive = metric.trend === "up"

        return (
          <Card key={metric.title} className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                {isPositive ? (
                  <ArrowUp className="h-3 w-3 text-chart-3" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-destructive" />
                )}
                <span className={isPositive ? "text-chart-3" : "text-destructive"}>{metric.change}</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
