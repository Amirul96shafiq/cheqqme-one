"use client";

import { AppHeader } from "@/components/app-header";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account and preferences
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
                <CardDescription>
                  Settings and profile management features are under development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This page will allow you to manage your profile, preferences, and account settings.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
