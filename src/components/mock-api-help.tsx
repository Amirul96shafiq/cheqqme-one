"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { shouldUseMockApi } from "@/lib/mock-api";

export function MockApiHelp() {
  if (!shouldUseMockApi()) {
    return null;
  }

  return (
    <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
          🧪 Mock API Active
          <Badge variant="outline" className="text-xs">Development</Badge>
        </CardTitle>
        <CardDescription className="text-yellow-700 dark:text-yellow-300">
          You're using mock data for testing. Use these credentials:
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-2 text-sm">
          <div className="font-medium text-yellow-800 dark:text-yellow-200">For Login:</div>
          <div className="pl-4 space-y-1 text-yellow-700 dark:text-yellow-300">
            <div><strong>Email:</strong> admin@cheqqme.com</div>
            <div><strong>Password:</strong> password</div>
          </div>
        </div>
        <div className="grid gap-2 text-sm">
          <div className="font-medium text-yellow-800 dark:text-yellow-200">For Registration:</div>
          <div className="pl-4 space-y-1 text-yellow-700 dark:text-yellow-300">
            <div>Use any valid email and matching passwords</div>
            <div>Example: test@example.com / password123</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
