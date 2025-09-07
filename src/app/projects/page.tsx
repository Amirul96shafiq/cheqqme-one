"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AppHeader } from "@/components/app-header";
import { ProtectedRoute } from "@/components/protected-route";
import { fetchWithAuth } from "@/lib/api";
import { Project, PaginatedResponse } from "@/types";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetchWithAuth.get<PaginatedResponse<Project>>('/projects');
        setProjects(response.data.data);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'on_hold': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
          <div className="flex flex-col space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <p className="text-muted-foreground">
                  Manage and browse all your projects
                </p>
              </div>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search projects or clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Projects Grid */}
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <div className="h-6 bg-muted rounded animate-pulse" />
                      <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                        <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <CardDescription>
                        Client: {project.client.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {project.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Created: {new Date(project.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold">No projects found</h3>
                    <p className="text-muted-foreground">
                      {searchQuery 
                        ? "Try adjusting your search terms" 
                        : "Get started by creating your first project"
                      }
                    </p>
                    {!searchQuery && (
                      <Button className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Project
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
