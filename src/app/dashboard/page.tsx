"use client";

import { useEffect, useState } from "react";
import { Users, FolderOpen, FileText, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppHeader } from "@/components/app-header";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/hooks/use-auth";
import { fetchWithAuth } from "@/lib/api";
import { DashboardStats } from "@/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const response = await fetchWithAuth.get<DashboardStats>('/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const statsCards = [
    {
      title: "Total Clients",
      value: stats?.total_clients || 0,
      icon: Users,
      description: "Active clients",
      color: "text-blue-600",
    },
    {
      title: "Total Projects",
      value: stats?.total_projects || 0,
      icon: FolderOpen,
      description: "Active projects",
      color: "text-green-600",
    },
    {
      title: "Total Documents",
      value: stats?.total_documents || 0,
      icon: FileText,
      description: "Uploaded documents",
      color: "text-purple-600",
    },
    {
      title: "Recent Activity",
      value: stats?.recent_documents?.length || 0,
      icon: TrendingUp,
      description: "New this week",
      color: "text-orange-600",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
          <div className="flex flex-col space-y-6">
            {/* Welcome Section */}
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-muted-foreground">
                Here&apos;s what&apos;s happening with your projects today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {statsCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {isLoading ? "..." : stat.value.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Documents</CardTitle>
                <CardDescription>
                  Latest documents uploaded to the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-muted rounded-lg animate-pulse" />
                        <div className="space-y-1 flex-1">
                          <div className="h-4 bg-muted rounded animate-pulse" />
                          <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : stats?.recent_documents?.length ? (
                  <div className="space-y-4">
                    {stats.recent_documents.map((doc) => (
                      <div key={doc.id} className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <p className="text-sm font-medium leading-none">
                            {doc.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {doc.project?.name || doc.client?.name || "General"}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {new Date(doc.created_at).toLocaleDateString()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    No recent documents found.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
