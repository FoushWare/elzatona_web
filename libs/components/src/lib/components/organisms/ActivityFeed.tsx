import {
  ActivityItem,
  type ActivityItemPropsType,
} from "../molecules/ActivityItem";
import { cn } from "../../utils";

interface ActivityFeedProps {
  activities: ActivityItemPropsType[];
  className?: string;
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {activities.map((activity, index) => (
        <ActivityItem key={index} {...activity} />
      ))}
    </div>
  );
}
