"use client";

import { FileText, Upload, Filter, Download, Share, Clock } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DocumentsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <AppHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[#00AE9F] to-[#fbb43e] bg-clip-text text-transparent">
                Documents
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Browse and manage all your documents
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Coming Soon Card */}
              <Card className="md:col-span-2 lg:col-span-3 border-0 bg-card/50 backdrop-blur-sm shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#fbb43e]/20 to-[#fbb43e]/30 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-[#fbb43e]" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Document Management Coming Soon</CardTitle>
                  <CardDescription className="text-base max-w-2xl mx-auto">
                    A comprehensive document management system is in development to help you organize, search, and collaborate on all your files seamlessly.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-background/80 to-background/40">
                      <div className="h-8 w-8 rounded-lg bg-[#fbb43e]/20 flex items-center justify-center flex-shrink-0">
                        <Upload className="h-4 w-4 text-[#fbb43e]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Drag & Drop Upload</h3>
                        <p className="text-xs text-muted-foreground mt-1">Easy file uploads with preview and progress tracking</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-background/80 to-background/40">
                      <div className="h-8 w-8 rounded-lg bg-[#00AE9F]/20 flex items-center justify-center flex-shrink-0">
                        <Filter className="h-4 w-4 text-[#00AE9F]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Smart Filtering</h3>
                        <p className="text-xs text-muted-foreground mt-1">Filter by type, project, client, and date ranges</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-background/80 to-background/40">
                      <div className="h-8 w-8 rounded-lg bg-[#fbb43e]/20 flex items-center justify-center flex-shrink-0">
                        <Share className="h-4 w-4 text-[#fbb43e]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">File Sharing</h3>
                        <p className="text-xs text-muted-foreground mt-1">Share documents securely with clients and team members</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-background/80 to-background/40">
                      <div className="h-8 w-8 rounded-lg bg-[#00AE9F]/20 flex items-center justify-center flex-shrink-0">
                        <Download className="h-4 w-4 text-[#00AE9F]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Bulk Operations</h3>
                        <p className="text-xs text-muted-foreground mt-1">Download, move, or delete multiple files at once</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-background/80 to-background/40">
                      <div className="h-8 w-8 rounded-lg bg-[#fbb43e]/20 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-4 w-4 text-[#fbb43e]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">File Preview</h3>
                        <p className="text-xs text-muted-foreground mt-1">Preview documents without downloading</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4 pt-4">
                    <Badge variant="outline" className="bg-background/50">
                      <Clock className="h-3 w-3 mr-1" />
                      In Development
                    </Badge>
                    <Button disabled className="bg-gradient-to-r from-[#fbb43e] to-[#fbb43e]/90 text-white opacity-50">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Documents (Coming Soon)
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
