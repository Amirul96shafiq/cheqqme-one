"use client";

import { Settings, User, Shield, Bell, Palette, Globe, Clock } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <AppHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[#00AE9F] to-[#fbb43e] bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Manage your account and preferences
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Coming Soon Card */}
              <Card className="md:col-span-2 lg:col-span-3 border-0 bg-card/50 backdrop-blur-sm shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#00AE9F]/20 to-[#00AE9F]/30 flex items-center justify-center mx-auto mb-4">
                    <Settings className="h-8 w-8 text-[#00AE9F]" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Settings & Preferences Coming Soon</CardTitle>
                  <CardDescription className="text-base max-w-2xl mx-auto">
                    A comprehensive settings panel is being developed to give you full control over your account, privacy, notifications, and application preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-background/80 to-background/40">
                      <div className="h-8 w-8 rounded-lg bg-[#00AE9F]/20 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-[#00AE9F]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Profile Management</h3>
                        <p className="text-xs text-muted-foreground mt-1">Update personal information and avatar</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-background/80 to-background/40">
                      <div className="h-8 w-8 rounded-lg bg-[#fbb43e]/20 flex items-center justify-center flex-shrink-0">
                        <Shield className="h-4 w-4 text-[#fbb43e]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Security Settings</h3>
                        <p className="text-xs text-muted-foreground mt-1">Password management and two-factor authentication</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-background/80 to-background/40">
                      <div className="h-8 w-8 rounded-lg bg-[#00AE9F]/20 flex items-center justify-center flex-shrink-0">
                        <Bell className="h-4 w-4 text-[#00AE9F]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Notifications</h3>
                        <p className="text-xs text-muted-foreground mt-1">Email and push notification preferences</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-background/80 to-background/40">
                      <div className="h-8 w-8 rounded-lg bg-[#fbb43e]/20 flex items-center justify-center flex-shrink-0">
                        <Palette className="h-4 w-4 text-[#fbb43e]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Appearance</h3>
                        <p className="text-xs text-muted-foreground mt-1">Theme preferences and display options</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-background/80 to-background/40">
                      <div className="h-8 w-8 rounded-lg bg-[#00AE9F]/20 flex items-center justify-center flex-shrink-0">
                        <Globe className="h-4 w-4 text-[#00AE9F]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Localization</h3>
                        <p className="text-xs text-muted-foreground mt-1">Language and region settings</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4 pt-4">
                    <Badge variant="outline" className="bg-background/50">
                      <Clock className="h-3 w-3 mr-1" />
                      In Development
                    </Badge>
                    <Button disabled className="bg-gradient-to-r from-[#00AE9F] to-[#00AE9F]/90 text-white opacity-50">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure Settings (Coming Soon)
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
