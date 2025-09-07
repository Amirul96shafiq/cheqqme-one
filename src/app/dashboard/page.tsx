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
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <AppHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          <div className="flex flex-col space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Welcome back, {user?.name}!
                  </h1>
                  <p className="text-lg text-muted-foreground mt-2">
                    Here&apos;s what&apos;s happening with your projects today.
                  </p>
                </div>
                <Badge variant="outline" className="hidden md:flex items-center gap-2 px-3 py-1">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                  System Online
                </Badge>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {statsCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title} className="relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${
                        index === 0 ? 'from-blue-500/10 to-blue-600/10' :
                        index === 1 ? 'from-green-500/10 to-green-600/10' :
                        index === 2 ? 'from-purple-500/10 to-purple-600/10' :
                        'from-orange-500/10 to-orange-600/10'
                      }`}>
                        <Icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold tracking-tight">
                        {isLoading ? (
                          <div className="h-8 w-20 bg-muted animate-pulse rounded" />
                        ) : (
                          stat.value.toLocaleString()
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {stat.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Documents */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold">Recent Documents</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Latest documents uploaded to the system
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stats?.recent_documents?.length || 0} items
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4 p-4 rounded-lg border bg-background/50">
                        <div className="h-12 w-12 bg-muted rounded-xl animate-pulse" />
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-muted rounded animate-pulse" />
                          <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
                        </div>
                        <div className="h-6 w-16 bg-muted rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                ) : stats?.recent_documents?.length ? (
                  <div className="space-y-3">
                    {stats.recent_documents.map((doc) => (
                      <div key={doc.id} className="flex items-center space-x-4 p-4 rounded-lg border bg-gradient-to-r from-background/80 to-background/40 hover:from-primary/5 hover:to-primary/10 transition-all duration-200 group">
                        <div className="h-12 w-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-200">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors duration-200">
                            {doc.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {doc.project?.name || doc.client?.name || "General"}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs bg-background/50">
                          {new Date(doc.created_at).toLocaleDateString()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg">
                      No recent documents found.
                    </p>
                    <p className="text-sm text-muted-foreground/80 mt-1">
                      Upload your first document to get started.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
