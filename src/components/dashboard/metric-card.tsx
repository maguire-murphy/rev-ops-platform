import { LucideIcon } from "lucide-react";

interface MetricCardProps {
    title: string;
    value: string;
    description?: string;
    icon?: LucideIcon;
    trend?: number; // Percentage change
}

export function MetricCard({ title, value, description, icon: Icon, trend }: MetricCardProps) {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{title}</h3>
                {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            </div>
            <div className="p-6 pt-0">
                <div className="text-2xl font-bold">{value}</div>
                {(description || trend !== undefined) && (
                    <p className="text-xs text-muted-foreground">
                        {trend !== undefined && (
                            <span className={trend >= 0 ? "text-green-500" : "text-red-500"}>
                                {trend > 0 ? "+" : ""}
                                {trend.toFixed(1)}%{" "}
                            </span>
                        )}
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
