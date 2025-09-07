"use client";

import { Badge } from "@/components/ui/badge";
import { shouldUseMockApi } from "@/lib/mock-api";

export function MockApiIndicator() {
  if (!shouldUseMockApi()) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700">
        🧪 Mock API Active
      </Badge>
    </div>
  );
}
