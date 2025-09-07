"use client";

import { AppHeader } from "@/components/app-header";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
              <p className="text-muted-foreground">
                Manage and browse all your clients
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
                <CardDescription>
                  Client management features are under development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This page will allow you to browse, search, and manage clients.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
