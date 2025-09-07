"use client";

import { Users, Plus, Search, Clock, Star } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ClientsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <AppHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Clients
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Manage and browse all your clients
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Coming Soon Card */}
              <Card className="md:col-span-2 lg:col-span-3 border-0 bg-card/50 backdrop-blur-sm shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Client Management Coming Soon</CardTitle>
                  <CardDescription className="text-base max-w-2xl mx-auto">
                    We're building powerful client management features to help you organize and track all your client relationships in one place.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-background/80 to-background/40">
                      <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Client Profiles</h3>
                        <p className="text-xs text-muted-foreground mt-1">Detailed client information and contact management</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-background/80 to-background/40">
                      <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                        <Search className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Advanced Search</h3>
                        <p className="text-xs text-muted-foreground mt-1">Find clients quickly with smart filtering</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-background/80 to-background/40">
                      <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                        <Star className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Client Rating</h3>
                        <p className="text-xs text-muted-foreground mt-1">Rate and categorize client relationships</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4 pt-4">
                    <Badge variant="outline" className="bg-background/50">
                      <Clock className="h-3 w-3 mr-1" />
                      In Development
                    </Badge>
                    <Button disabled className="bg-gradient-to-r from-blue-500 to-blue-600 text-white opacity-50">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Client (Coming Soon)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
